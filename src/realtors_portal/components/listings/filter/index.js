/* eslint-disable react/no-children-prop */
import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import filter_icon from '@/realtors_portal/images/icons/filter_icon.svg';
import searchIcon from '@/realtors_portal/images/icons/search_icon.svg';
import React, {useState} from 'react';
import OptionsToRadio from './OptionsToRadio';
import {useRouter} from 'next/router';
import {
  construction_constants,
  listings_status_constants,
  listings_type_constants,
} from '@/realtors_portal/constants/constantsForListingsFilter';
import {RButton} from '@/realtors_portal/ui-lib';
import {MY_COUNTRY} from '@/constants/country';
import {navbar_height} from '../../AgentLayout/View';
import {drawer_style} from '../../AgentLayout/drawers/drawer_style';
import isMobile from '@/utils/extras';

export const Filter = ({setUrl, url, hideText, forFilter}) => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const [toBeFiltered, setToBeFiltered] = useState({});

  const router = useRouter();

  const handleRange = e => setToBeFiltered({...toBeFiltered, price_from: e[0], price_to: e[1]});
  const handleChange = e => {
    if (e.target?.name === 'reset') {
      return setToBeFiltered({});
    }
    if (e.target?.name?.toLowerCase() === 'number_of_bedroom') {
      return setToBeFiltered({
        ...toBeFiltered,
        [e.target.name]: e.target.textContent,
      });
    }

    return setToBeFiltered({
      ...toBeFiltered,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilter = () => {
    if (!Object.entries(toBeFiltered).length) {
      setUrl({...url, filter: '', param: `${url.sort && '?'}${url.sort}`});
      router.push(`${router.route}${url.sort && '?'}${url.sort}`);
      setToBeFiltered({});

      return onClose();
    }

    const filter_param = `${Object.entries(toBeFiltered)
      .map(([name, value]) => {
        if (value === 'Any') {
          return null;
        }
        return `${
          name === 'number_of_bedroom' ? (value.includes('+') ? 'bedroom_above' : name) : name
        }=${
          name === 'number_of_bedroom'
            ? value.includes('+')
              ? value.replace('+', '')
              : value
            : value
        }`;
      })
      .filter(item => item)
      .join('&')}`;

    setUrl({
      ...url,
      filter: filter_param,

      param: `?${filter_param}${url.sort && '&'}${url.sort}`,
    });
    router.push(`${router.route}?${filter_param}${url.sort && '&'}${url.sort}`);
    setToBeFiltered({});
    return onClose();
  };

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#606060',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };
  return (
    <>
      <Button
        onClick={onOpen}
        alignSelf="flex-end"
        bg="#fff"
        fontWeight="400"
        fontSize="14px"
        lineHeight="18px"
        _hover={{
          opacity: '1',
        }}
        color="#191919"
        width={hideText ? `max-content` : {md: '144px'}}
        height={hideText ? `max-content` : {md: '48px'}}
        p={hideText ? `10px` : {base: 4, md: 0}}
        border="1px solid #E0E0E0 !important"
        borderRadius={hideText ? `8px` : {base: 'full', md: '12px'}}
        _active={{
          background: '#fff',
        }}
      >
        <HStack justify="center" spacing="9px">
          <Image w="18px" h="18px" src={filter_icon.src} alt="sort by icon" fontSize="10px" />{' '}
          {!hideText && <Text display={{base: 'none', md: 'flex'}}>Filter</Text>}
        </HStack>
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        closeOnSelect={false}
        placement={isMobile ? `bottom` : 'right'}
      >
        <DrawerOverlay />
        <DrawerContent
          {...drawer_style}
          borderRadius={{base: `12px 12px 0px 0px`, lg: `0px`}}
          maxH={{base: `75vh`, lg: `100%`}}
          overflow={`auto`}
        >
          <HStack
            mb="20px"
            py="12px"
            h="49.699px"
            bg="#F5F5F5"
            px="29px"
            justify="space-between"
            align="center"
            position="relative"
          >
            <Heading fontSize="18.9px" fontWeight="700">
              Filter
            </Heading>
            <HStack align="center" justify="space-between">
              <Text
                as="button"
                color="#4545FE"
                cursor="pointer"
                fontSize="14px"
                fontWeight="300"
                border="none"
                name="reset"
                onClick={handleChange}
              >
                Reset
              </Text>

              <HStack spacing="15px">
                <VStack
                  position="relative"
                  justify="center"
                  align="center"
                  w="30px"
                  h="30px"
                  borderRadius="5px"
                  transition="0.3s ease-in-out"
                  _hover={{
                    width: '30px',
                    height: '30px',
                  }}
                >
                  <DrawerCloseButton
                    right="0px"
                    left="0px"
                    my="auto"
                    color="#000"
                    top="0"
                    bottom="0"
                  />
                </VStack>
              </HStack>
            </HStack>
          </HStack>

          <DrawerBody sx={customScrollbarStyles} p="0px" pl="20px" pr="20.5px" mr="7px">
            {/* <Wrap> */}
            <VStack align="flex-start" pl="5px" spacing="13px" w="full">
              {/* <VStack w="full" maxW="337px" spacing="6px">
                <Heading alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Location
                </Heading>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Image src={searchIcon.src} alt="seacrh icon" />}
                  />
                  <Input
                    placeholder="Search location"
                    type="text"
                    name="country"
                    border="solid 1px #606060"
                    onChange={handleChange}
                    value={toBeFiltered?.country ?? ''}
                    borderRadius="10px"
                    borderColor="#E4E4E4"
                    h="39px"
                    px="10px"
                  />
                </InputGroup>
              </VStack> */}

              <VStack
                w="full"
                align="flex-start"
                pb="13px"
                borderBottom="1px solid #E4E4E4"
                spacing="6px"
              >
                <Heading
                  // mb="12px"
                  alignSelf={'flex-start'}
                  fontSize="14px"
                  fontWeight="600"
                >
                  Number of Bedroom
                </Heading>

                <HStack maxW="326px" spacing="9.47px">
                  {['Any', '1', '2', '3', '4', '5', '6', '7+'].map((item, idx) => (
                    <Button
                      borderRadius="8.1px"
                      fontSize="10.2px"
                      key={idx}
                      bg={item === toBeFiltered.number_of_bedroom ? '#191919' : '#F5F5F5'}
                      color={item === toBeFiltered.number_of_bedroom ? '#ffffff' : '#3D3D3D'}
                      px="11px"
                      w="26px"
                      minW="fit-content"
                      py="5.5px"
                      h="25px"
                      onClick={handleChange}
                      name="number_of_bedroom"
                      lineHeight="14px"
                    >
                      {item}
                    </Button>
                  ))}
                </HStack>
              </VStack>

              <VStack
                w="full"
                pb="13px"
                align="flex-start"
                borderBottom="1px solid #E4E4E4"
                spacing="none"
              >
                <Heading mb="10px" alignSelf={'flex-start'} fontSize="14px" fontWeight="600">
                  Price
                </Heading>
                {/* 
                <Box pl="10px">
                  <RangeSlider
                    w="316px"
                    aria-label={['min', 'max']}
                    min={forFilter?.min_price ?? 0}
                    max={forFilter?.max_price ?? 0}
                    value={[toBeFiltered?.price_from ?? 0, toBeFiltered?.price_to ?? 0]}
                    onChange={handleRange}
                  >
                    <RangeSliderTrack bg="#E4E4E4" h="7.44px" borderRadius="8px">
                      <RangeSliderFilledTrack bg="#000000" />
                    </RangeSliderTrack>
                    <RangeSliderThumb
                      index={0}
                      bg="black"
                      boxSize="20.9px"
                      border="solid 2px white"
                    />
                    <RangeSliderThumb
                      index={1}
                      boxSize="20.9px"
                      border="solid 2px white"
                      bg="black"
                    />
                  </RangeSlider>
                </Box> */}

                <HStack mt="10px" alignSelf="flex-start" spacing="20px">
                  {/* <Box pb="6px" borderBottom="1px solid #E4E4E4" minW="73px">
                    <Text as="span" fontSize="16px" fontWeight="400" color="#919191">
                      {toBeFiltered?.price_from ?? 'Min'}
                    </Text>
                  </Box> */}
                  <Stack spacing="1.5">
                    <label>Min</label>
                    <HStack px="0" spacing="none" position="relative">
                      <Center
                        bg={`#86EFAC`}
                        color={`#fff`}
                        boxSize={`18px`}
                        fontSize={`14px`}
                        borderRadius={`4px`}
                        position="absolute"
                        left="10px"
                      >
                        {MY_COUNTRY?.symbol}
                      </Center>{' '}
                      <Input
                        focusBorderColor="#4545FE"
                        name="amount"
                        type="number"
                        paddingLeft="2.5rem"
                        paddingRight="1rem"
                        border="1px solid #E4E4E4"
                        borderRadius="5px"
                        // placeholder="Amount"
                        // onBlur={e => isANumber(e.target.value)}
                        onChange={e =>
                          setToBeFiltered({
                            ...toBeFiltered,
                            price_from: e.target.value,
                          })
                        }
                        value={toBeFiltered?.price_from || 0}
                      />
                    </HStack>
                  </Stack>
                  {/* <Box pb="6px" borderBottom="1px solid #E4E4E4" minW="73px">
                    <Text as="span" fontSize="16px" fontWeight="400" color="#919191">
                      {toBeFiltered?.price_to ?? 'Max'}
                    </Text>
                  </Box> */}
                  <Stack spacing="1.5">
                    <label>Max</label>
                    <HStack px="0" spacing="none" position="relative">
                      <Center
                        bg={`#86EFAC`}
                        color={`#fff`}
                        boxSize={`18px`}
                        fontSize={`14px`}
                        borderRadius={`4px`}
                        position="absolute"
                        left="10px"
                      >
                        {MY_COUNTRY?.symbol}
                      </Center>
                      <Input
                        focusBorderColor="#4545FE"
                        name="amount"
                        type="number"
                        paddingLeft="2.5rem"
                        paddingRight="1rem"
                        border="1px solid #E4E4E4"
                        borderRadius="5px"
                        // placeholder="Amount"
                        // onBlur={e => isANumber(e.target.value)}
                        onChange={e => setToBeFiltered({...toBeFiltered, price_to: e.target.value})}
                        value={toBeFiltered?.price_to || 0}
                      />
                    </HStack>
                  </Stack>
                </HStack>
              </VStack>
              <VStack spacing="14px" w="full" pb="13px" borderBottom="1px solid #E4E4E4">
                <OptionsToRadio
                  name="Construction Level"
                  options={toBeFiltered}
                  setOption={setToBeFiltered}
                  constants={construction_constants}
                />
                <OptionsToRadio
                  options={toBeFiltered}
                  setOption={setToBeFiltered}
                  name="Listing Type"
                  constants={listings_type_constants}
                />{' '}
                <OptionsToRadio
                  options={toBeFiltered}
                  setOption={setToBeFiltered}
                  name="Listing Status"
                  constants={listings_status_constants}
                />
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <RButton variation={`primary`} onClick={applyFilter} w={`100%`}>
              Apply
            </RButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filter;
