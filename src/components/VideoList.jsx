import { useDispatch, useSelector } from "react-redux";
import { fetchYouTubeSearchResults } from "../api/youtubeApi";
import { appendVideos } from "../features/videoSlice";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.videos.list);
  const pageToken = useSelector((state) => state.videos.nextPageToken);
  const searchQuery = useSelector((state) => state.videos.searchQuery);

  const loadMoreVideos = async () => {
    const { items, nextPageToken } = await fetchYouTubeSearchResults(
      searchQuery,
      pageToken
    );
    const action = appendVideos({ items, nextPageToken });
    dispatch(action);
  };

  return (
    <div>
      <div className="video-list">
        <button onClick={loadMoreVideos}>페이지 추가</button>
        {videos.map((video) => (
          <VideoItem key={`${video.id.videoId}-${video.etag}`} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
