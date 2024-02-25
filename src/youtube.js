import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import './youtube.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp, faThumbsDown, faShare} from "@fortawesome/free-solid-svg-icons"



const VideoPlayer = ({ videos }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  let hideTimeout;

  useEffect(() => {
    const video = videoRef.current;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else {
        video.play();
        setIsPlaying(true);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentVideoIndex]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          navigate('previous');
          break;
        case 'ArrowRight':
          navigate('next');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentVideoIndex]);

  const navigate = (direction) => {
    if (direction === 'next') {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    } else if (direction === 'previous') {
      setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      const video = videoRef.current;
      const currentTime = video.currentTime;
      const duration = video.duration;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    };

    const video = videoRef.current;
    video.addEventListener('timeupdate', updateProgress);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentVideoIndex]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video?.paused) {
      video.play();
      setIsPlaying(true);
      setShowControls(true);
      startControlsTimeout();
    } else {
      video.pause();
      setIsPlaying(false);
      setShowControls(false);
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const startControlsTimeout = () => {
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => navigate('next'),
    onSwipedRight: () => navigate('previous')
  });

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const handleShare = () => {
    alert('Share functionality');
  };

  return (
    <div {...handlers} tabIndex={0} className="video-player" onMouseMove={() => setShowControls(true)}>
      <h1 style={{ "fontSize": "50px", "position": "fixed","color":"white" , "fontFamily": "Roboto, sans-serif"}}>&nbsp;&nbsp;&nbsp;&nbsp;Snapvids</h1>
      <video ref={videoRef} src={videos[currentVideoIndex].src} controls={false} autoPlay loop onClick={handleVideoClick} />
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <h3 className="video-title">{videos[currentVideoIndex].title}</h3>
      <div className={`controls ${showControls ? 'visible' : ''}`}>
        {isPlaying ? (
          <button onClick={togglePlay} className="pause-button">
          </button>
        ) : (
          <button onClick={togglePlay} className="play-button">
            
          </button>
        )}
      </div>
      <div className="action-buttons">
          <button className={`action-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
            <FontAwesomeIcon icon={faThumbsUp} size='3x' />
          </button>
          <button className={`action-button ${disliked ? 'disliked' : ''}`} onClick={handleDislike}>
            <FontAwesomeIcon icon={faThumbsDown} size='3x' />
          </button>
          <button className="action-button" onClick={handleShare}>
            <FontAwesomeIcon icon={faShare} size='3x' />
          </button>
        </div>
    </div>
  );
};

export default VideoPlayer;