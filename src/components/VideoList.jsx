import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYouTubeSearchResults } from "../api/youtubeApi";
import { appendVideos } from "../features/videoSlice";
import { throttle } from "../utils/utils";
import VideoItem from "./VideoItem";
import ModalCompound from "./Modal/ModalCompound";

const THROTTLE_TIME = 500;

const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.searchResult);
  const pageToken = useSelector((state) => state.videos.nextPageToken);
  const searchQuery = useSelector((state) => state.videos.searchQuery);

  const loadMoreVideos = useCallback(
    async (searchTerm, pageToken) => {
      const { items, nextPageToken } = await fetchYouTubeSearchResults(
        searchTerm,
        pageToken
      );
      const action = appendVideos({ items, nextPageToken });
      dispatch(action);
      // 디버깅을 위한 콘솔 로그
      console.log("비디오를 추가합니다. 현재 searchTerm:", searchTerm);
    },
    [fetchYouTubeSearchResults, appendVideos, dispatch]
  );

  const throttledLoadMoreVideos = useCallback(
    throttle(loadMoreVideos, THROTTLE_TIME),
    [throttle, loadMoreVideos]
  );

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const triggerPosition = document.body.offsetHeight - 500;

    // 현재 스크롤 위치가 트리거 위치에 도달했는지 확인
    if (scrollPosition >= triggerPosition) {
      throttledLoadMoreVideos(searchQuery, pageToken);
    }
  };

  useEffect(() => {
    // handleScroll 이벤트 핸들러를 스크롤 이벤트에 등록
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트 언마운트 시 이벤트 핸들러 해제
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      <div className="video-list">
        {videos.map((video) => (
          <ModalCompound key={`${video.id.videoId}-${video.etag}`}>
            <ModalCompound.Trigger>
              <VideoItem video={video} />
            </ModalCompound.Trigger>
          </ModalCompound>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
