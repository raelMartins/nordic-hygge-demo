import {
  Text,
  useToast,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Flex,
  VStack,
  HStack,
  Center,
  Image,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../../ui-lib';
import {ArrowBackIcon, CheckIcon, CloseIcon} from '@chakra-ui/icons';
import {themeStyles} from '../../../../theme';
import EmptyState from '../../../../components/appState/empty-state';
import {useQuery} from 'react-query';
import {fetchSavedCards} from '../../../../api/payment';
import debitCard from '../../../../images/icons/debit-card.svg';
import emptyCard from '../../../../images/icons/credit-card-duotone.svg';
import {useMutation} from 'react-query';
import {BiPlus} from 'react-icons/bi';
import {appWindow, storeName} from '../../../../constants/routes';
import {makeeDepositToWallet} from '../../../../api/Wallet';
import {formatToCurrency} from '../../../../utils';
import isMobile from '../../../../utils/extras';
import {DebitCardSVG} from '../../../../components/assets/svgs';
import {useCustomToast} from '@/components/CustomToast';

const PaymentMethod = ({
  recurringModal,
  setStep,
  setSelectedCard,
  selectedCard,
  amountToPay,
  autoDebitFrequency,
  onCloseModal,
  startDate,
}) => {
  const toast = useCustomToast();
  const {data} = useQuery(['cardSaved'], fetchSavedCards);

  const MAKE_DEPOSITS_MUTATION = useMutation(formData => makeeDepositToWallet(formData), {
    onSuccess: res => {
      const link = res?.data?.data?.data?.link;
      if (link) openExternalUrl(link, '_blank');
    },
    onError: err => {
      toast({
        title: 'Oops...',
        description: `${
          err?.response?.data?.message ??
          err?.response?.message ??
          err?.response?.data[0] ??
          'Something went wrong'
        }`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleAddNewCard = () => {
    const body = {
      amount: Number(50),
      channel: 'card',
      store: storeName,
    };
    MAKE_DEPOSITS_MUTATION.mutate(body);
  };

  const handleSelectACArd = () => {
    if (selectedCard) {
      setStep('type');
    } else {
      return toast({
        title: 'Cannot Initiate Deposit',
        description: `Please select a card to use`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  function getNumberWithOrdinal(n) {
    var s = ['th', 'st', 'nd', 'rd'],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const mainContent = (
    <>
      <Flex direction="row" justify="space-between" align={'center'} mb="20px">
        <Text
          color="text"
          fontSize={{base: '23px', md: '28px'}}
          fontWeight={400}
          className="heading-text-semibold"
        >
          Recurring deposit
        </Text>
        <CloseIcon
          fontSize={'18px'}
          color={'text'}
          style={{cursor: 'pointer'}}
          onClick={recurringModal?.onClose}
        />
      </Flex>
      <Flex
        justify={'center'}
        gap="4px"
        align={'center'}
        bg="matador_background.200"
        py={{base: '18px', md: '25px'}}
        direction={'column'}
        border={'0.5px solid'}
        borderColor={`matador_border_color.100 !important`}
      >
        <Text color="matador_form.label" fontSize={{base: '16px', md: '16px'}} fontWeight={400}>
          You will pay
        </Text>
        <Text color="text" fontSize={{base: '28px', md: '33px'}} fontWeight={500}>
          {formatToCurrency(amountToPay)}
        </Text>
        <Text color="matador_form.label" fontSize={{base: '16px', md: '16px'}} fontWeight={400}>
          {autoDebitFrequency || '-'}
        </Text>
        {autoDebitFrequency && (
          <Text
            fontSize={'12px'}
            color="matador_form.label"
            maxW="85%"
            mx="auto"
            textAlign={'center'}
            mt={{base: '8px', md: '13px'}}
          >
            <Text as="span" textTransform={'capitalize'}>
              {autoDebitFrequency?.toLowerCase()}
            </Text>{' '}
            automated deductions will be made from your designated fund source starting from{' '}
            <Text color="text" as="b" fontWeight={600}>
              {getNumberWithOrdinal(new Date(startDate).getDate())}{' '}
              {months[new Date(startDate).getMonth()]}
            </Text>
          </Text>
        )}
      </Flex>

      <Text
        color="text"
        fontSize={{base: '16px', md: '16px'}}
        mt={{base: '24px', md: '24px'}}
        mb={{base: '12px', md: '12px'}}
        fontWeight={500}
      >
        Select fund source
      </Text>
      <VStack spacing={{base: '12px', md: '16px'}} mt="6px" align={'stretch'}>
        {data?.data?.results?.length ? (
          <>
            {data?.data?.results?.map((card, index) => (
              <Flex
                key={card?.id}
                onClick={() => setSelectedCard(card)}
                cursor="pointer"
                gap="5px"
                justify="space-between"
                direction={'row'}
                px={{base: '10px', md: '14px'}}
                py={{base: '12px', md: '16px'}}
                w="full"
                p={{base: '12px', md: '16px'}}
                border={selectedCard?.id === card.id ? '1px solid' : '1px solid'}
                borderColor={selectedCard?.id === card.id ? 'text' : 'matador_border_color.100'}
                _hover={{border: '1px solid', borderColor: 'matador_border_color.100'}}
                bg="matador_background.200"
              >
                <HStack spacing={{base: '10px', md: '14px'}}>
                  {/* <Image w={{base: '25px', md: 'auto'}} alt="next_image" src={debitCard.src} /> */}
                  <DebitCardSVG w={{base: '25px', md: 'auto'}} h={`auto`} />
                  <VStack align={'stretch'} spacing={0}>
                    <Text color="text" {...themeStyles.textStyles.sl5}>
                      {card?.bank}
                    </Text>
                    <Text color="text" {...themeStyles.textStyles.sl5}>
                      **** ****{card?.last4}
                    </Text>
                  </VStack>
                </HStack>

                <Center
                  w="16px"
                  h="16px"
                  borderRadius={'full'}
                  border="1px solid"
                  borderColor={'matador_border_color.100'}
                >
                  {selectedCard?.id === card.id && <CheckIcon color={'text'} fontSize={'10px'} />}
                </Center>
              </Flex>
            ))}
          </>
        ) : (
          <EmptyState
            icon={<Image w={{base: '25px', md: 'auto'}} alt="next_image" src={emptyCard.src} />}
            noHeader
            text={'No card has been added yet˙'}
            height="100px"
          />
        )}
      </VStack>

      <Button
        h="48px"
        onClick={handleSelectACArd}
        w="full"
        color="custom_color.contrast"
        mt="30px"
        bg="custom_color.color"
      >
        Proceed
      </Button>
      {/* <CustomizableButton
          mt="15px"
          bg="white"
          border="1px solid"
          w="full"
          onClick={() => setStep('customizeRecurring')}
          borderColor="matador_border_color.100"
          color="text"
        >
          Customise Recurring Deposit
        </CustomizableButton> */}
      <CustomizableButton
        mt="20px"
        h="48px"
        border="1px solid !important"
        borderColor="custom_color.color"
        leftIcon={<BiPlus size={20} />}
        onClick={handleAddNewCard}
        w="full"
        bg="custom_color.background"
        color="custom_color.color"
      >
        {MAKE_DEPOSITS_MUTATION?.isLoading ? <Spinner /> : 'Add Card'}
      </CustomizableButton>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          autoFocus={false}
          onCloseComplete={onCloseModal}
          mx="auto"
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            maxW="560px"
            minH="302px"
            px={{base: '20px', md: '50px'}}
            py="25px"
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          autoFocus={false}
          onCloseComplete={onCloseModal}
          mx="auto"
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            maxW="560px"
            minH="302px"
            px={{base: '20px', md: '35px'}}
            pt="25px"
            pb="35px"
            borderRadius={{base: '10px', md: '0px'}}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default PaymentMethod;
