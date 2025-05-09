import {Skeleton, Stack} from '@chakra-ui/react';
import {motion} from 'framer-motion';

const StaggeredSkeleton = ({children, isLoading, number = 2}) => {
  const loader_array = Array(number).fill('');

  return (
    <Stack spacing={`12px`}>
      <motion.div
        initial={{opacity: 0, y: 5}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 1, delay: 0 * 1}}
      >
        <Skeleton
          w="full"
          startColor="matador_background.100"
          endColor="matador_background.200"
          isLoaded={!isLoading}
          minH="50px"
          maxH="fit-content"
          fadeDuration={1}
          borderRadius="5px"
          mt={0}
        >
          {isLoading ? null : children}
        </Skeleton>
      </motion.div>
      {isLoading &&
        loader_array?.map((el, i) => (
          <motion.div
            initial={{opacity: 0, y: 5}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1, delay: i * 1}}
            key={i}
          >
            <Skeleton
              w="full"
              startColor="matador_background.100"
              endColor="matador_background.200"
              isLoaded={!isLoading}
              minH="50px"
              maxH="fit-content"
              fadeDuration={1}
              borderRadius="5px"
              mt={0}
            />
          </motion.div>
        ))}
      {/* {isLoading ? (
        <motion.div
          initial={{opacity: 0, y: 5}}
          animate={{opacity: 1, y: 0, display: isLoading ? '' : 'none'}}
          transition={{duration: 1, delay: 1 * 1}}
        >
          <Skeleton
            startColor="matador_background.100"
            endColor="matador_background.200"
            isLoaded={!isLoading}
            height="50px"
            fadeDuration={1}
            borderRadius="5px"
          />
        </motion.div>
      ) : null}
      {isLoading ? (
        <motion.div
          initial={{opacity: 0, y: 5}}
          animate={{opacity: 1, y: 0, display: isLoading ? '' : 'none'}}
          transition={{duration: 1, delay: 2 * 1}}
        >
          <Skeleton
            startColor="matador_background.100"
            endColor="matador_background.200"
            isLoaded={!isLoading}
            height="50px"
            fadeDuration={1}
            borderRadius="5px"
          />
        </motion.div>
      ) : null} */}
    </Stack>
  );
};

export default StaggeredSkeleton;
