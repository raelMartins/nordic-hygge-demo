import {Flex, HStack, Text, useDisclosure, useTheme} from '@chakra-ui/react';
import {Button} from '@/ui-lib';
import {cloneElement, isValidElement, useState} from 'react';
import useWatchlist from '@/ui-lib/ui-lib.hooks/useWatchlist';
import {CustomToast} from '@/ui-lib/ui-lib.components/Toast';
import {useCustomToast} from '@/components/CustomToast';
import {PaymentAccess} from '@/components/payment/PaymentAccess';

export const BuyPropertySVG = ({boxSize, ...rest}) => {
  const theme = useTheme();
  const color = theme?.colors?.custom_color?.contrast;
  return (
    <svg
      width={boxSize || '25'}
      height={boxSize || '24'}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{boxSize}}
      {...rest}
    >
      <g id="vuesax/bold/house-2">
        <g id="house-2">
          <path
            id="Vector"
            d="M10.5 15.5C10.09 15.5 9.75 15.84 9.75 16.25V17.75C9.75 18.16 10.09 18.5 10.5 18.5C10.91 18.5 11.25 18.16 11.25 17.75V16.25C11.25 15.84 10.91 15.5 10.5 15.5Z"
            fill={color}
          />
          <path
            id="Vector_2"
            d="M22.5 21.25H21.5V9.97997C21.5 9.35997 21.22 8.77997 20.73 8.39997L13.73 2.95997C13.01 2.38997 11.99 2.38997 11.27 2.95997L4.27 8.39997C3.78 8.77997 3.5 9.35997 3.5 9.96997L3.45 21.25H2.5C2.09 21.25 1.75 21.58 1.75 22C1.75 22.41 2.09 22.75 2.5 22.75H22.5C22.91 22.75 23.25 22.41 23.25 22C23.25 21.58 22.91 21.25 22.5 21.25ZM11 6.74997H14C14.41 6.74997 14.75 7.08997 14.75 7.49997C14.75 7.90997 14.41 8.24997 14 8.24997H11C10.59 8.24997 10.25 7.90997 10.25 7.49997C10.25 7.08997 10.59 6.74997 11 6.74997ZM17.5 21.25H7.5V12.5C7.5 11.67 8.17 11 9 11H16C16.83 11 17.5 11.67 17.5 12.5V21.25Z"
            fill={color}
          />
        </g>
      </g>
    </svg>
  );
};
export const ContactSVG = ({boxSize, ...rest}) => {
  const theme = useTheme();
  const color = theme?.colors?.custom_color?.contrast;
  return (
    <svg
      width={boxSize || '21'}
      height={boxSize || '21'}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{boxSize}}
      {...rest}
    >
      <g id="shopping-cart">
        <path
          id="Vector"
          d="M15.6596 15.4363H6.78463C5.95963 15.4363 5.16796 15.0863 4.60963 14.478C4.0513 13.8696 3.76797 13.0529 3.83464 12.2279L4.5263 3.92795C4.5513 3.66961 4.45963 3.41962 4.28463 3.22795C4.10963 3.03628 3.86797 2.93628 3.60963 2.93628H2.16797C1.8263 2.93628 1.54297 2.65295 1.54297 2.31128C1.54297 1.96961 1.8263 1.68628 2.16797 1.68628H3.61797C4.22631 1.68628 4.8013 1.94461 5.20963 2.38628C5.43463 2.63628 5.6013 2.92795 5.69297 3.25295H16.1013C16.943 3.25295 17.718 3.58628 18.2846 4.18628C18.843 4.79461 19.1263 5.58628 19.0596 6.42795L18.6096 12.6779C18.518 14.2029 17.1846 15.4363 15.6596 15.4363ZM5.73463 4.49461L5.08464 12.3279C5.04297 12.8113 5.2013 13.2696 5.5263 13.6279C5.8513 13.9863 6.3013 14.1779 6.78463 14.1779H15.6596C16.5263 14.1779 17.3096 13.4446 17.3763 12.578L17.8263 6.32795C17.8596 5.83629 17.7013 5.36962 17.3763 5.02795C17.0513 4.67795 16.6013 4.48627 16.1096 4.48627H5.73463V4.49461Z"
          fill={color}
        />
        <path
          id="Vector_2"
          d="M14.0417 19.6029C13.125 19.6029 12.375 18.8529 12.375 17.9362C12.375 17.0195 13.125 16.2695 14.0417 16.2695C14.9583 16.2695 15.7083 17.0195 15.7083 17.9362C15.7083 18.8529 14.9583 19.6029 14.0417 19.6029ZM14.0417 17.5195C13.8083 17.5195 13.625 17.7029 13.625 17.9362C13.625 18.1695 13.8083 18.3529 14.0417 18.3529C14.275 18.3529 14.4583 18.1695 14.4583 17.9362C14.4583 17.7029 14.275 17.5195 14.0417 17.5195Z"
          fill={color}
        />
        <path
          id="Vector_3"
          d="M7.3737 19.6029C6.45703 19.6029 5.70703 18.8529 5.70703 17.9362C5.70703 17.0195 6.45703 16.2695 7.3737 16.2695C8.29036 16.2695 9.04036 17.0195 9.04036 17.9362C9.04036 18.8529 8.29036 19.6029 7.3737 19.6029ZM7.3737 17.5195C7.14036 17.5195 6.95703 17.7029 6.95703 17.9362C6.95703 18.1695 7.14036 18.3529 7.3737 18.3529C7.60703 18.3529 7.79036 18.1695 7.79036 17.9362C7.79036 17.7029 7.60703 17.5195 7.3737 17.5195Z"
          fill={color}
        />
        <path
          id="Vector_4"
          d="M18 7.93628H8C7.65833 7.93628 7.375 7.65295 7.375 7.31128C7.375 6.96961 7.65833 6.68628 8 6.68628H18C18.3417 6.68628 18.625 6.96961 18.625 7.31128C18.625 7.65295 18.3417 7.93628 18 7.93628Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

const BuyProperties = ({
  unitData,
  info,
  children,
  InnerComponent,
  display_price = true,
  ...rest
}) => {
  const buyModal = useDisclosure();
  const contactModal = useDisclosure();
  const toast = useCustomToast();

  const [btnText, setBtnText] = useState('Proceed to Payment');
  const {addToWatchlist, isWatchlisted} = useWatchlist({info});

  const handleProceedToPayment = () => {
    if (btnText === 'Notify when available') {
      if (!isWatchlisted) return addToWatchlist();
      else
        toast({
          render: () => <CustomToast description={`${info?.name} already in watchlist`} />,
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
    }

    if (info?.is_sold_out) {
      setBtnText('Notify when available');
    } else {
      buyModal.onOpen();
    }
  };

  return (
    <>
      {children ? (
        <Flex flex={`1`} w={`100%`} onClick={handleProceedToPayment}>
          {children}
        </Flex>
      ) : InnerComponent ? (
        isValidElement(InnerComponent) ? (
          cloneElement(InnerComponent, {
            onClick: handleProceedToPayment,
          })
        ) : null
      ) : info?.display_price || display_price ? (
        <PaymentAccess
          content={
            <Button
              h="56px"
              bg="custom_color.color"
              color="custom_color.contrast"
              onClick={handleProceedToPayment}
              width={{base: 'full', lg: '255px'}}
              leftIcon={<BuyPropertySVG />}
              fontSize={'16px'}
              fontWeight={'500'}
              _hover={{opacity: `1`}}
              _focus={{opacity: `1`}}
              _active={{opacity: `1`}}
              {...rest}
            >
              <HStack>
                <Text>{btnText}</Text>
              </HStack>
            </Button>
          }
        />
      ) : (
        <Button
          onClick={contactModal.onOpen}
          h="56px"
          bg="custom_color.color"
          color="custom_color.contrast"
          width={{base: 'full', lg: '255px'}}
          leftIcon={<ContactSVG />}
          fontSize={'16px'}
          fontWeight={'500'}
          {...rest}
        >
          <HStack>
            <Text fontSize="16px" fontWeight="500">
              Contact For Price
            </Text>
          </HStack>
        </Button>
      )}
    </>
  );
};

export default BuyProperties;
