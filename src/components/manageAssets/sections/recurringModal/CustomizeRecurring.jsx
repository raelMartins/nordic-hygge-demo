const Wrap = styled.div`
  .react-datepicker {
    border: 1px solid #eaecf0;
    background: #fff;
    border-radius: 0;
  }
  .react-datepicker__time-container {
    display: none;
  }
  .react-datepicker__month-container {
    max-width: 250.723px;
    width: 300px;
  }

  .react-datepicker__day-names {
    width: 214px;
    margin: 0 auto;
  }

  .react-datepicker__day-name {
    // width: calc(100% / 8);
    font-size: 7px;
    width: 25px;
    height: 25px;
    font-weight: 500;
  }
  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    width: 210px;
    margin: 0 auto;
  }
  .react-datepicker__day {
    width: calc(100% / 8);
    font-size: 9.26px;
    font-weight: 600;
    padding: 0px;

    width: 25px;
    height: 25px;
    transition: 0.3s ease-in-out;
    :hover {
      width: 25px;
      height: 25px;
      //   border-radius: 100%;
    }
  }
  .react-datepicker__day--selected {
    width: 25px;
    height: 25px;
    // border-radius: 100%;
    background: #000000;
  }

  .react-datepicker__navigation--next--with-time:not(
      .react-datepicker__navigation--next--with-today-button
    ) {
    right: 2px;
    top: 14.98px;
  }

  .react-datepicker__navigation-icon--previous::before,
  .react-datepicker__navigation-icon--next::before {
    border-color: #000000;
  }
  .react-datepicker__navigation--previous {
    left: 2px;
    top: 14.98px;
  }
  .react-datepicker__current-month {
    position: relative;
    // height: 81px;
    height: 46.9px;
    border-radius: 7px;
    // margin: 0 auto;
    background: #4545fe;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    color: #000000;
    font-size: 11.581px;
    font-weight: 700;
    letter-spacing: 1px;
    width: 100%;
  }
  .react-datepicker__header {
    background: #ffffff;
    border: none;
    padding-top: 0;
  }
`;

import {
  Text,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Flex,
  Box,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useMediaQuery,
} from '@chakra-ui/react';
import {Button, CustomizableButton, FormInput} from '../../../../ui-lib';
import {useState} from 'react';
import {ArrowBackIcon, CloseIcon} from '@chakra-ui/icons';
import {CustomSingleDatePicker} from '../../../../components/common/Calendar/forDateAndTime';
import DatePicker from 'react-datepicker';
import styled from '@emotion/styled';
import {formatToCurrency} from '../../../../utils';
import {BsArrowLeft} from 'react-icons/bs';

