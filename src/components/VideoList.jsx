import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos as fetchVideosApi } from "../api/youtubeApi";
import { fetchVideos } from "../features/videoSlice";
import { getRandomQuery } from "../utils/utils";
import VideoItem from "./VideoItem";
import VideoSearch from "./VideoSearch";

const VideoList = () => {
  const dispatch = useDispatch();
  const { items: videos } = useSelector((state) => state.videos);
  const [searchQuery, setSearchQuery] = useState(getRandomQuery());

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchVideosApi(searchQuery);
        dispatch(fetchVideos(data.items));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    getVideos();
  }, [fetchVideosApi, searchQuery, dispatch, fetchVideos]);

  return (
    <div>
      <h2>비디오 목록</h2>
      <VideoSearch onSearch={handleSearch} />
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
