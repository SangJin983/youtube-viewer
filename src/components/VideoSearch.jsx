import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchVideos } from "../api/youtubeApi";
import { setVideos } from "../features/videoSlice";
import { generateRandomSearchTerm } from "../utils/utils";

const VideoSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAndSetVideos = async (term) => {
    const videos = await fetchVideos(term);
    dispatch(setVideos(videos.items));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 새로고침 방지
    if (searchTerm.trim()) {
      fetchAndSetVideos(searchTerm);
      setSearchTerm("");
    }
  };

  // 최초 랜덤검색 기능 구현
  useEffect(() => {
    const fetchRandomSearchTerm = async () => {
      const randomSearchTerm = generateRandomSearchTerm();
      fetchAndSetVideos(randomSearchTerm);
    };

    fetchRandomSearchTerm();
  }, [dispatch, generateRandomSearchTerm]);

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
