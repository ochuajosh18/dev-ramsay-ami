import React, { useEffect, useRef } from "react";

type VideoPreviewProps = {
  src: string | undefined;
  width?: string;
  height?: string;
};

const VideoPreview = ({
  src,
  width = "420",
  height = "200",
}: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousSrc = useRef(src);

  useEffect(() => {
    if (previousSrc.current === src) {
      return;
    }

    if (videoRef.current) {
      videoRef.current.load();
    }

    previousSrc.current = src;
  }, [src]);

  return (
    <video
      width={width}
      height={height}
      controls
      ref={videoRef}
      style={{ backgroundColor: "black" }}
      src={src}
    >
      <source src={src} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPreview;
