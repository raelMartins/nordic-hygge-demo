import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {fetchAllBundlePaymentPlan} from '@/api/listing';
import Summary from './buyModalComponents/summary';
import Plan from './buyModalComponents/plan';
import Terms from './buyModalComponents/terms';
import Type from './buyModalComponents/type';
import InviteForm from './buyModalComponents/inviteForm';
import Invitees from './buyModalComponents/invitees';
import InviteMore from './buyModalComponents/inviteMore';
import InviteSummary from './buyModalComponents/inviteSummary';
import Breakdown from './buyModalComponents/breakdown';
import {CloseIcon} from '@chakra-ui/icons';
import {Box, Center, Flex, Text} from '@chakra-ui/react';
import {PaymentFlow} from '../payment';
import PaymentModal from '@/components/payment';

const BuyModal = ({buyModal, unitData, change_screen}) => {
  const [step, setStep] = useState('type');
  const [amountToPay, setAmountToPay] = useState(0);
  const [fullPayment, setFullPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [coOwnerDetails, setCoOwnerDetails] = useState(null);
  const [listCoOwner, setListCoOwner] = useState([]);
  const [returnedData, setReturnedData] = useState(null);

  const {data, isLoading} = useQuery(['payment_plan', unitData?.id], () =>
    fetchAllBundlePaymentPlan(unitData?.id)
  );
  const PAYMENT_PLAN_DATA = data && data?.data?.results;

  useEffect(() => {
    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
      setStep('summary');
      setSelectedPlan(null);
    }
  }, [PAYMENT_PLAN_DATA]);

  const onCloseModal = () => {
    setSelectedPlan(null);
    buyModal?.onClose();
    setStep('type');
    setFullPayment(false);

    if (PAYMENT_PLAN_DATA && !PAYMENT_PLAN_DATA[0]?.id) {
      setFullPayment(true);
    }
  };

  const paymentDetails = {
    paymentplan_id: selectedPlan?.id,
    bundle_id: selectedPlan?.bundle?.id || unitData?.id,
    type: 'WHOLE',
  };

  const purchase_screen = {
    type: (
      <Type
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        planLoading={isLoading}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        change_screen={change_screen}
      />
    ),
    terms: (
      <Terms
        fullPayment={fullPayment}
        unitData={unitData}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
      />
    ),
    plan: (
      <Plan
        planLoading={isLoading}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
        change_screen={change_screen}
      />
    ),
    summary: (
      <Summary
        unitData={unitData}
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        amountToPay={amountToPay}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
        change_screen={change_screen}
      />
    ),
    breakdown: (
      <Breakdown
        unitData={unitData}
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        step={step}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
      />
    ),
    inviteSummary: (
      <InviteSummary
        unitData={unitData}
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
        coOwnerDetails={coOwnerDetails}
        amountToPay={amountToPay}
        paymentDetails={paymentDetails}
        setReturnedData={setReturnedData}
      />
    ),
    inviteForm: (
      <InviteForm
        setListCoOwner={setListCoOwner}
        unitData={unitData}
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
        coOwnerDetails={coOwnerDetails}
        setCoOwnerDetails={setCoOwnerDetails}
      />
    ),
    invitees: (
      <Invitees
        setListCoOwner={setListCoOwner}
        unitData={unitData}
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
        listCoOwner={listCoOwner}
      />
    ),
    inviteMore: (
      <InviteMore
        listCoOwner={listCoOwner}
        setListCoOwner={setListCoOwner}
        unitData={unitData}
        setAmountToPay={setAmountToPay}
        PAYMENT_PLAN_DATA={PAYMENT_PLAN_DATA}
        fullPayment={fullPayment}
        setFullPayment={setFullPayment}
        setSelectedPlan={setSelectedPlan}
        setStep={setStep}
        selectedPlan={selectedPlan}
        buyModal={buyModal}
        onCloseModal={onCloseModal}
        coOwnerDetails={coOwnerDetails}
        setCoOwnerDetails={setCoOwnerDetails}
        returnedData={returnedData}
      />
    ),
    payment: (
      <PaymentFlow
        fullPayment={fullPayment}
        paymentType={'asset'}
        selectedPlan={selectedPlan}
        amountToPay={amountToPay}
        modal={buyModal}
        paymentDetails={paymentDetails}
        setStep={setStep}
        onCloseModal={onCloseModal}
        change_screen={change_screen}
        go_back={() => setStep('type')}
        close={() => change_screen('options')}
        unitData={unitData}
      />
    ),
  }[step];

  return (
    <Box w={{base: `100%`}} position={`relative`}>
      <Center position={`absolute`} top={`0px`} right={`0px`} py={`10px`} zIndex={`1`}>
        <CloseIcon cursor="pointer" fontSize="14px" onClick={() => change_screen('options')} />
      </Center>
      {purchase_screen || (
        <PaymentFlow
          fullPayment={fullPayment}
          paymentType={'asset'}
          selectedPlan={selectedPlan}
          amountToPay={amountToPay}
          modal={buyModal}
          paymentDetails={paymentDetails}
          setStep={setStep}
          onCloseModal={onCloseModal}
          unitData={unitData}
        />
      )}
    </Box>
  );
};

export default BuyModal;
