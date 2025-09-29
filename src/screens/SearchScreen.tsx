import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchBar from '../components/SearchBar';
import ContentCard from '../components/ContentCard';
import sampleContent from '../data/sampleContent.json';
import {Content} from '../types/Content';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from '../utils/bookmarkStorage';

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const savedBookmarks = await getBookmarks();
    setBookmarks(savedBookmarks);
  };

  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) {
      return sampleContent as Content[];
    }

    const query = searchQuery.toLowerCase();
    return (sampleContent as Content[]).filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  const handleContentPress = (content: Content) => {
    navigation.navigate('Detail', {content});
  };

  const handleBookmarkToggle = useCallback(
    async (contentId: string) => {
      if (bookmarks.includes(contentId)) {
        await removeBookmark(contentId);
        setBookmarks(prev => prev.filter(id => id !== contentId));
      } else {
        await addBookmark(contentId);
        setBookmarks(prev => [...prev, contentId]);
      }
    },
    [bookmarks],
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      {filteredContent.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContent}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ContentCard
              content={item}
              onPress={() => handleContentPress(item)}
              isBookmarked={bookmarks.includes(item.id)}
              onBookmarkToggle={() => handleBookmarkToggle(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#95A5A6',
  },
});

export default SearchScreen;