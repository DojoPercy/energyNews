const ImageShimmer = ({ width, height }) => (
    <div
      className="shimmer"
      style={{
        width: width,
        height: height,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
  
  export default ImageShimmer;
  