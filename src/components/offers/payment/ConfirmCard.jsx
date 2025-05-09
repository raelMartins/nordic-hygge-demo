import {DrawerBody, Flex, Text, Center, Image} from '@chakra-ui/react';
import processingLoader from '../../../images/processing-transaction.gif';
import successfulLoader from '../../../images/successful-transaction.gif';
import {formatToCurrency} from '../../../utils';
import {Button, CustomizableButton} from '../../../ui-lib';
import ExistingCard from '../../payment/ExistingCard';

const ConfirmCard = ({
  selectedCard,
  setSelectedCard,
  loading,
  success,
  proceed,
  amountToPay,
  setPaymentStep,
}) => {
  return (
    <DrawerBody>
      {success ? (
        <Center
          mt="20px"
          w="full"
          h="full"
          maxH={'450px'}
          flexDirection={'column'}
          textAlign={'center'}
        >
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Transaction Successful
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Your payment has been successfully processed
          </Text>
        </Center>
      ) : loading ? (
        <Center
          mt="20px"
          w="full"
          h="full"
          maxH={'450px'}
          flexDirection={'column'}
          textAlign={'center'}
        >
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Processing payment
          </Text>
          <Text color="text" fontSize={'16px'} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Flex
          w="full"
          h="fit-content"
          direction="column"
          justify={'center'}
          align={'center'}
          gap="20px"
        >
          <Flex
            my="12px"
            h="130px"
            w="full"
            color="text"
            border="1px solid"
            borderColor={'matador_border_color.100 !important'}
            bg="matador_background.100"
            align={'center'}
            justify={'center'}
            direction="column"
          >
            <Text color="text" fontSize={{base: '14px', md: '16px'}} fontWeight={400}>
              You will Pay
            </Text>
            <Text
              color="text"
              fontSize={{base: '28px', md: '33px'}}
              fontWeight={500}
              className="heading-text-regular"
            >
              {formatToCurrency(amountToPay)}
            </Text>
          </Flex>

          <ExistingCard
            proceed={proceed}
            amountToPay={amountToPay}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />

          <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
            <CustomizableButton
              border="1px solid"
              borderColor="matador_border_color.100 !important"
              color="text"
              bg="matador_background.100"
              h="49px"
              w={{base: '50%', md: '250px'}}
              onClick={() => setPaymentStep('index')}
            >
              Cancel
            </CustomizableButton>
            <Button
              disabled={!selectedCard}
              isDisabled={!selectedCard}
              onClick={proceed}
              color="custom_color.contrast"
              bg="custom_color.color"
              w={{base: '50%', md: '250px'}}
              h="49px"
            >
              Proceed
            </Button>
          </Flex>
        </Flex>
      )}
    </DrawerBody>
  );
};

export default ConfirmCard;
