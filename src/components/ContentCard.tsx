import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Content} from '../types/Content';

interface ContentCardProps {
  content: Content;
  onPress: () => void;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  onPress,
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  const platformColor = content.platform === 'naver' ? '#00C73C' : '#FFCD00';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{uri: content.thumbnailUrl}} style={styles.thumbnail} />
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {content.title}
          </Text>
          <View style={styles.badges}>
            <View
              style={[styles.platformBadge, {backgroundColor: platformColor}]}>
              <Text style={styles.platformText}>
                {content.platform === 'naver' ? 'N' : 'K'}
              </Text>
            </View>
            {onBookmarkToggle && (
              <TouchableOpacity
                onPress={e => {
                  e.stopPropagation();
                  onBookmarkToggle();
                }}
                style={styles.bookmarkButton}>
                <Text style={styles.bookmarkIcon}>
                  {isBookmarked ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.author}>{content.author}</Text>
        <Text style={styles.genre}>{content.genre.join(', ')}</Text>
        <View style={styles.meta}>
          <Text style={styles.rating}>⭐ {content.rating}</Text>
          <Text style={styles.episodes}>
            {content.episodeCount}화 | {content.status === 'ongoing' ? '연재중' : '완결'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platformBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bookmarkButton: {
    padding: 4,
  },
  bookmarkIcon: {
    fontSize: 20,
  },
  author: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 4,
  },
  genre: {
    fontSize: 12,
    color: '#95A5A6',
    marginTop: 4,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  rating: {
    fontSize: 12,
    color: '#F39C12',
    fontWeight: '600',
  },
  episodes: {
    fontSize: 12,
    color: '#95A5A6',
  },
});

export default ContentCard;