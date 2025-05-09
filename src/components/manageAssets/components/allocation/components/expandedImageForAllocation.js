import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Icon,
  Image,
  ModalBody,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import {IoMdClose} from 'react-icons/io';
import {Carousel} from 'react-responsive-carousel';
import thinArrow from '/src/images/icons/thinArrow.svg';
import house from '/src/images/houses/landing-house.png';

const StyledBtn = styled.button`
  ${props => props.pos}: 90%;
  zindex: 2;
  pointerevents: auto;
  z-index: 2;
  pointer-events: auto;
  top: 45%;
  width: 5%;
  height: auto;
  display: flex;
  aspect-ratio: 1 / 1;
  position: fixed;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  box-shadow: xl;
  border: 1px solid #eaeaea;
  background-color: #ffffffb2;
  @media (max-width: 768px) {
    ${props => props.pos}: 85%;
    width: 10%;
    top: 50%;
  }
`;

const ExpandedImageForAllocation = ({
  expandedImage,
  selectedSlide,
  setSelectedSlide,
  setExpandedImage,
  images,
}) => {
  const handleExpansionClose = () => {
    setExpandedImage(false);
  };
  return expandedImage ? (
    <Modal isCentered isOpen={expandedImage} onClose={handleExpansionClose}>
      <ModalOverlay bg="rgba(0,0,0,0.4)" />
      <ModalContent p="0px" minW="full" boxShadow="none" bg="transparent" pointerEvents="none">
        <ModalCloseButton
          color="#ffffff"
          pointerEvents="auto"
          fontSize={{base: '15px', md: '24px'}}
          right="5%"
          top={{base: '-20%', md: '0%'}}
        />
        <ModalBody p="0px" m="0px">
          <HStack
            css={{
              '.carousel .slider-wrapper.axis-horizontal .slider .slide': {
                display: 'flex',
              },
            }}
            maxW="100vw"
            justify="center"
            align="center"
          >
            <Carousel
              showThumbs={false}
              showStatus={false}
              selectedItem={selectedSlide}
              onChange={index => setSelectedSlide(index)}
              useKeyboardArrows
              renderArrowPrev={(clickHandler, hasPrev) =>
                hasPrev && (
                  <StyledBtn onClick={clickHandler} pos="right">
                    <HStack
                      justify="center"
                      align="center"
                      p="10px"
                      borderRadius="full"
                      bg="transparent"
                    >
                      <Image
                        transform="rotate(180deg)"
                        src={thinArrow.src}
                        w={{base: '20px', md: 'initial'}}
                        alt="left arrow"
                      />
                    </HStack>
                  </StyledBtn>
                )
              }
              renderArrowNext={(clickHandler, hasNext) => (
                <>
                  {hasNext && (
                    <StyledBtn onClick={clickHandler} pos="left">
                      <HStack
                        justify="center"
                        align="center"
                        p="10px"
                        borderRadius="none"
                        bg="transparent"
                      >
                        <Image
                          w={{base: '20px', md: 'initial'}}
                          src={thinArrow.src}
                          alt="right arrow"
                        />
                      </HStack>
                    </StyledBtn>
                  )}
                </>
              )}
              renderIndicator={false}
            >
              {images?.map((upload, index) => {
                return (
                  <HStack
                    key={index}
                    pointerEvents="auto"
                    justify="center"
                    align="center"
                    w="fit-content"
                    position="relative"
                    margin="auto auto"
                  >
                    <Image
                      src={upload?.image_file}
                      alt="allocation images"
                      maxW="90vw"
                      maxH="90vh"
                      minW="70vw"
                    />
                  </HStack>
                );
              })}
            </Carousel>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  ) : null;
};

export default ExpandedImageForAllocation;
