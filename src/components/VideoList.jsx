import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos as fetchVideosApi } from "../api/youtubeApi";
import { fetchVideos } from "../features/videoSlice";
import { getRandomQuery } from "../utils/utils";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const dispatch = useDispatch();
  const { items: videos } = useSelector((state) => state.videos);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const query = getRandomQuery();
        const data = await fetchVideosApi(query);
        dispatch(fetchVideos(data.items));
      } catch (error) {
        console.error(error);
      }
    };

    getVideos();
  }, [getRandomQuery, fetchVideosApi, dispatch, fetchVideos]);

  return (
    <div>
      <h2>비디오 목록</h2>
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
