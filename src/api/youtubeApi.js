const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export const fetchYouTubeSearchResults = async (
  searchQuery,
  pageToken = ""
) => {
  const params = new URLSearchParams({
    part: "snippet",
    q: searchQuery,
    maxResults: 10,
    type: "video",
    pageToken,
    key: YOUTUBE_API_KEY,
  });

  const res = await fetch(`${BASE_URL}/search?${params}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to fetch videos: ${errorData.error.message}`);
  }

  const data = await res.json();
  return { items: data.items, nextPageToken: data.nextPageToken };
};
