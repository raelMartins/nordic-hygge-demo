import {
  useDisclosure,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Image,
  Stack,
  Box,
  Text,
  Textarea,
  AspectRatio,
  useToast,
  Flex,
  StackDivider,
  Center,
  Badge,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import successGif from '/src/realtors_portal/images/check-icon.gif';

import {useMutation} from 'react-query';

import styled from '@emotion/styled';

import React, {useContext, createContext} from 'react';
import {useQuery} from 'react-query';
import {getMoreInfo, handleCoownerShipRequest} from '../../api/FetchNotif';
import {AMENITIES} from '../../constants/icons_image_url';
import {priceString} from '../../utils/formatAmount';
import {changeDateFormat} from '../../utils/formatDate';
import leftArrow from '/src/realtors_portal/images/icons/leftArrow.svg';
import rightAngle from '/src/realtors_portal/images/icons/right-angle.png';
import calendar from '/src/realtors_portal/images/icons/schedule-icon.png';
import {formatPropertySize} from '@/realtors_portal/utils/truncateLongText';

const NavContext = createContext();

export const useNavContext = () => {
  return useContext(NavContext);
};

const AnotherDisplay = () => {
  const {isOpen: unitIsOpen, onClose: unitOnClose, onOpen: unitOnOpen} = useDisclosure();
  const content = useNavContext();

  const [selected, setSelected] = React.useState(0);

  return (
    <>
      <Button
        fontSize="12px"
        boxSize="0"
        bg="transparent"
        _hover={{bg: 'transparent'}}
        fontWeight="500"
        py="4.5px"
        onClick={unitOnOpen}
      >
        <Flex cursor="pointer" gap="5px" align="center">
          <Text>View</Text>
          <Image alt="right arrow" src={rightAngle.src} />
        </Flex>
      </Button>
      <Modal isOpen={unitIsOpen} onClose={unitOnClose}>
        <ModalOverlay />
        <ModalContent fontFamily="Euclid Circular B " borderRadius="16px" maxW="723px" px="30px">
          <ModalHeader pb="0" fontSize={28} fontWeight={500} px="0">
            <Image cursor="pointer" onClick={unitOnClose} alt="left arrow" src={leftArrow.src} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py="20px" pt="16px" px="0">
            <Heading mb="22px" fontSize={28} fontWeight={500}>
              Unit Info
            </Heading>
            <Heading mb="15px" fontSize="24px" fontWeight="400">
              {content?.listing_name}
            </Heading>
            <Stack direction={['column', 'row']} spacing="30px">
              {/* <AspectRatio maxW="291px" object-fit="cover" ratio={1/1.06}> */}
              <Stack spacing="10px">
                <Image
                  alt=""
                  borderRadius="5px"
                  objectFit="cover"
                  src={content?.unit_info?.unit_img[selected].photo}
                  minW="291px"
                  h="309px"
                  bg="whitesmoke"
                  w="100%"
                />
                <HStack spacing="10px">
                  {content?.unit_info?.unit_img.map((obj, idx) => {
                    return (
                      <Stack key={idx} position="relative">
                        <Image
                          filter={selected !== idx && ' grayscale(100%) blur(1px)'}
                          alt=""
                          onClick={() => setSelected(idx)}
                          borderRadius="5px"
                          key={idx}
                          objectFit="cover"
                          src={obj.photo}
                          bg="whitesmoke"
                          boxSize="50px"
                        />
                        {selected === idx && (
                          <Box
                            h="3px"
                            position="absolute"
                            bottom="-8px"
                            w="full"
                            bg="#000000"
                            borderRadius="2px"
                          />
                        )}
                      </Stack>
                    );
                  })}
                </HStack>
              </Stack>
              {/* </AspectRatio> */}
              <Stack minW="331px" w="100%">
                <Center color="whitesmoke" borderRadius="5px" w="100%" mb="29px" bg="#000000">
                  <VStack px="100px" py="20px">
                    <Text w="100px" textAlign="center" fontSize="14px" as="span">
                      Offer price
                    </Text>
                    <Text fontSize="20px" w="250px" textAlign="center" as="span">
                      {priceString('naira', content?.offer_price)}
                    </Text>
                  </VStack>
                </Center>
                <VStack mb="15px" spacing="20px">
                  <Flex
                    borderBottom="1px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#606060">Unit Info</Text>
                    <Text fontWeight="500" w="200px" textAlign="end">
                      {' '}
                      {content?.unit_info?.unit_title}
                    </Text>
                  </Flex>
                  <Flex
                    color="#606060"
                    borderBottom="0.2px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text>Unit Size</Text>
                    <Text fontWeight="500">
                      {formatPropertySize(content?.unit_info?.unit_size)}
                    </Text>
                  </Flex>
                </VStack>
                <Box mb="20px">
                  <Heading fontSize="16px" fontWeight={500} mb="23px">
                    Amenities
                  </Heading>
                  <Wrap>
                    <Flex wrap="wrap" gap="18px">
                      {/* <Badge
                      borderRadius="32px"
                      px="16px"
                      py="12px"
                      fontSize="14px"
                      fontWeight={400}
                    >
                      4 Bedroom
                    </Badge>
                    <Badge
                      borderRadius="32px"
                      px="16px"
                      py="12px"
                      fontSize="14px"
                      fontWeight={400}
                    >
                      4 Bathrooms
                    </Badge>
                    <Badge
                      borderRadius="32px"
                      px="16px"
                      py="12px"
                      fontSize="14px"
                      fontWeight={400}
                    >
                      5 Toilets
                    </Badge>
                    <Badge
                      borderRadius="32px"
                      px="16px"
                      py="12px"
                      fontSize="14px"
                      fontWeight={400}
                    >
                      Laundry Room
                    </Badge> */}
                      {content?.unit_info?.amenities_list.map((item, idx) => {
                        return (
                          <Badge
                            key={idx}
                            borderRadius="32px"
                            px="16px"
                            py="12px"
                            fontSize="14px"
                            fontWeight={400}
                          >
                            <HStack align="center">
                              <Image
                                alt=""
                                boxSize="20px"
                                src={
                                  AMENITIES[item.name.toLowerCase().replace(/ |\/+/g, '_', '_')]
                                    ?.src
                                }
                              />
                              <Text
                                as="span"
                                textTransform="capitalize"
                                fontSize="14px"
                                fontWeight="400"
                              >
                                {item.name}
                              </Text>
                            </HStack>
                          </Badge>
                        );
                      })}
                    </Flex>
                  </Wrap>
                </Box>
                {/* {!content.unit_info?.price_history_list?.length ? (
                  []
                ) : (
                  <Box>
                    <Heading fontSize="16px" fontWeight={500} mb="23px">
                      Price History
                    </Heading>

                    <Grid
                      gap="9px"
                      templateColumns="repeat(3, auto)"
                      fontSize="14px"
                      justifyItems="flex-start"
                      fontWeight={400}
                      color="#191919"
                    >
                      <GridItem fontWeight={500}>Date</GridItem>
                      <GridItem fontWeight={500}>Event</GridItem>
                      <GridItem fontWeight={500}>Price</GridItem>
                    </Grid>
                    <Wrap>
                      <Grid
                        gap="9px"
                        templateColumns="repeat(3, auto)"
                        //   templateRows="repeat(3, 1fr)"
                        fontSize="14px"
                        fontWeight={400}
                        color="#191919"
                      >
                     

                        {!content.unit_info.price_history_list.length
                          ? []
                          : content.unit_info.price_history_list.map((item) => {
                              const toBeRendered = [];
                              for (let index = 0; index < 3; index++) {
                                switch (index) {
                                  case 0:
                                    toBeRendered[index] = (
                                      <GridItem w="fit-content">
                                        7/1/2022
                                      </GridItem>
                                    );

                                    break;
                                  case 1:
                                    toBeRendered[index] = (
                                      <GridItem>{item.event}</GridItem>
                                    );

                                    break;
                                  case 2:
                                    toBeRendered[index] = (
                                      <GridItem>
                                        {priceString("naira", item.price)}{" "}
                                        <Text
                                          as="span"
                                          fontSize="10px"
                                          fontWeight="400"
                                          color={
                                            item.direction === "drop"
                                              ? "#D92E33"
                                              : "green"
                                          }
                                        >
                                          {`(${
                                            item.direction === "drop" ? "-" : ""
                                          }${item.percentage}%)`}
                                        </Text>
                                      </GridItem>
                                    );

                                    break;

                                  default:
                                    break;
                                }
                              }

                              return toBeRendered;
                            })}
                      </Grid>
                    </Wrap>
                  </Box>
                )} */}
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Wrap = styled.div`
  height: 110px;
  overflow: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 16px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 16px;

    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 16px;

    background-color: darkgrey;
    // outline: 1px solid slategrey;
  }
`;

export const DisplayButton = ({addOns, space_id, coownershipId}) => {
  const {isOpen: displayIsOpen, onClose: displayOnClose, onOpen: displayOnOpen} = useDisclosure();

  const {data, isError, isLoading, error, refetch} = useQuery(['notifss' + addOns], () =>
    getMoreInfo(addOns)
  );

  const ss = {
    background: '#ffffff',
    border: '0.2px solid #000000',
    marginTop: '18px',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: 400,
    padding: '10px 12px',
    height: 'fit-content',
    width: '155px',
  };

  if (isLoading) {
    return;
  }
  if (isError) {
    return;
  }

  return (
    <>
      {/* <Button sx={ss} _hover={{ bg: "initial" }} onClick={displayOnOpen}> */}
      <Text
        color="#5451FF"
        fontSize="14px"
        cursor="pointer"
        fontWeight="600"
        onClick={displayOnOpen}
      >
        View
      </Text>
      {/* </Button> */}
      <Modal isOpen={displayIsOpen} onClose={displayOnClose}>
        <ModalOverlay />
        <ModalContent fontFamily="Euclid Circular B " borderRadius="16px" maxW="723px" px="30px">
          <ModalHeader pb="12px" fontSize={28} fontWeight={500} px="0">
            Offer details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Heading mb="15px" fontSize="24px" fontWeight="400">
              {data?.data?.data?.response?.listing_name}
            </Heading>
            <Stack direction={['column', 'row']} spacing="30px">
              {/* <AspectRatio maxW="291px" object-fit="cover" ratio={1/1.06}> */}
              <Image
                alt=""
                borderRadius="5px"
                minW="291px"
                objectFit="cover"
                src={data?.data?.data?.response?.img[0]?.photo}
                h="309px"
                bg="whitesmoke"
                w="100%"
              />
              {/* </AspectRatio> */}
              <Stack minW="331px" w="100%">
                <Center color="whitesmoke" borderRadius="5px" w="100%" mb="29px" bg="#000000">
                  <VStack px="100px" py="20px">
                    <Text w="100px" textAlign="center" fontSize="14px" as="span">
                      Offer price
                    </Text>
                    <Text fontSize="20px" w="200px" textAlign="center" as="span">
                      {priceString('naira', data?.data?.data?.response?.offer_price)}
                    </Text>
                  </VStack>
                </Center>
                <VStack spacing="20px">
                  <Flex
                    borderBottom="1px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#606060">Unit Info</Text>
                    <Flex flexDirection="column" align="flex-end" color=" #191919">
                      <Text mr="24px" textAlign="end" fontWeight="500" w="200px">
                        {data?.data?.data?.response?.unit_info?.unit_title}
                      </Text>
                      <NavContext.Provider value={data?.data?.data?.response}>
                        <AnotherDisplay />
                      </NavContext.Provider>
                    </Flex>
                  </Flex>
                  <Flex
                    borderBottom="0.2px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#606060">Payment Type</Text>
                    <Text fontWeight="500">
                      {data?.data?.data?.response?.payment_type} month plan
                    </Text>
                  </Flex>
                  <Flex
                    borderBottom="0.2px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#606060">Terms</Text>

                    <Text
                      border="1px solid #000000"
                      borderRadius="5px"
                      px="16px"
                      py="6px"
                      fontWeight="500"
                    >
                      View
                    </Text>
                  </Flex>
                  <Flex
                    borderBottom="0.2px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#606060">Offer Date</Text>

                    <Text fontWeight="500">
                      {changeDateFormat(data?.data?.data?.response?.offer_date)}
                    </Text>
                  </Flex>
                  <Flex
                    borderBottom="0.2px solid #D3D3D3"
                    pb="12px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#606060">Offer Expiration Date</Text>
                    <Text fontWeight="500"></Text>
                    {changeDateFormat(data?.data?.data?.response?.offer_expiration_date)}
                  </Flex>
                </VStack>
                <ModalFooter pt="35px" px="0">
                  {/* <Button bg="#000000" color="#FFFFFF" w="50%">
                    Proceed
                  </Button> */}
                  <NavContext.Provider
                    value={{
                      ...data?.data?.data?.response,
                      refetch,
                      space_id,
                      coownershipId,
                    }}
                  >
                    <OfferDetails_ />
                  </NavContext.Provider>
                </ModalFooter>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const OfferDetails_ = () => {
  const offerDetails = useDisclosure();
  const content = useNavContext();
  const [selected, setSelected] = React.useState(0);

  return (
    <>
      <Button onClick={offerDetails.onOpen} bg="#000000" color="#FFFFFF" w="50%">
        Proceed
      </Button>
      <Modal isOpen={offerDetails.isOpen} onClose={offerDetails.onClose}>
        <ModalOverlay />
        <ModalContent fontFamily="Euclid Circular B " borderRadius="16px" minW="723px" px="30px">
          <ModalHeader pb="12px" fontSize={28} fontWeight={500} px="0">
            <Image onClick={offerDetails.onClose} alt="left arrow" src={leftArrow.src} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <Heading pb="12px" fontSize={28} fontWeight={500} px="0">
              Offer details
            </Heading>

            <Heading mb="15px" fontSize="24px" fontWeight="400">
              {content?.listing_name}
            </Heading>
            <Stack direction={['column', 'row']} spacing="30px">
              {/* <AspectRatio maxW="291px" object-fit="cover" ratio={1/1.06}> */}
              <Stack spacing="10px">
                <Image
                  alt=""
                  borderRadius="5px"
                  objectFit="cover"
                  src={content?.img[selected]?.photo}
                  minW="291px"
                  h="309px"
                  bg="whitesmoke"
                  w="100%"
                />
                <HStack spacing="10px">
                  {content?.img.map((obj, idx) => {
                    return (
                      <Stack key={idx} position="relative">
                        <Image
                          alt=""
                          filter={selected !== idx && 'grayscale(100%)'}
                          onClick={() => setSelected(idx)}
                          borderRadius="5px"
                          key={idx}
                          objectFit="cover"
                          src={obj.photo}
                          bg="whitesmoke"
                          boxSize="50px"
                        />
                        {selected === idx && (
                          <Box
                            h="3px"
                            position="absolute"
                            bottom="-8px"
                            w="full"
                            bg="#000000"
                            borderRadius="2px"
                          />
                        )}
                      </Stack>
                    );
                  })}
                </HStack>
              </Stack>
              {/* </AspectRatio> */}
              <Stack minW="331px" w="100%">
                <HStack
                  justify="space-between"
                  color="whitesmoke"
                  borderRadius="5px"
                  w="100%"
                  px="18px"
                  align="center"
                  mb="20px"
                  bg="#000000"
                >
                  {' '}
                  <VStack py="20px" spacing="4px" align="flex-start">
                    <Text
                      w="150px"
                      textAlign="start"
                      fontSize="24px"
                      fontWeight="600"
                      as="span"
                      color="#ffffff"
                    >
                      {content?.payment_type} Months
                    </Text>
                    <Text fontSize="14px" fontWeight="400" color="#ffffff" as="span">
                      Plan
                    </Text>
                  </VStack>
                  <Image alt="calendar" src={calendar.src} />
                </HStack>
                <Center borderRadius="5px" w="100%" border="1px solid #000000" color="#000000">
                  <VStack px="50px" w="full" py="20px">
                    <Text w="100px" textAlign="center" fontSize="14px" fontWeight="400" as="span">
                      Initial Deposit
                    </Text>
                    <Text fontSize="20px" fontWeight="600" as="span">
                      {priceString('naira', content?.initial_deposit ?? '0')}
                    </Text>
                  </VStack>
                </Center>
                <VStack spacing="20px">
                  <HStack
                    mt="20px"
                    borderBottom="1px solid #D3D3D3"
                    pb="5px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#000000" fontSize="10px" fontWeight="400">
                      Unit Info
                    </Text>

                    <Text color="#191919" fontWeight="400" fontSize="12px">
                      {content?.unit_info?.unit_title}
                    </Text>
                  </HStack>
                  {/* <HStack
                    mt="10px"
                    borderBottom="1px solid #D3D3D3"
                    pb="5px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#000000" fontSize="10px" fontWeight="400">
                      Documentation fee
                    </Text>

                    <Text color="#191919" fontWeight="400" fontSize="12px">
                      {priceString("naira", content.development_fee)}
                    </Text>
                  </HStack> */}
                  <HStack
                    mt="10px"
                    borderBottom="1px solid #D3D3D3"
                    pb="5px"
                    justify="space-between"
                    w="100%"
                    fontSize="16px"
                  >
                    <Text color="#000000" fontSize="10px" fontWeight="400">
                      Development fee
                    </Text>

                    <Text color="#191919" fontWeight="400" fontSize="12px">
                      {priceString('naira', content?.development_fee ?? '0')}
                    </Text>
                  </HStack>
                  <Center borderRadius="5px" w="100%" mt="22px" color="#000000">
                    <VStack px="100px" py="20px">
                      <Text
                        w="100px"
                        textAlign="center"
                        fontSize="14px"
                        fontWeight="400"
                        as="span"
                        minW="116px"
                      >
                        Monthly Payment
                      </Text>
                      <Text fontSize="20px" fontWeight="600" as="span">
                        {priceString('naira', content?.monthly_payment ?? '0')}
                      </Text>
                    </VStack>
                  </Center>
                </VStack>
                <ModalFooter pt="0" px="0">
                  <RejectMenu offerDetails={offerDetails} />
                  <Button h="38px" bg="#000000" w="155px" color="#FFFFFF">
                    Proceed
                  </Button>
                </ModalFooter>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const RejectMenu = ({offerDetails}) => {
  const [reason, setReason] = React.useState('');
  const reject = useDisclosure();
  const success = useDisclosure();

  const content = useNavContext();
  const toast = useToast();

  const mutation = useMutation(
    formData => handleCoownerShipRequest(content?.coownershipId, formData),
    {
      onSuccess: async res => {
        reject.onClose();

        await content.refetch();
        success.onOpen();
      },
      onError: err => {
        reject.onClose();

        toast({
          title: 'An error occured',
          description: `${err?.code} : ${err?.message}`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const handleRequest = reason => {
    return mutation.mutate({
      action: 'declined',
      decline_reason: reason,
      space_id: content.space_id,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    return handleRequest(reason);
  };

  const handleClose = () => {
    setReason('');
    return reject.onClose();
  };

  const isValid = reason.trim();

  return (
    <>
      <Button
        //   isDisabled={mutation.isLoading}
        h="38px"
        mt={0}
        mr="15px"
        variant="outline"
        border="1px solid #9E9E9E"
        borderRadius="5px"
        color="#D92E33"
        w="155px"
        onClick={reject.onOpen}
      >
        Reject
      </Button>
      <Modal isCentered isOpen={reject.isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent fontFamily="Euclid Circular B " borderRadius="16px">
          <ModalCloseButton />
          <ModalHeader pb="0" mb="5px" fontSize="24px" textAlign="start" w="full" fontWeight="600">
            Why are you rejecting this offer?
          </ModalHeader>
          <ModalBody pt="0" pb="21px">
            <VStack spacing="none">
              {/* <Text
                as="span"
                color="#3D3D3D"
                textAlign="start"
                w="full"
                fontSize="14px"
                fontWeight="300"
                mb="5px"
              >
                Why are you rejecting this offer?
              </Text> */}
              <Text mb="26px" color="#919191" fontSize="16px" fontWeight="400">
                Kindly let us know why you are rejecting this invitation.
              </Text>
              <Box w="full" position="relative">
                <Textarea
                  maxLength="250"
                  name="reason"
                  onChange={e => setReason(e.target.value)}
                  value={reason}
                  resize="none"
                  width="full"
                  height="150px"
                  pb="34px"
                />
                <Text
                  as="span"
                  fontSize="14px"
                  position="absolute"
                  bottom="0"
                  right="5px"
                  fontWeight="300"
                  color="#CBCBCB"
                >
                  {reason?.length}/250
                </Text>
              </Box>
              <Button
                mt="32px"
                onClick={handleSubmit}
                isLoading={mutation.isLoading}
                isDisabled={!isValid}
                h="38px"
                fontSize="16px"
                borderRadius="5px"
                alignSelf="end"
                bg="#000000"
                w="155px"
                color="#FFFFFF"
              >
                {mutation.isLoading ? <Spinner color="whitesmoke" /> : 'Proceed'}
                {/* Proceed */}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal onClose={success.onClose} isOpen={success.isOpen} isCentered>
        <ModalCloseButton />
        <ModalOverlay />
        <ModalContent fontFamily="Euclid Circular B " borderRadius="16px" p="32px" pb="44px">
          <ModalBody p="0">
            <VStack spacing>
              <Image
                width="88px"
                height="88px"
                objectFit="contain"
                src={successGif.src}
                alt="success image"
              />
              <Heading as="h1" mt="23px" color="#191919" fontSize="32px" fontWeight="600">
                {/* Request Rejected Successfully */}
                Done!
              </Heading>
              {/* <Text  as="span" fontSize="16px" fontWeight="300">

              </Text> */}
              <Button
                onClick={() => (offerDetails.onClose(), success.onClose())}
                w="full"
                h="55px"
                variant="violet"
                mt="20px"
                bg="#000000"
                color="#ffffff"
              >
                Ok
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
