const MediaPlayer = ({ mediaUrl }) => {
  // Since the URL might not have a clear extension, assume the file type based on known patterns
  const isAudio = mediaUrl.includes("Episode") || mediaUrl.includes(".mp3"); // Assuming 'Episode' in URL means audio
  const isVideo = mediaUrl.includes("iframe") || mediaUrl.includes("video");

  return (
    <div className="media-player my-4">
      {isVideo ? (
        <div
          dangerouslySetInnerHTML={{
            __html: mediaUrl,
          }}
        />
      ) : isAudio ? (
        <audio controls className="audio-player w-full">
          <source src={mediaUrl} />
          Your browser does not support the audio element.
        </audio>
      ) : null}
    </div>
  );
};

export default MediaPlayer;
