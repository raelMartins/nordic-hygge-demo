import React from 'react';

import check from '/src/realtors_portal/images/icons/check_listing_filter.svg';

import {
  Box,
  HStack,
  chakra,
  Image,
  Text,
  useRadio,
  useRadioGroup,
  VStack,
  Heading,
  SimpleGrid,
} from '@chakra-ui/react';

export const OptionsToRadio = ({constants, options, setOption, name}) => {
  const handleChange = value => {
    return setOption({
      ...options,
      [name === 'Construction Level' ? 'build_level' : name?.toLowerCase()?.replace(' ', '_')]:
        value === 'Flat/Apartment' ? 'Apartment Complex' : value,
    });
  };
  const {getRadioProps, getRootProps} = useRadioGroup({
    value:
      options?.[
        name === 'Construction Level' ? 'build_level' : name?.toLowerCase()?.replace(' ', '_')
      ] ?? '',
    onChange: handleChange,
  });
  return (
    <VStack
      w="full"
      // pb="13px"
      align="flex-start"
      // borderBottom="1px solid #E4E4E4"
      spacing="none"
      columns={3}
    >
      <Heading mb="10px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
        {name?.replace('_', ' ')}
      </Heading>
      <HStack {...getRootProps()}>
        <SimpleGrid gap="5.4px" columns={3}>
          {constants?.map(item => {
            return (
              <CustomRadio key={item.name} option={item} {...getRadioProps({value: item.name})} />
            );
          })}
        </SimpleGrid>
      </HStack>
    </VStack>
  );
};

export default OptionsToRadio;

function CustomRadio(props) {
  const {option, ...radioProps} = props;
  const {state, getInputProps, getCheckboxProps, htmlProps, getLabelProps} = useRadio(radioProps);
  return (
    <chakra.label {...htmlProps} {...getLabelProps()} cursor="pointer">
      <input {...getInputProps()} hidden />
      <Box {...getCheckboxProps()} p="5px" borderRadius="8.12px" h="61px" w="113px" bg="#F5F5F5">
        <VStack spacing="12px" align="flex-start">
          <Image alt="" ml="9px" src={option.image} />
          <HStack justify="space-between" spacing="none" w="full">
            <Text as="span" fontSize="9.47px" color="#3D3D3D" fontWeight="400">
              {option.name}
            </Text>
            <HStack
              border="1px solid #CBCBCB"
              borderRadius="full"
              p="1px"
              bg="transparent"
              justify="center"
            >
              <Box>
                <Image alt="" opacity={state.isChecked ? 1 : 0} src={check.src} />
              </Box>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </chakra.label>
  );
}
