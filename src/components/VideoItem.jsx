const VideoItem = ({ video }) => {
  return (
    <div className="video-item">
      <img
        src={video.snippet.thumbnails.default.url}
        alt={video.snippet.title}
      />
      <h3>{video.snippet.title}</h3>
      <p>{new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
      <p>
        {video.snippet.description.length > 30
          ? video.snippet.description.slice(0, 30) + "..."
          : video.snippet.description}
      </p>
    </div>
  );
};

export default VideoItem;
