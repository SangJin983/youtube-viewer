import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchYouTubeSearchResults } from "../api/youtubeApi";
import { setVideos } from "../features/videoSlice";
import { getRandomYouTubeSearchTopic } from "../utils/utils";

const VideoSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const loadVideos = useCallback(
    async (searchTerm) => {
      const { items, nextPageToken } = await fetchYouTubeSearchResults(
        searchTerm
      );
      const action = setVideos({
        items,
        nextPageToken,
        searchTerm,
      });
      dispatch(action);
    },
    [fetchYouTubeSearchResults, setVideos, dispatch]
  );

  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지
    if (searchTerm.trim()) {
      loadVideos(searchTerm);
      // 디버깅을 위한 콘솔 로그
      console.log("검색한 비디오를 불러옵니다. searchTerm:", searchTerm);

      setSearchTerm("");
    }
  };

  // 최초 랜덤검색 기능 구현
  useEffect(() => {
    const randomTopic = getRandomYouTubeSearchTopic();
    // 디버깅을 위한 콘솔 로그
    console.log("randomTopic:", randomTopic);
    loadVideos(randomTopic);
  }, [loadVideos, getRandomYouTubeSearchTopic]);

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
