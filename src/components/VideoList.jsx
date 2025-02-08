import { useSelector } from "react-redux";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const { items: videos } = useSelector((state) => state.videos);

  return (
    <div>
      <div className="video-list">
        {videos.map((video) => (
          <VideoItem
            key={`${video.id.videoId}-${video.snippet.title}`}
            video={video}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
