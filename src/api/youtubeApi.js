import { getRandomIndices } from "../utils/utils";
import { API_CONFIG, MOCK_DATA_FILE_NAMES } from "../config/apiConfig";

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
  // 디버깅을 위한 콘솔 로그
  console.log("fetch(mockData)가 실행됐습니다");

  return { items: randomItems };
};

export const fetchYouTubeSearchResults = async (
  searchQuery,
  pageToken = ""
) => {
  if (API_CONFIG.USE_MCOK_DATA) {
    return await fetchMockData(searchQuery);
  }

  const params = new URLSearchParams({
    part: "snippet",
    q: searchQuery,
    maxResults: 10,
    type: "video",
    pageToken,
    key: API_CONFIG.API_KEY,
  });

  const res = await fetch(`${API_CONFIG.BASE_URL}/search?${params}`);
  // 디버깅을 위한 콘솔 로그
  console.log("fetch(YouTubeAPI)가 실행됐습니다");

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to fetch videos: ${errorData.error.message}`);
  }

  const data = await res.json();
  return { items: data.items, nextPageToken: data.nextPageToken };
};
