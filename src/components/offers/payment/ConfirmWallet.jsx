import {DrawerBody, Flex, Text, Center, Image} from '@chakra-ui/react';
import {Button, CustomizableButton} from '../../../ui-lib';
import processingLoader from './../../../../images/processing-transaction.gif';
import successfulLoader from './../../../../images/successful-transaction.gif';

const ConfirmWallet = ({loading, success, proceed, setPaymentStep}) => {
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
            textAlign={'center'}
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Transaction Successful
          </Text>
          <Text textAlign={'center'} color="text" fontSize={'16px'} fontWeight="400">
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
            textAlign={'center'}
            color="text"
            fontWeight={500}
            fontSize={'28px'}
            my="25px"
            className="heading-text-regular"
          >
            Processing payment
          </Text>
          <Text textAlign={'center'} color="text" fontSize={'16px'} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Flex w="full" h="400px" direction="column" justify={'center'} align={'center'} gap="20px">
          <Text
            textAlign={'center'}
            color="text"
            fontWeight={500}
            fontSize="28px"
            lineHeight={'36px'}
            className="heading-text-regular"
          >
            Continue with your wallet
          </Text>
          <Text
            textAlign={'center'}
            color="text"
            fontWeight={400}
            fontSize="16px"
            lineHeight={'25px'}
          >
            In order to finish the payment process, you will be charged through Wallet.
          </Text>
          <Flex mt="27px" gap="26px" justify="space-between" align="center">
            <CustomizableButton
              border="1px solid black !important"
              color="black"
              bg="transparent"
              h="49px"
              w="150px"
              onClick={() => setPaymentStep('index')}
            >
              Cancel
            </CustomizableButton>
            <Button
              onClick={proceed}
              w="150px"
              color="custom_color.contrast"
              bg="custom_color.color"
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

export default ConfirmWallet;
