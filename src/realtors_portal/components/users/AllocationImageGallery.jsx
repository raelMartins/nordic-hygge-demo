import React from 'react';
import {Box, Flex, Image, VStack} from '@chakra-ui/react';

export const AllocationImageGallery = ({setActiveImg, activeImg, uploads}) => {
  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      height: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#ffffff',
    },
  };

  return (
    <div>
      <Box
        minW={{base: '90%', xl: '580px'}}
        h={{base: '340px', md: '458px'}}
        borderRadius={{base: '10px', md: '24px'}}
        border="1.5px solid"
        borderColor={`matador_border_color.100 !important`}
      >
        <Image
          src={activeImg}
          width="full"
          height="full"
          objectFit="cover"
          borderRadius={{base: '10px', md: '24px'}}
          alt="allocated unit image"
        />
      </Box>
      <Flex
        position={'relative'}
        align={'center'}
        py={{base: '18px', md: '33px'}}
        w="full"
        mx="auto"
        sx={customScrollbarStyles}
        overflowX="auto"
        gap="18px"
      >
        {uploads?.length &&
          uploads?.map((upload, index) => (
            <Flex wrap="flex-wrap" key={index} align="center" h="full">
              <Box pos="relative" h="full">
                <VStack
                  border={activeImg === upload?.image_file ? '2px solid' : '1px solid '}
                  borderColor={
                    activeImg === upload?.image_file
                      ? `#937CD7`
                      : `matador_border_color.100 !important`
                  }
                  width={{base: '90px', md: '117.857px'}}
                  height={{base: '85px', md: '120px'}}
                  borderRadius={{base: '8px', md: '16px'}}
                  boxShadow={'sm'}
                >
                  <Image
                    cursor={'pointer'}
                    src={upload?.image_file}
                    onClick={() => setActiveImg(upload?.image_file)}
                    filter={activeImg === upload?.image_file ? '' : 'grayscale(70%)'}
                    width="full"
                    objectFit="cover"
                    height="full"
                    borderRadius={{base: '8px', md: '16px'}}
                    alt="allocation image"
                  />
                </VStack>
              </Box>
            </Flex>
          ))}
      </Flex>
    </div>
  );
};

export default AllocationImageGallery;
