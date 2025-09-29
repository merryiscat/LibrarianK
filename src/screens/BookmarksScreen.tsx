import React, {useState, useCallback} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ContentCard from '../components/ContentCard';
import sampleContent from '../data/sampleContent.json';
import {Content} from '../types/Content';
import {getBookmarks, removeBookmark} from '../utils/bookmarkStorage';

const BookmarksScreen = () => {
  const navigation = useNavigation<any>();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, []),
  );

  const loadBookmarks = async () => {
    const savedBookmarks = await getBookmarks();
    setBookmarks(savedBookmarks);
  };

  const bookmarkedContent = (sampleContent as Content[]).filter(item =>
    bookmarks.includes(item.id),
  );

  const handleContentPress = (content: Content) => {
    navigation.navigate('Detail', {content});
  };

  const handleBookmarkToggle = useCallback(
    async (contentId: string) => {
      await removeBookmark(contentId);
      setBookmarks(prev => prev.filter(id => id !== contentId));
    },
    [],
  );

  if (bookmarkedContent.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>북마크한 작품이 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedContent}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ContentCard
            content={item}
            onPress={() => handleContentPress(item)}
            isBookmarked={true}
            onBookmarkToggle={() => handleBookmarkToggle(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
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
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    fontSize: 16,
    color: '#95A5A6',
  },
});

export default BookmarksScreen;