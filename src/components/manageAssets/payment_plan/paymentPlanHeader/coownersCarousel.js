import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  AspectRatio,
  Box,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import angledIcon from '/src/images/icons/angledArrow.svg';
import HoverText from '../../../../ui-lib/ui-lib.components/hover/hoverOnText';

// Custom-styled Carousel component
const StyledCarousel = styled(Carousel)`
  width: 100%;
  max-width: 608.81px;

  .slider-wrapper {
    width: 100%;
    overflow: hidden;
    max-width: 608.81px;
  }

  .slider {
    width: 100%;
    max-width: 608.81px;
  }

  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 608.81px;
  }
`;

const CoownersCarousel = ({isOpen, coownersList, setTransactionInfo, transactionInfo}) => {
  const status = tag => {
    switch (tag) {
      case 'DEFAULTING':
        return {
          bg: '#E6E6E6',
          color: '#1D2939',
          text: 'Defaulting',
        };
      case 'NON-DEFAULTING':
        return {
          bg: '#E6E6E6',
          color: '#1D2939',
          text: 'Not defaulting',
        };

      default:
        return {
          bg: '#E6E6E6',
          color: '#1D2939',
          text: '-',
        };
    }
  };
  const [isBelowXl] = useMediaQuery('(max-width: 535px)');
  const [isBelowS] = useMediaQuery('(max-width: 361px)');

  return (
    <Flex
      transition="0.6s ease-in-out"
      overflow="hidden"
      opacity={isOpen ? 1 : 0}
      height={{
        base: `${isOpen ? '66.5px' : '0px'}`,
        xl: `${isOpen ? '74px' : '0px'}`,
      }}
      border="1px solid #E4E4E4"
      minH={{
        base: `${isOpen ? '66.5px' : '0px'}`,
        xl: `${isOpen ? '74px' : '0px'}`,
      }}
      borderRadius="0px"
      width="100%"
      maxW="608.81px"
    >
      {coownersList?.length ? (
        <StyledCarousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          useKeyboardArrows
          showArrows={false}
          selectedItem={transactionInfo?.slideIndex}
        >
          {coownersList?.map((item, index) => (
            <HStack
              key={index}
              py="8px"
              px={{base: '10px', xl: '28px'}}
              width="100%"
              spacing="none"
              justifyContent="space-between"
              h={{base: '66.5px', xl: '74px'}}
              boxSizing="border-box"
            >
              <HStack spacing={{base: '10px', xl: '21px'}} width="100%">
                <HStack spacing={{base: '10px', xl: '20px'}} align="start" width="100%">
                  <Box
                    position="relative"
                    boxSize={{base: '45px', xl: '50px'}}
                    maxW={{base: '45px', xl: '50px'}}
                  >
                    <Image
                      src={item?.avatar}
                      alt="coowner image"
                      aspectRatio="1"
                      boxSize={{base: '45px', xl: '50px'}}
                      fontSize="8px"
                      objectFit="cover"
                      borderRadius="full"
                      bg="#4848484D"
                    />

                    <Stack
                      position="absolute"
                      bottom="0"
                      right="-10%"
                      borderRadius="0px"
                      border="0.3px solid #747474"
                      bg="#E6E6E6"
                      maxH={{xl: '18.9px', base: '17.3px'}}
                      p={{base: '3.135px 4.405px', xl: '3.49px 5.469px'}}
                    >
                      <Text
                        fontSize={{base: '9.405px', xl: '10.469px'}}
                        fontWeight={{base: '400', xl: '500'}}
                        lineHeight={{base: '11px', xl: '12px'}}
                        color="matador_text.100"
                        textTransform="capitalize"
                      >
                        {`${item?.equityValue}`}
                      </Text>
                    </Stack>
                  </Box>
                  <Stack align="start" spacing={{md: '5px', base: '4.49px'}} minW="0" flex="1">
                    <HStack spacing={{base: '8.98px', md: '10px'}}>
                      <HoverText
                        lens={isBelowS ? 5 : isBelowXl ? 10 : 18}
                        popStyle={{placement: 'right-end'}}
                        forPopUp={{textTransform: 'capitalize'}}
                        text={item?.name}
                        textAlign="start"
                        color="matador_text.100"
                        textTransform="capitalize"
                        fontSize={{base: '14.374px', md: '16px'}}
                        fontWeight={{base: '500', md: '500'}}
                        lineHeight={{base: '17px', md: '19px'}}
                      />
                      <Tag
                        p={{base: '5.39px 9.405px', md: ' 6px 10.469px'}}
                        maxH={{md: '18.78px', base: '19px'}}
                        minW={{base: '70px', md: '76px'}}
                        bg={status(item?.status)?.bg}
                        color={status(item?.status)?.color}
                        borderRadius="0px"
                        isTruncated={false}
                      >
                        <TagLabel
                          isTruncated={false}
                          mx="auto"
                          fontSize={{base: '10.973px', md: '10.214px'}}
                          fontWeight="400"
                        >
                          {status(item?.status)?.text}
                        </TagLabel>
                      </Tag>
                    </HStack>
                    <Text
                      fontSize={{base: '10.78px', md: '10px'}}
                      fontWeight="400"
                      textAlign="start"
                      lineHeight={{base: '13px', md: '12px'}}
                      color="#A2A2A2"
                    >
                      {item?.email}
                    </Text>
                  </Stack>
                </HStack>
              </HStack>
              <Stack h="full" align="end" justifyContent="center">
                {/* <HStack
                  border="1px solid #000"
                  borderRadius="10px"
                  p="3px 13px"
                >
                  <Text fontSize="12px" fontWeight="400" color='matador_text.100'>
                    {index + 1}/{coownersList?.length}
                  </Text>
                </HStack> */}
                <HStack spacing="8px">
                  <Box
                    role="button"
                    cursor={index === 0 ? 'not-allowed' : 'pointer'}
                    onClick={() =>
                      index === 0
                        ? null
                        : setTransactionInfo(prev => ({
                            ...coownersList?.[prev?.slideIndex - 1],
                            slideIndex: prev?.slideIndex - 1,
                          }))
                    }
                    display="flex"
                    align="center"
                    justifyContent="center"
                  >
                    <Image
                      src={angledIcon.src}
                      opacity={index === 0 ? 0.3 : 1}
                      alt="arrow icon"
                      boxSize="20px"
                    />
                  </Box>
                  <Box
                    role="button"
                    transform="rotate(180deg)"
                    cursor={index + 1 === coownersList.length ? 'not-allowed' : 'pointer'}
                    onClick={() =>
                      index + 1 === coownersList.length
                        ? null
                        : setTransactionInfo(prev => ({
                            ...coownersList?.[prev?.slideIndex + 1],
                            slideIndex: prev?.slideIndex + 1,
                          }))
                    }
                    display="flex"
                    align="center"
                    justifyContent="center"
                  >
                    <Image
                      src={angledIcon.src}
                      opacity={index + 1 === coownersList.length ? 0.5 : 1}
                      alt="arrow icon"
                      boxSize="20px"
                    />
                  </Box>
                </HStack>
              </Stack>
            </HStack>
          ))}
        </StyledCarousel>
      ) : (
        <Text textAlign="center" width="full" alignSelf="center" fontSize="14px" fontWeight="400">
          Currently, there isn't an available co-owner. Kindly refresh.
        </Text>
      )}
    </Flex>
  );
};

export default CoownersCarousel;
