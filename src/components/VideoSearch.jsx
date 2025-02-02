import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../features/videoSlice";
import { debounce, getRandomQuery } from "../utils/utils";

const VideoSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const debouncedSetSearchQuery = debounce((searchQuery) => {
    dispatch(setSearchQuery(searchQuery));
  }, 500);

  const debouncedResetQuery = debounce(() => {
    setQuery("");
  }, 500);

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    if (query.trim()) {
      debouncedSetSearchQuery(query);
      debouncedResetQuery();
    }
  };

  // 처음 랜덤검색 기능 구현
  useEffect(() => {
    dispatch(setSearchQuery(getRandomQuery()));
  }, [dispatch, setSearchQuery, getRandomQuery]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default VideoSearch;
