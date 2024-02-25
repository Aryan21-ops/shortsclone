import React from 'react';
import VideoPlayer from './youtube';
import video1 from './videos/video1.mp4'
import video2 from './videos/video2.mp4'
import video3 from './videos/video3.mp4'
import video4 from './videos/video4.mp4'
import video5 from './videos/video5.mp4'

const App = () => {
  const videos = [
    { src: video1, title: 'Sanam Re #Love' },
    { src: video2, title: 'Happiness#Masti' },
    { src: video3, title: 'Nature my soul healer' },
    { src: video4, title: 'Music in blood#junoon' },
    { src: video5, title: 'Music #Passion' },
    
  ];

  return (
    <div>
      <VideoPlayer videos={videos} />
    </div>
  );
};

export default App;
