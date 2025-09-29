import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = '@LibrarianK:bookmarks';

export const getBookmarks = async (): Promise<string[]> => {
  try {
    const bookmarksJson = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarksJson ? JSON.parse(bookmarksJson) : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
};

export const addBookmark = async (contentId: string): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    if (!bookmarks.includes(contentId)) {
      bookmarks.push(contentId);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
};

export const removeBookmark = async (contentId: string): Promise<void> => {
  try {
    const bookmarks = await getBookmarks();
    const filtered = bookmarks.filter(id => id !== contentId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

export const isBookmarked = async (contentId: string): Promise<boolean> => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.includes(contentId);
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};