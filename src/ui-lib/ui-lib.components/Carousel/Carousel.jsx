import React from "react";
import { Image, Box, Text, Flex, Center, AspectRatio } from "@chakra-ui/react";
import "../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import { themeStyles } from "../../../theme";

export const ImageCarousel = ({ size, images, ...rest }) => {
  const styles = {
    zIndex: 2,
    top: "45%",
    width: "7%",
    height: "auto",
    display: "flex",
    aspectRatio: 1 / 1,
    position: "absolute",
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: 'xl',
    border: '1px solid #EAEAEA',
    backgroundColor: "#FFFFFFB2",
  };
  const noOfImages = images?.length;

  return (
    <Flex {...rest}>
      <Carousel
        showThumbs={true}
        useKeyboardArrows
        renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
          hasPrev && (
            <button onClick={clickHandler} style={{ ...styles, right: "90%" }}>
              <FiArrowLeft size={"60%"} />
            </button>
          )
        }
        renderArrowNext={(clickHandler, hasNext, labelNext) => (
          <div>
            {hasNext && (
              <button onClick={clickHandler} style={{ ...styles, left: "90%" }}>
                <FiArrowRight size={"60%"} />
              </button>
            )}
            <StatusBox total={noOfImages} />
          </div>
        )}
      >
        {images?.map(({ photo, id }) => {
          return (
            <div key={id}>
              <Image alt='next_image' alignSelf={'stretch'} maxW='565px' h={size == 'md' ? '350px' : '465px'} borderRadius='36px' src={photo} />
            </div>
          );
        })}
      </Carousel>
    </Flex>
  );
};

const StatusBox = ({ total }) => {
  return (
    <Flex
      bg={"#FFFFFFCC"}
      zIndex={2}
      position={"absolute"}
      bottom={"5%"}
      right={"10%"}
      py={"5px"}
      px={"10px"}
      gap={"12px"}
      align={"center"}
      borderRadius={"5px"}
    >
      <BsImage size={"18px"} />
      <Text {...themeStyles.textStyles.sb5}>
        {total} {total > 1 ? "Photos" : "Photo"}
      </Text>
    </Flex>
  );
};
