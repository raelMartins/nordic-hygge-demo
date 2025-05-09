import React, {useState} from 'react';
import videoIcon from '/src/images/icons/videoIconForVideoExpansion.svg';
import {useRef} from 'react';
import {useEffect} from 'react';
import {Flex, Image} from '@chakra-ui/react';

export const EmbedVideoForFullScreenView = ({url, videoId}) => {
  const iframeRef = useRef(null);
  const playRef = useRef(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const playVideo = () => {
    setIsVideoVisible(true);

    const element = playRef?.current;

    // Modify the styles or attributes
    if (element) {
      element.style.opacity = '0';
      element.style.pointerEvents = 'none';
      element.style.visibility = 'hidden';
    }
  };

  useEffect(() => {
    function handleFullscreenChange() {
      if (
        !document.fullscreenElement &&
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement
      ) {
        // The video is no longer in fullscreen
        setIsVideoVisible(null);
      }
    }

    //for fullscreenchange
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    if (isVideoVisible) {
      // Play the video
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      // Request fullscreen for the iframe
      const iframe = iframeRef.current;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  }, [isVideoVisible, videoId]);
  return (
    <>
      <Flex
        py={'8px'}
        px={'10px'}
        gap={'12px'}
        align={'center'}
        borderRadius={'5px'}
        position={'absolute'}
        bottom={'5%'}
        right={'5%'}
        zIndex={2}
      >
        <Flex
          bg={'#FFFFFFCC'}
          onClick={playVideo}
          py={'8px'}
          px={'10px'}
          align={'center'}
          borderRadius={'5px'}
          cursor="pointer"
        >
          <Image src={videoIcon.src} fontSize="4px" alt="youtube icon for listing" />
        </Flex>
      </Flex>
      {isVideoVisible ? (
        <iframe
          ref={iframeRef}
          style={{
            top: 0,
            bottom: 0,

            zIndex: '',
            width: '660px',
            height: '587px',
          }}
          controls="false"
          width="660"
          height="587"
          src={``}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : null}
    </>
    //preview a youtube's video image
    // (
    //   <Image
    //     w="full"
    //     h="full"
    //     objectFit="contain"
    //     src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
    //     alt="youtube video image alternative"
    //   />
    // )
  );
};

export default EmbedVideoForFullScreenView;
