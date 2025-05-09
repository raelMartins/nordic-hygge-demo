import {useState} from 'react';
import {
  ModalContent,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  Box,
  HStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  Center,
  useTheme,
} from '@chakra-ui/react';
import {Button, CustomizableButton, Spinner} from '@/ui-lib';
import {useQuery} from 'react-query';
import {useRouter} from 'next/router';
import {fetchPaymentPlanDoc} from '@/api/listings';
import isMobile from '@/utils/extras';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';

const PurchaseAgreementSVG = () => {
  const theme = useTheme();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path
        opacity="0.4"
        d="M56.2803 17.0469H46.4703C44.0263 17.063 41.706 15.9759 40.1573 14.0891L36.9267 9.62281C35.404 7.71945 33.0837 6.62721 30.6434 6.66501H23.708C11.26 6.66501 6.66602 13.9708 6.66602 26.3935V39.8221C6.65052 41.2987 73.318 41.2967 73.3223 39.8221V35.9177C73.3817 23.4949 68.9063 17.0469 56.2803 17.0469Z"
        fill={theme?.colors?.text}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M69.7736 17.8139C70.8403 19.0608 71.6643 20.4952 72.204 22.0436C73.266 25.2258 73.7576 28.57 73.6563 31.9227V49.4327C73.652 50.9077 73.5433 52.3804 73.3303 53.84C72.925 56.4157 72.019 58.8874 70.663 61.116C70.0396 62.1927 69.283 63.1864 68.4103 64.0737C64.461 67.6987 59.2166 69.5854 53.858 69.309H26.7687C21.4017 69.5834 16.1487 67.6974 12.1867 64.0737C11.3247 63.1847 10.5779 62.191 9.96384 61.116C8.61584 58.889 7.72897 56.4147 7.35567 53.84C7.1183 52.3827 6.99937 50.909 7 49.4327V31.9227C6.99944 30.4604 7.07857 28.9989 7.23714 27.5451C7.27047 27.29 7.32047 27.0391 7.36994 26.7908C7.45244 26.3768 7.5335 25.9701 7.5335 25.5633C7.83437 23.8089 8.3832 22.106 9.1636 20.5055C11.4754 15.566 16.2175 13.0519 23.9827 13.0519H56.5846C60.934 12.7155 65.251 14.0248 68.6773 16.7195C69.0716 17.0541 69.4386 17.4201 69.7736 17.8139ZM23.5678 47.806H57.1183H57.1776C57.9136 47.838 58.632 47.5744 59.1723 47.0744C59.7123 46.574 60.0293 45.879 60.0523 45.144C60.094 44.498 59.8813 43.861 59.4596 43.3694C58.9746 42.7084 58.206 42.3137 57.385 42.3044H23.5678C22.0455 42.3044 20.8114 43.536 20.8114 45.0554C20.8114 46.5744 22.0455 47.806 23.5678 47.806Z"
        fill={theme?.colors?.text}
      />
    </svg>
  );
};

const Terms = ({
  fullPayment,
  onCloseModal,
  setStep,
  PAYMENT_PLAN_DATA,
  buyModal,
  selectedPlan,
  unitData,
  setFullPayment,
}) => {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);
  const param = fullPayment
    ? `unit=${router.query?.unit ?? unitData?.id}&purpose=outright`
    : `plan=${selectedPlan?.id}&purpose=paymentplan`;
  const projectDocQuery = useQuery(['fetchPaymentPlanDoc', param], () =>
    fetchPaymentPlanDoc(param)
  );
  const projectDocument =
    projectDocQuery.data?.data?.results?.[0]?.document_file ||
    projectDocQuery.data?.data?.results?.[0]?.document_url;

  const handleBack = () => {
    if (selectedPlan) setStep('plan');
    else {
      setFullPayment(false);
      setStep('type');
    }
  };

  const isSafari =
    typeof window !== 'undefined' &&
    !window.navigator?.userAgent.includes('Chrome') &&
    window.navigator?.userAgent.includes('Safari');

  const mainContent = (
    <>
      <Flex align={'center'} justify={'space-between'}>
        <HStack align={'center'} spacing={'10px'}>
          {PAYMENT_PLAN_DATA?.length > 1 && (
            <ArrowBackIcon
              color="text"
              fontSize={'25px'}
              onClick={handleBack}
              style={{cursor: 'pointer'}}
            />
          )}
          <Text
            color="text"
            fontSize={{base: '23px', md: '28px'}}
            fontWeight={400}
            className="gilda-displayRegular"
          >
            Terms of Service
          </Text>
        </HStack>
        <CloseIcon fontSize={'15px'} onClick={onCloseModal} />
      </Flex>

      <Box overflowY={'auto'} my="22px">
        {projectDocQuery?.isLoading ? (
          <Center h="full">
            <Spinner size={40} disableAbsoluteCenteredSpinner />
          </Center>
        ) : (
          <VStack spacing={'20px'} h="full">
            {/* <Image src={purchaseAgreement.src} /> */}
            <PurchaseAgreementSVG />
            <a href={projectDocument} target="_blank">
              <Button
                border="1px solid !important"
                color="custom_color.color"
                bg="custom_color.background"
                h="35px"
                w="164px"
                borderColor="custom_color.color"
              >
                View Document
              </Button>
            </a>
            <HStack
              w="full"
              spacing="10px"
              onClick={() => setAccepted(!accepted)}
              cursor={'pointer'}
              align={'flex-start'}
            >
              <Center
                mt="2px"
                w="20px"
                h="20px"
                borderRadius={'full'}
                border={'1px solid'}
                borderColor="custom_color.color"
              >
                {accepted && (
                  <Box w="12px" h="12px" borderRadius={'full'} bg="custom_color.color" />
                )}
              </Center>
              <Text w="fit-content" fontSize={'14px'} fontWeight={300} color={'matador_text.300'}>
                By checking this box, I acknowledge that I’ve read and accept the terms of the
                agreement.
              </Text>
            </HStack>
          </VStack>
        )}
      </Box>

      <Flex my="20px" justify="center" align="center" gap="20px">
        <CustomizableButton
          border="1px solid !important"
          color="text"
          borderColor="matador_border_color.100 !important"
          bg="matador_background.100"
          h="49px"
          w="302px"
          onClick={buyModal?.onClose}
        >
          Cancel
        </CustomizableButton>
        <Button
          disabled={!accepted}
          isDisabled={!accepted}
          onClick={() => setStep('summary')}
          color="custom_color.contrast"
          w="302px"
          bg="custom_color.color"
          h="49px"
        >
          Accept & Continue
        </Button>
      </Flex>
    </>
  );

  return mainContent;
  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            color={`text`}
            maxW="944px"
            px={{base: '18px', md: '35px'}}
            py={{base: '18px', md: '30px'}}
            h="fit-content"
            // borderTopRadius={{base: '10px', md: '16px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          blockScrollOnMount
          onCloseComplete={onCloseModal}
          isCentered
          onClose={buyModal?.onClose}
          isOpen={buyModal?.isOpen}
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            color={`text`}
            maxW="470px"
            px={{base: '18px', md: '35px'}}
            py={{base: '18px', md: '30px'}}
            h="fit-content"
            borderRadius={0}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Terms;
