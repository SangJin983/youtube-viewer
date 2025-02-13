import { getRandomIndices } from "../utils/utils";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL;
const IS_USING_MOCK_DATA = true;
const MOCK_DATA_FILE_NAMES = {
  코딩: "coding",
  요리: "cooking",
  게임: "game",
  영화: "movie",
  음악: "music",
  자연: "nature",
  기술: "technology",
  여행: "travel",
};

const fetchMockData = async (searchQuery) => {
  const fileName = MOCK_DATA_FILE_NAMES[searchQuery];

  if (fileName == null) {
    throw new Error(`${searchQuery} does not match any available mock data`);
  }

  const res = await fetch(`/mocks/${fileName}.json`);
  const data = await res.json();

  const lastIndex = data.items.length - 1;
  const size = Math.min(lastIndex, 10);
  const randomIndices = getRandomIndices(0, lastIndex, size);
  const randomItems = randomIndices.map((idx) => data.items[idx]);

  console.log("fetch(mockData)가 실행됐습니다");

  return { items: randomItems };
};

export const fetchYouTubeSearchResults = async (
  searchQuery,
  pageToken = ""
) => {
  if (IS_USING_MOCK_DATA) {
    return await fetchMockData(searchQuery);
  }

  const params = new URLSearchParams({
    part: "snippet",
    q: searchQuery,
    maxResults: 10,
    type: "video",
    pageToken,
    key: YOUTUBE_API_KEY,
  });

  const res = await fetch(`${BASE_URL}/search?${params}`);
  console.log("fetch(YouTubeAPI)가 실행됐습니다");

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to fetch videos: ${errorData.error.message}`);
  }

  const data = await res.json();
  return { items: data.items, nextPageToken: data.nextPageToken };
};
