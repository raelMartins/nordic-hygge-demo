import React, {useState} from 'react';
import PaymentModal from './paymentMethod';
import creditCard from '../../../../images/icons/debit-card.svg';
import wallet from '../../../../images/icons/wallet-card.svg';
import SelectCard from './SelectCard';
import CustomizeRecurring from './CustomizeRecurring';
import {Text} from '@chakra-ui/react';
import {DebitCardSVG, WalletCardSVG} from '../../../../components/assets/svgs';

const RecurringModal = ({equity, recurringModal, refetch}) => {
  const autoDebitFrequencyFromAsset =
    equity?.payment_plan?.payment_frequency?.toString()?.toUpperCase() || null;
  const [step, setStep] = useState('type');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [amountToPay, setAmountToPay] = useState(equity?.payment_plan?.periodic_payment);
  const [autoDebitFrequency, setAutoDebitFrequency] = useState(autoDebitFrequencyFromAsset);
  const [startDate, setStartDate] = useState(equity?.next_due_date);

  const methods = [
    {
      id: '1',
      title: 'Debit/Credit Card',
      recommended: true,
      source: 'card',
      desc: (
        <Text color="#606060" fontWeight={500} fontSize={{base: '13px', md: '14px'}}>
          Your card will be charged on your due date and the next billing cycle is
          <Text as="span" fontWeight={700} fontSize={{base: '13px', md: '14px'}} font>
            {' '}
            {new Date(startDate).toDateString()}
          </Text>
        </Text>
      ),
      icon: <DebitCardSVG w={{base: '30px', md: 'auto'}} h={{base: '30px', md: 'auto'}} mt="5px" />,
      img: creditCard.src,
    },
    {
      id: '2',
      title: 'Wallet',
      source: 'store_wallet',
      desc: (
        <Text color="#606060" fontWeight={500} fontSize={{base: '13px', md: '14px'}}>
          Your wallet will be charged on your due date and the next billing cycle is
          <Text as="span" fontWeight={700} fontSize={{base: '13px', md: '14px'}} font>
            {' '}
            {new Date(startDate).toDateString()}
          </Text>
        </Text>
      ),
      icon: (
        <WalletCardSVG w={{base: '30px', md: 'auto'}} h={{base: '30px', md: 'auto'}} mt="5px" />
      ),
      img: wallet.src,
    },
  ];

  const onCloseModal = () => {
    setStep('type');
    setSelectedMethod(null);
    setSelectedCard(null);
    setAmountToPay(equity?.payment_plan?.periodic_payment);
    setAutoDebitFrequency(equity?.payment_plan?.payment_frequency || null);
    setStartDate(equity?.next_due_date);
  };

  return (
    <>
      {step === 'selectCard' ? (
        <SelectCard
          equity={equity}
          setSelectedMethod={setSelectedMethod}
          selectedMethod={selectedMethod}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          methods={methods}
          recurringModal={recurringModal}
          setStep={setStep}
          startDate={startDate}
          amountToPay={amountToPay}
          autoDebitFrequency={autoDebitFrequency}
          onCloseModal={onCloseModal}
        />
      ) : step === 'customizeRecurring' ? (
        <CustomizeRecurring
          startDate={startDate}
          setStartDate={setStartDate}
          setAmountToPay={setAmountToPay}
          amountToPay={amountToPay}
          setAutoDebitFrequency={setAutoDebitFrequency}
          autoDebitFrequency={autoDebitFrequency}
          equity={equity}
          setSelectedMethod={setSelectedMethod}
          selectedMethod={selectedMethod}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          methods={methods}
          recurringModal={recurringModal}
          setStep={setStep}
          onCloseModal={onCloseModal}
        />
      ) : (
        <PaymentModal
          selectedCard={selectedCard}
          refetch={refetch}
          startDate={startDate}
          amountToPay={amountToPay}
          equity={equity}
          setSelectedMethod={setSelectedMethod}
          selectedMethod={selectedMethod}
          autoDebitFrequency={autoDebitFrequency}
          setSelectedCard={setSelectedCard}
          methods={methods}
          recurringModal={recurringModal}
          setStep={setStep}
          setAutoDebitFrequency={setAutoDebitFrequency}
          setStartDate={setStartDate}
          setAmountToPay={setAmountToPay}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default RecurringModal;
