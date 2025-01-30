import { useState } from "react";

const VideoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    if (query.trim()) {
      onSearch(query);
      setQuery(""); // 입력필드 초기화
    }
  };

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
