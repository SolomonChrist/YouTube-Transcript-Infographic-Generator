
import { VideoData } from '../types';

// This is a mock service. In a real application, this would involve a backend
// service to bypass CORS and fetch actual YouTube data and transcripts.
export const fetchYouTubeData = async (url: string): Promise<VideoData> => {
  // Basic URL validation
  if (!url.includes('youtube.com/watch?v=') && !url.includes('youtu.be/')) {
    throw new Error('Invalid YouTube URL provided.');
  }

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Return mock data
  // FIX: (L20) Removed 'transcript' property, as it does not exist on the 'VideoData' type.
  return {
    title: "The Ultimate Guide to AI-Powered Productivity in 2024",
    channelName: "Tech simplified",
    uploadDate: "Oct 26, 2023",
  };
};
