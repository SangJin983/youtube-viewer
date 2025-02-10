import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYouTubeSearchResults } from "../api/youtubeApi";
import { appendVideos } from "../features/videoSlice";
import { useModal } from "../hooks/useModal";
import { throttle } from "../utils/utils";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.results);
  const pageToken = useSelector((state) => state.videos.nextPageToken);
  const searchQuery = useSelector((state) => state.videos.searchQuery);
  const { Modal, open, close } = useModal();

  const loadMoreVideos = async () => {
    const { items, nextPageToken } = await fetchYouTubeSearchResults(
      searchQuery,
      pageToken
    );
    const action = appendVideos({ items, nextPageToken });
    dispatch(action);
  };

  const handleScroll = throttle(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const triggerPosition = document.body.offsetHeight - 500;

    // 현재 스크롤 위치가 트리거 위치에 도달했는지 확인
    if (scrollPosition >= triggerPosition) {
      loadMoreVideos();
    }
  }, 500);

  // handleScroll 이벤트 핸들러를 스크롤 이벤트에 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트 언마운트 시 이벤트 핸들러 해제
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 첫 랜더링에서의 환영모달 띄우기
  useEffect(() => {
    open();
  }, [open]);

  return (
    <div>
      <Modal>
        <div>환영합니다</div>
      </Modal>
      <div className="video-list">
        {videos.map((video) => (
          <VideoItem key={`${video.id.videoId}-${video.etag}`} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
