import {Select as ChakraSelect, VStack} from '@chakra-ui/react';
import {InputLabel} from '../Input/Input';

export const Select = ({...rest}) => {
  return (
    <ChakraSelect
      variant="outline"
      border="none"
      borderRadius="none"
      borderBottom="1px #dee solid"
      color="dark#4545FE.100"
      textColor="dark#4545FE.100"
      borderColor="dark#4545FE.100"
      {...rest}
    />
  );
};
export const CustomSelect = ({mt, ...rest}) => {
  return (
    <VStack w="full" mt={mt ?? -4}>
      {/* {(label || showLabel) && <InputLabel as='label' label={label ?? restProps.placeholder} />} */}
      <InputLabel as="label" label={rest.placeholder} />
      <ChakraSelect
        h="50px"
        as="select"
        w={'100%'}
        variant="outline"
        // border='none'
        borderRadius="8px"
        borderBottom="1px #E5E5E5 solid"
        _placeholder={{
          color: 'gray.300',
        }}
        _active={{
          // borderRadius : 'none',
          // borderBottom : '1px #dee solid'
          border: '1px #dee solid',
        }}
        _visited={{
          // borderRadius : 'none',
          // borderBottom : '1px #dee solid'
          border: '1px #dee solid',
        }}
        {...rest}
        // {...inputCommonStyles}
      />
    </VStack>
  );
};
