import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchYouTubeSearchResults } from "../api/youtubeApi";
import { setVideos } from "../features/videoSlice";
import { getRandomYouTubeSearchTopic } from "../utils/utils";

const VideoSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const excuteSearch = async (searchQuery) => {
    const { items, nextPageToken } = await fetchYouTubeSearchResults(
      searchQuery
    );
    const action = setVideos({
      items,
      nextPageToken,
      searchQuery,
    });
    dispatch(action);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지
    if (searchTerm.trim()) {
      excuteSearch(searchTerm);
      setSearchTerm("");
    }
  };

  // 최초 랜덤검색 기능 구현
  useEffect(() => {
    const excuteInitialSearch = async () => {
      const randomTopic = getRandomYouTubeSearchTopic();
      excuteSearch(randomTopic);
    };

    excuteInitialSearch();
  }, [dispatch, getRandomYouTubeSearchTopic]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default VideoSearch;
