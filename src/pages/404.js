import {AbsoluteCenter, Stack, Text, VStack} from '@chakra-ui/react';
import React from 'react';
import {motion} from 'framer-motion';

const Custom404 = () => {
  const gradientOnText = {
    background: 'var(--New-Linearr, linear-gradient(90deg, #232425 0.4%, #F4FAFF 100%))',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  return (
    <VStack w="100%" h="100vh">
      <AbsoluteCenter>
        <Stack alignItems="center" spacing="none" w="full">
          <motion.p
            style={{marginBottom: '24px'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 2}}
          >
            <Text
              as="span"
              css={gradientOnText}
              fontSize={{base: `36px`, md: '72px'}}
              fontFamily="Erica One"
              fontWeight="400"
              lineHeight="50px"
              color="#F0F0F0"
            >
              404
            </Text>
          </motion.p>
          <Stack
            textAlign="center"
            fontSize={{base: `36px`, md: '72px'}}
            fontWeight="600"
            color="#2C2C2C"
            leadingTrim="both"
            lineHeight="125%"
            // h="60px"
            overflowY="hidden"
            mb="38px"
            position="relative"
          >
            <motion.p
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              transition={{duration: 1, ease: 'easeInOut', delay: 0.3}}
            >
              <Text as="span" css={gradientOnText}>
                Page does not exist
              </Text>
            </motion.p>
          </Stack>
          <Stack
            textAlign="center"
            fontSize={{base: `16px`, md: '20px'}}
            overflowY="hidden"
            fontWeight="400"
            color="#89898B"
            leadingTrim="both"
            lineHeight="23px"
            h="23px"
          >
            <motion.span
              initial={{y: '30px'}}
              animate={{y: '0px'}}
              transition={{duration: 1, delay: 0.7}}
            >
              The page you&apos;re looking for does not exist
            </motion.span>
          </Stack>
        </Stack>
      </AbsoluteCenter>
    </VStack>
  );
};

export default Custom404;
