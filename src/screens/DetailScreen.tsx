import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Content} from '../types/Content';
import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from '../utils/bookmarkStorage';

const DetailScreen = ({route}: any) => {
  const {content} = route.params as {content: Content};
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    checkBookmark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkBookmark = async () => {
    const bookmarks = await getBookmarks();
    setIsBookmarked(bookmarks.includes(content.id));
  };

  const handleBookmarkToggle = async () => {
    if (isBookmarked) {
      await removeBookmark(content.id);
      setIsBookmarked(false);
    } else {
      await addBookmark(content.id);
      setIsBookmarked(true);
    }
  };

  const handleOpenLink = () => {
    const platformUrl =
      content.platform === 'naver'
        ? 'https://comic.naver.com'
        : 'https://page.kakao.com';
    Linking.openURL(platformUrl);
  };

  const platformColor = content.platform === 'naver' ? '#00C73C' : '#FFCD00';

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: content.thumbnailUrl}} style={styles.thumbnail} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{content.title}</Text>
          <TouchableOpacity onPress={handleBookmarkToggle}>
            <Text style={styles.bookmarkIcon}>
              {isBookmarked ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.author}>{content.author}</Text>
          <View
            style={[styles.platformBadge, {backgroundColor: platformColor}]}>
            <Text style={styles.platformText}>
              {content.platform === 'naver' ? 'NAVER' : 'KAKAO'}
            </Text>
          </View>
        </View>

        <View style={styles.genreContainer}>
          {content.genre.map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>⭐ {content.rating}</Text>
            <Text style={styles.statLabel}>평점</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{content.episodeCount}화</Text>
            <Text style={styles.statLabel}>에피소드</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {content.status === 'ongoing' ? '연재중' : '완결'}
            </Text>
            <Text style={styles.statLabel}>상태</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>작품 소개</Text>
        <Text style={styles.description}>{content.description}</Text>

        <View style={styles.divider} />

        <Text style={styles.updateInfo}>
          최근 업데이트: {new Date(content.updatedAt).toLocaleDateString('ko-KR')}
        </Text>

        <TouchableOpacity style={styles.linkButton} onPress={handleOpenLink}>
          <Text style={styles.linkButtonText}>
            {content.platform === 'naver' ? '네이버 웹툰' : '카카오 웹툰'}에서 보기
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  thumbnail: {
    width: '100%',
    height: 400,
    backgroundColor: '#E0E0E0',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 12,
  },
  bookmarkIcon: {
    fontSize: 32,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  author: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  platformBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  platformText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  genreTag: {
    backgroundColor: '#ECF0F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    color: '#34495E',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#95A5A6',
  },
  divider: {
    height: 1,
    backgroundColor: '#ECF0F1',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#34495E',
  },
  updateInfo: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 20,
  },
  linkButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default DetailScreen;