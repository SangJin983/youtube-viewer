import ModalCompound from "./Modal/ModalCompound";

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
      <ModalCompound.Content>
        <div>
          <h2>{video.snippet.title}</h2>
          <iframe
            width={560}
            height={315}
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title={video.snippet.title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </ModalCompound.Content>
    </div>
  );
};

export default VideoItem;
