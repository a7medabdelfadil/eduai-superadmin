import React from 'react';

interface VideoComponentProps {
  src: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ src }) => {
  return (
    <video className="object-fill rounded-xl overflow-hidden h-full w-full md:w-[533px] mx-auto" controls>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoComponent;