const CustomizeRecurring = ({
  recurringModal,
  setAutoDebitFrequency,
  autoDebitFrequency,
  setStep,
  setAmountToPay,
  amountToPay,
  startDate,
  setStartDate,
  onCloseModal,
}) => {
  const [amountError, setAmountError] = useState('');
  const [modalStep, setModalStep] = useState(1);
  const presentDay = new Date();
  const [isMobile] = useMediaQuery('(max-width: 700px)');

  const selectDateObj = {
    DAILY: {
      header: 'Set Recurring Deposit Start Date',
      subHeader: 'Fund will be deducted from your desired fund source as from this date',
    },
    WEEKLY: {
      header: 'Set Weekly Deposit Date',
      subHeader:
        'Funds will be deducted from your chosen funding source on a weekly basis, specifically on this day every week',
      options: [
        'Every Monday',
        'Every Tuesday',
        'Every Wednesday',
        'Every Thursday',
        'Every Friday',
        'Every Saturday',
        'Every Sunday',
      ],
    },
    MONTHLY: {
      header: 'Set Monthly Deposit Date',
      subHeader: 'Fund will be deducted from your desired fund source on this day every month.',
      options: [
        '1st',
        '2nd',
        '3rd',
        '4th',
        '5th',
        '6th',
        '7th',
        '8th',
        '9th',
        '10th',
        '11th',
        '12th',
        '13th',
        '14th',
        '15th',
        '16th',
        '17th',
        '18th',
        '19th',
        '20th',
        '21st',
        '22nd',
        '23rd',
        '24th',
        '25th',
        '26th',
        '27th',
        '28th',
        '29th',
        '30th',
        '31st',
      ],
    },
  };

  const handleProceed = () => {
    if (modalStep === 2) setModalStep(1);
    else {
      if (!Number(amountToPay)) return setAmountError('Please enter a valid amount');

      setStep('type');
    }
  };

  const handleSelectFrequency = e => {
    setAutoDebitFrequency(e.target.value);
    setModalStep(2);
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
    setAmountError('');
    setAmountToPay(val);
  };

  const filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const mainContent = (
    <>
      {modalStep === 1 ? (
        <>
          <Flex justify={'space-between'} align={'center'} mb="20px">
            <Text
              className="heading-text-regular"
              color="text"
              fontSize={{base: '23px', md: '28px'}}
            >
              Customise recurring deposit
            </Text>
            <CloseIcon
              color="text"
              fontWeight={600}
              fontSize={'13px'}
              cursor={'pointer'}
              onClick={recurringModal?.onClose}
            />
          </Flex>

          <Text
            color="text"
            fontSize={{base: '16px', md: '16px'}}
            mb={{base: '4px', md: '7px'}}
            mt={{base: '18px', md: '25px'}}
          >
            What amount would you like to set as your recurring deposit ?
          </Text>
          <FormInput
            autoFocus={false}
            onChange={handleInput}
            value={amountToPay ? formatToCurrency(amountToPay) : formatToCurrency(0)}
            error={amountError}
          />
          <Text
            color="text"
            fontWeight={400}
            fontSize={{base: '16px', md: '16px'}}
            mb={{base: '4px', md: '7px'}}
            mt={{base: '32px', md: '25px'}}
          >
            Select recurring deposit frequency
          </Text>
          <Select
            borderRadius={'0'}
            borderColor={'matador_border_color.100'}
            color="text"
            border={'1px solid !important'}
            placeholder={
              startDate && autoDebitFrequency
                ? `${autoDebitFrequency} - starting from ${new Date(startDate).toDateString()}`
                : 'Please select a frequency and starting date'
            }
            onChange={handleSelectFrequency}
          >
            <option onClick={handleSelectFrequency} value={'DAILY'}>
              Daily
            </option>
            <option onClick={handleSelectFrequency} value={'WEEKLY'}>
              Weekly
            </option>
            <option onClick={handleSelectFrequency} value={'MONTHLY'}>
              Monthly
            </option>
          </Select>
        </>
      ) : (
        <>
          <Flex direction="row" justify="space-between" align={'center'} mb="10px">
            <Text
              color="text"
              fontSize={{base: '18px', md: '25px'}}
              fontWeight={{base: 500, md: 600}}
            >
              {selectDateObj[autoDebitFrequency]?.header}
            </Text>
            <CloseIcon
              fontWeight={600}
              alignSelf={'flex-start'}
              fontSize={'13px'}
              style={{color: '#667085', cursor: 'pointer'}}
              onClick={recurringModal?.onClose}
            />
          </Flex>
          <Text color="text" mb={{base: '15px', md: '20px'}} fontSize={{base: '11px', md: '16px'}}>
            {selectDateObj[autoDebitFrequency]?.subHeader}
          </Text>
          <Box mx="auto">
            <Wrap>
              <DatePicker
                inline
                showTimeSelect
                minDate={presentDay}
                selected={new Date(startDate)}
                portalId="root-portal"
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={date => setStartDate(date)}
              />
            </Wrap>
          </Box>
        </>
      )}
      <CustomizableButton
        h="48px"
        mt="25px"
        color="custom_color.contrast"
        bg="custom_color.color"
        w="full"
        onClick={handleProceed}
      >
        Proceed
      </CustomizableButton>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          onCloseComplete={onCloseModal}
          minH="fit-content"
          minW={{base: '90%', lg: '276px'}}
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          placement="bottom"
        >
          <DrawerOverlay />
          <DrawerContent
            bg="card_bg"
            maxW="552px"
            minH="322px"
            py={{base: '27px', md: '40px'}}
            px={{base: '25px', md: '45px'}}
          >
            {mainContent}
          </DrawerContent>
        </Drawer>
      ) : (
        <Modal
          onCloseComplete={onCloseModal}
          minH="fit-content"
          minW={{base: '90%', lg: '276px'}}
          isOpen={recurringModal?.isOpen}
          onClose={recurringModal?.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent
            bg="card_bg"
            borderRadius={'0px'}
            maxW="552px"
            minH="322px"
            py={{base: '27px', md: '40px'}}
            px={{base: '25px', md: '45px'}}
          >
            {mainContent}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
export default CustomizeRecurring;
