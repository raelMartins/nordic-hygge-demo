import {
  Input as InputBase,
  SlideFade,
  VStack,
  Text,
  HStack,
  useNumberInput,
} from '@chakra-ui/react';
import {useState} from 'react';
import PhoneInput from 'react-phone-input-2';

export const InputLabel = ({label, isAuth}) => {
  return (
    <Text
      color={isAuth ? '#FFFFFF' : '#191919'}
      textStyle="p"
      textAlign="left"
      opacity={0.9}
      w="100%"
    >
      {label}
    </Text>
  );
};

export const Input = ({isAuth, error, label, ...restProps}) => {
  const [showLabel, setShowLabel] = useState(false);

  const handleLabel = () => {
    setShowLabel(!showLabel);
  };

  return (
    <VStack alignItems="flex-start" my={2} w="100%">
      {/* {(label || showLabel) && <InputLabel as='label' label={label ?? restProps.placeholder} />} */}
      <InputLabel isAuth={isAuth} as="label" label={label ?? restProps.placeholder} />

      <InputBase
        as="input"
        {...restProps}
        onClick={handleLabel}
        borderColor={error ? 'red' : `#e4e4e7 !important`}
        // variant={showLabel ? "outline": 'flushed'}
        variant={'outline'}
      />

      <SlideFade in={!!error} offsetY="20px">
        <Text textStyle="p-sm" color="red">
          {error}
        </Text>
      </SlideFade>
    </VStack>
  );
};

export function CustomNumberInput({placeholder, ...restProps}) {
  const {getInputProps, getIncrementButtonProps, getDecrementButtonProps} = useNumberInput({
    step: 0.01,
    // defaultValue : 1.53,
    min: 1,
    // max          : 6,
    precision: 2,
    placeholder: placeholder,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack w="full" pos="relative">
      <Input {...input} {...restProps} />
      {/* <Flex pos='absolute' right='2%' columnGap='15px'>
				<Text fontSize="24px" color='red' {...dec}>
					-
				</Text>
				<Text fontSize="24px" color='#4545FE' {...inc}>
					+
				</Text>
			</Flex> */}
    </HStack>
  );
}

export function CustomPhoneNumberInput({id, name, phoneState, setPhoneState, ...restProps}) {
  const telInputStyles = {
    width: '100%',
    height: '55px',
    padding: '1em',
    // rowGap: '-2em',
    marginTop: '1.5em',
    borderRadius: '12px',
    // border       : 'none',
    border: '0.5px lightgrey solid',
  };

  const telInputProps = {
    required: true,
    autoFocus: true,
    placeholder: 'Enter phone number',
  };
  return (
    <PhoneInput
      id={id}
      name={name}
      type="tel"
      country={'ng'}
      inputProps={telInputProps}
      inputStyle={telInputStyles}
      defaultValue={phoneState}
      {...restProps}
      onKeyPress={e => e.preventDefault()}
      onChange={phone => setPhoneState(phone)}
    />
  );
}

Input.Label = InputLabel;
