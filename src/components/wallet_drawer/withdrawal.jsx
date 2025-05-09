import {useState} from 'react';
import {
  Flex,
  HStack,
  Text,
  Box,
  Select,
  useToast,
  FormControl,
  Spinner,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import {themeStyles} from '../../theme';
import {Button, FormInput} from '../../ui-lib/ui-lib.components';
import {useFormik} from 'formik';
import {storeName, store_name} from '../../constants/routes';
import {useMutation, useQuery} from 'react-query';
import {fetchSupportedBanks, walletWithdrawal} from '../../api/Wallet';
import * as Yup from 'yup';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {formatToCurrency} from '../../utils';
import {scrollBarStyles} from '../common/ScrollBarStyles';
import {useCustomToast} from '../CustomToast';

const formSchema = Yup.object().shape({
  account_number: Yup.string()
    .matches(/^\d+$/, 'Account number must contain only digits')
    .length(10, 'Account number should be exactly 10 digits')
    .required('Please enter your account number'),
  amount: Yup.string().required('Please enter an amount'),
  bank_code: Yup.string().required('Please select a bank'),
});

export const WithdrawalWallet = ({setPage, onWalClose}) => {
  const toast = useCustomToast();
  const [bankName, setBank] = useState('');
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const LIST_ALL_BANKS = useQuery(['fetchSupportedBanks'], fetchSupportedBanks);

  const SUPPORTED_OFFICIAL_BANKS = LIST_ALL_BANKS?.data?.data?.message?.length
    ? LIST_ALL_BANKS?.data?.data?.message
    : [];

  const mutation = useMutation(formData => walletWithdrawal(formData), {
    onSuccess: res => {
      onWalClose();
      toast({
        description: `Withdrawal successful`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError: err => {
      toast({
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
  const storeName = store_name();

  const formik = useFormik({
    initialValues: {
      store_name: storeName,
      account_number: '',
      amount: '',
      description: '',
      bank_code: '',
    },
    validationSchema: formSchema,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: values => {
      let withdrawalPayload = {
        ...values,
        account_number: `${values.account_number}`,
        amount: Number(values.amount.replace(',', '')),
      };
      mutation.mutate(withdrawalPayload);
    },
  });

  const handleSelectBank = e => {
    const bank_ = SUPPORTED_OFFICIAL_BANKS?.find(bank => bank?.code === e.target.value);
    if (bank_) {
      setBank(bank_?.name);
      formik.setFieldValue('bank_code', bank_?.code);
    }
  };

  const handleInput = e => {
    const input = e.target;
    let val = input.value;

    const cleanedString = val.replace(/[^\d]/g, ''); // Remove non-numeric characters
    val = cleanedString.replace(/^0+(?=\d)/, '');

    const length = val.length;

    if (length <= 2) {
      val = '0.' + val.padStart(2, '0');
    } else {
      const integerPart = val.slice(0, length - 2);
      const decimalPart = val.slice(-2);
      val = integerPart + '.' + decimalPart;
    }
    formik.setFieldValue('amount', val);
    setAmount(val);
  };
  console.log(formik.errors);
  return (
    <Stack h="full" overflowY="auto" css={scrollBarStyles} gap={`0px`}>
      <Flex
        justify={'space-between'}
        display={{base: 'none', lg: 'flex'}}
        borderBottom="1px solid"
        borderColor={`matador_border_color.100 !important`}
        bg={`matador_background.100`}
        align={'center'}
        p={4}
      >
        <HStack spacing="12px">
          <ArrowBackIcon
            fontSize={'25px'}
            cursor="pointer"
            onClick={() => setPage('wallet')}
            color="text"
          />
          <Text fontSize={'23px'} fontWeight={500} color="text" className="heading-text-regular">
            Make a Withdrawal
          </Text>
        </HStack>
        <CloseIcon
          display={{base: 'none', md: 'flex'}}
          fontSize={'12px'}
          cursor="pointer"
          color="text"
          onClick={onWalClose}
        />
      </Flex>

      <form onSubmit={formik.handleSubmit} style={{display: 'flex', flexDirection: `column`}}>
        <Flex gap="0px" direction="column" align={'start'}>
          <Box
            align="center"
            justify="center"
            p={{base: `48px 56px`}}
            w="full"
            bg="matador_background.100"
            mt={`0px`}
          >
            <Stack w={`288px`} mx={`auto`} gap={`6px`}>
              <Text
                textAlign={'left'}
                w={`100%`}
                color="text"
                fontSize={`13px`}
                lineHeight={`150%`}
                letterSpacing={`.26px`}
                fontWeight="500"
              >
                Amount to deposit
              </Text>
              <FormInput
                color="text"
                bg="matador_background.200"
                textAlign="center"
                onChange={handleInput}
                value={amount ? formatToCurrency(amount) : formatToCurrency(``)}
                error={amountError}
                onBlur={formik.handleBlur('amount')}
                justify="center"
                w="100%"
                boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                fontSize={16}
                leftAddonStyle={{
                  top: '10px',
                  left: {base: '75px', sm: '120px', lg: '60px'},
                }}
                group={{
                  justifyContent: 'center',
                }}
                placeholder="0.00"
                _placeholder={{
                  fontSize: `16px`,
                  color: 'matador_form.label',
                }}
                borderRadius={`0px`}
              />
            </Stack>
          </Box>

          <FormControl p={{base: '15px', lg: '24px'}}>
            <Stack gap={`10px`}>
              <Text fontSsize={`16px`} fontWeight={`400`} lineHeight={`140%`}>
                Recipient Details
              </Text>
              <FormInput
                color="text"
                bg="matador_background.100"
                border={`1px solid`}
                borderColor={`matador_border_color.100`}
                error={formik.touched.account_number && formik.errors.account_number}
                onChange={formik.handleChange('account_number')}
                value={formik.values.account_number}
                onBlur={formik.handleBlur('account_number')}
                h="48px"
                placeholder="Enter Account Number"
                errorSize="11px"
                fontSize={`12px !important`}
                borderRadius={`0px`}
              />

              <Box>
                <Select
                  placeholder={bankName || 'Select bank name'}
                  color="text"
                  bg="matador_background.100"
                  border={`1px solid`}
                  borderColor={
                    formik.touched.bank_code && formik.errors.bank_code
                      ? themeStyles.color.matador__red
                      : `matador_border_color.100`
                  }
                  value={bankName}
                  onChange={handleSelectBank}
                  onBlur={formik.handleBlur('bank_code')}
                  h="48px"
                  fontSize={`12px`}
                  _placeholder={{
                    letterSpacing: '0.52px',
                    fontWeight: 500,
                  }}
                  borderRadius={`0px`}
                >
                  {SUPPORTED_OFFICIAL_BANKS?.length ? (
                    SUPPORTED_OFFICIAL_BANKS.map((bank, index) => (
                      <option style={{color: 'black'}} key={index} value={bank?.code}>
                        {bank?.name}
                      </option>
                    ))
                  ) : (
                    <option style={{color: 'black'}} value={''}>
                      Fetching supported banks...
                    </option>
                  )}
                </Select>
                <Text color={themeStyles.color.matador__red} my={'5px'} fontSize={'11px'}>
                  {formik.touched.bank_code && formik.errors.bank_code}
                </Text>
              </Box>

              <Textarea
                color="text"
                bg="matador_background.100"
                border={`1px solid`}
                borderColor={`matador_border_color.100`}
                type="text"
                onChange={formik.handleChange('description')}
                value={formik.values.description}
                h="95px"
                resize="none"
                placeholder="Description (optional)"
                fontSize={`12px`}
                borderRadius={`0px`}
              />

              <Button
                variation={`primary`}
                isDisabled={mutation?.isLoading || !formik.isValid}
                isLoading={mutation?.isLoading}
                type="submit"
                boxStyle={{base: `100%`, marginTop: `10px`}}
                p={{base: `9px`}}
              >
                Proceed
              </Button>
            </Stack>
          </FormControl>
        </Flex>
      </form>
    </Stack>
  );
};

export default WithdrawalWallet;
