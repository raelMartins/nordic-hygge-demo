import React from "react";
import {
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { CustomisedTag } from "../../ui-lib/ui-lib.components";
import { motion } from "framer-motion";

export const CardOne = ({
  id,
  title,
  ownerMsg,
  image,
  onClickCard,
  subtitle,
  refetch,
  startingFrom,
  fraction_is_available,
  ...rest
}) => {

  return (
    <Box
      as={motion.div}
      maxWidth={'597.45px'}
      mx={'auto'}
      w='100%'
      cursor={"pointer"}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      borderRadius='xl'
      {...rest}
    >
      <Box
        borderRadius='xl'
        // zIndex={10}
        bgSize={"cover"}
        w='full'
        h={{ base: 'auto', md: "420px" }}
        bgImage={image}
        pt='27px'
        onClick={onClickCard}
        justifyContent='space-between'
        display='flex'
        flexDirection='column'
      >
        <Box px={"30px"}>
          {fraction_is_available && <CustomisedTag label={'Fractionalized'} />}
        </Box>
        <Box color={"white"} position={'relative'} h='100px'>
          <Box bg='linear-gradient(3.29deg, #000000 -19.04%, rgba(0, 0, 0, 0) 97.48%)' h='full' w='full' position={'absolute'} zIndex={0} borderRadius='xl' />
          <Box h='full' w='full' position={'absolute'} bottom='0' right='0' zIndex={0} >
            <Text px={"30px"} fontWeight={'600'} fontFamily='optimaMedium' fontSize={"24px"} mt='5px'>{title}</Text>
            <Flex px={"30px"} justify='space-between' align='flex-end' borderBottomRadius="lg" shadow='md'>
              <Text whiteSpace={'nowrap'} fontWeight={'500'} fontSize={'20px'} overflow='hidden' textOverflow={'ellipsis'}>{subtitle}</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
