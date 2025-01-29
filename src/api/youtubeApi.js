const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchVideos = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search?part=snippet&q=${query}&maxResults=10&key=${YOUTUBE_API_KEY}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to fetch videos: ${errorData.error.message}`);
  }

  const data = await res.json();
  return data;
};
