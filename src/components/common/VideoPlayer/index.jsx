import React from 'react';
import * as classnames from 'classnames';
import { useFullscreen } from '../../../utils/hooks';
import iconPlay from '../../../assets/icons/play-white.svg';
import iconFullscreen from '../../../assets/icons/fullscreen.svg';
import iconFullscreenExit from '../../../assets/icons/fullscreen-exit.svg';
import './index.scss';

const VideoPlayer = props => {
  const { className, src } = props;

  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

  const fullscreen = useFullscreen();
  const { isFullscreen } = fullscreen;

  const videoContainerElement = React.useRef(null);
  const videoElement = React.useRef(null);

  const toggleVideoPlay = () => {
    if (isVideoPlaying) {
      videoElement.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoElement.current.play();
      setIsVideoPlaying(true);
    }
  };

  const toggleFullscreen = (event) => {
    event.stopPropagation();

    if (isFullscreen) {
      fullscreen.exit();
    } else {
      fullscreen.enter(videoContainerElement.current || {});
    }
  };

  return (
    <div
      ref={videoContainerElement}
      className={classnames(
        'video-player',
        className && className,
      )}
    >
      <video
        className={classnames(
          'video-player__video',
          isFullscreen && '-fullscreen',
        )}
        ref={videoElement}
        onClick={toggleVideoPlay}
      >
        <source src={src} type="video/mp4" />
      </video>
      <img
        className={classnames(
          'video-player__icon-play',
          isVideoPlaying && '-hidden',
        )}
        src={iconPlay}
        alt="play"
        onClick={toggleVideoPlay}
      />
      <img
        className="video-player__icon-fullscreen"
        src={isFullscreen ? iconFullscreenExit : iconFullscreen}
        alt="fullscreen"
        onClick={toggleFullscreen}
      />
    </div>
  );
};

export default VideoPlayer;
