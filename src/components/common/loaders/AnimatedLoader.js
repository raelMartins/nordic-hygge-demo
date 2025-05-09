import { VStack, AbsoluteCenter, Spinner as DSpinner } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FiLoader } from "react-icons/fi";
import { themeStyles } from "../../../theme";
import { Oval } from "react-loader-spinner";

export const AnimatedLoader = ({ ...rest }) => {
  return (
    <AbsoluteCenter>
      <DSpinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="600px"
      />
    </AbsoluteCenter>
  );
};

export const Spinner = () => (
  <AbsoluteCenter>
    <DSpinner
      thickness="10px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="600px"
    />
  </AbsoluteCenter>
);

export const OvalLoader = ({ ...rest }) => {
  return (
    <AbsoluteCenter>
      <Oval
        height={80}
        width={80}
        color="#000000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#191919"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </AbsoluteCenter>
  );
};
