import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos as fetchVideosApi } from "../api/youtubeApi";
import { fetchVideos } from "../features/videoSlice";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const dispatch = useDispatch();
  const { items: videos } = useSelector((state) => state.videos);
  const { searchQuery } = useSelector((state) => state.videos);

  useEffect(() => {
    const getVideos = async () => {
      if (searchQuery) {
        try {
          const data = await fetchVideosApi(searchQuery);
          dispatch(fetchVideos(data.items));
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      }
    };

    getVideos();
  }, [fetchVideosApi, searchQuery, dispatch, fetchVideos]);

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
