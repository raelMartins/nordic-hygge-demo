import React from 'react';
import {Flex, Text, Center, Image} from '@chakra-ui/react';
import {Button, CustomizableButton} from '@/ui-lib';
import processingLoader from '@/images/processing-transaction.gif';
import successfulLoader from '@/images/successful-transaction.gif';

const ConfirmWallet = ({loading, success, proceed, setPaymentStep}) => {
  return (
    <>
      {success ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="loader" w="150px" h="150px" src={successfulLoader.src} />
          <Text
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Transaction Successful
          </Text>
          <Text opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Your payment has been successfully processed
          </Text>
        </Center>
      ) : loading ? (
        <Center mt="20px" w="full" h="full" flexDirection={'column'} textAlign={'center'}>
          <Image alt="loader" w="150px" h="150px" src={processingLoader.src} />
          <Text
            textAlign={'center'}
            fontWeight={{base: 600, md: 400}}
            className="heading-text-regular"
            fontSize={'28px'}
            my={{base: '12px', md: '25px'}}
          >
            Processing payment
          </Text>
          <Text opacity={0.8} fontSize={{base: '14px', md: '16px'}} fontWeight="400">
            Wait a moment
          </Text>
        </Center>
      ) : (
        <Flex w="full" h="full" direction="column" justify={'center'} align={'center'} gap="20px">
          <Text
            fontWeight={400}
            fontSize={{base: '18px', md: '28px'}}
            lineHeight={{base: '24px', md: '36px'}}
            className="heading-text-regular"
          >
            Continue with your wallet
          </Text>
          <Text
            textAlign={'center'}
            fontWeight={400}
            fontSize={{base: '13px', md: '16px'}}
            lineHeight={{base: '18px', md: '25px'}}
            opacity={0.8}
          >
            In order to finish the payment process, you will be charged through your wallet.
          </Text>
          <Flex mt="27px" gap="26px" justify="space-between" align="center" w="full">
            <CustomizableButton
              border="1px solid black"
              color="black"
              bg="white"
              h="49px"
              w={{base: '50%', md: '250px'}}
              onClick={() => setPaymentStep('index')}
            >
              Cancel
            </CustomizableButton>
            <Button
              onClick={proceed}
              w={{base: '50%', md: '250px'}}
              color="custom_color.contrast"
              bg="custom_color.color"
              h="49px"
            >
              Proceed
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ConfirmWallet;
