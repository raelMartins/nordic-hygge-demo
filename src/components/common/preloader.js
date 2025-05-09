import React from 'react';
import justLogo from '../../images/just-logo.svg';
import {Flex, Image} from '@chakra-ui/react';

const Preloader = () => {
  return (
    <Flex justify="center" align="center" h="100vh" w="100vw">
      {/* <Image alt='next_image' h='67px' w='72px' src={justLogo.src} /> */}
    </Flex>
  );
};

export default Preloader;
