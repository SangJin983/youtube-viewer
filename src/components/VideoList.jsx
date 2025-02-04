import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos as fetchVideosApi } from "../api/youtubeApi";
import { addVideos, fetchVideos } from "../features/videoSlice";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const dispatch = useDispatch();
  const { items: videos } = useSelector((state) => state.videos);
  const { searchQuery } = useSelector((state) => state.videos);
  const { nextPageToken } = useSelector((state) => state.videos);

  const addPageVideos = async () => {
    if (searchQuery == null) {
      return;
    }
    const nextVideos = await fetchVideosApi(searchQuery, nextPageToken);
    dispatch(
      addVideos({
        items: nextVideos.items,
        nextPageToken: nextVideos.nextPageToken,
      })
    );
  };

  useEffect(() => {
    const getVideos = async () => {
      if (searchQuery) {
        try {
          const searchedVideos = await fetchVideosApi(searchQuery);
          dispatch(
            fetchVideos({
              items: searchedVideos.items,
              nextPageToken: searchedVideos.nextPageToken,
            })
          );
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
        <button onClick={addPageVideos}>페이지 추가</button>
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
