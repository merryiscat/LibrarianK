export interface Content {
  id: string;
  title: string;
  author: string;
  genre: string[];
  thumbnailUrl: string;
  description: string;
  platform: 'naver' | 'kakao';
  rating: number;
  episodeCount: number;
  status: 'ongoing' | 'completed';
  updatedAt: string;
}