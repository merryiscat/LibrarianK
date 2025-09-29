import React, {useState, useEffect, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ContentCard from '../components/ContentCard';
import sampleContent from '../data/sampleContent.json';
import {Content} from '../types/Content';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from '../utils/bookmarkStorage';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    const savedBookmarks = await getBookmarks();
    setBookmarks(savedBookmarks);
  };

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
      <FlatList
        data={sampleContent as Content[]}
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
});

export default HomeScreen;