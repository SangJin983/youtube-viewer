export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_YOUTUBE_API_BASE_URL,
  API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY,
  USE_MCOK_DATA: import.meta.env.VITE_USE_MOCK_DATA === "true",
};

export const MOCK_DATA_FILE_NAMES = {
  코딩: "coding",
  요리: "cooking",
  게임: "game",
  영화: "movie",
  음악: "music",
  자연: "nature",
  기술: "technology",
  여행: "travel",
};
