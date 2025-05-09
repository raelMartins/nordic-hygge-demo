import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {fetchAllUnits, fetchFractionalInfo} from '@/api/listing';
import Price from './fractionalModalComponents/price';
import Disclosure, {DisclosureContent} from './fractionalModalComponents/disclosure';
import PriceContent from './fractionalModalComponents/PriceContent';
import {PaymentFlow} from '../../payment';
import {Show} from '@chakra-ui/react';
import {PriceContentMobile} from './fractionalModalComponents/PriceContentMobile';

const FractionalModal = ({fractionalModal, setFixedwidth, change_screen, info}) => {
  const [step, setStep] = useState('disclosure');
  const [amountToPay, setAmountToPay] = useState(0);
  const [fractions, setFractions] = useState('');

  const {data: allUnits} = useQuery(
    ['fetchAllUnits', info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    {enabled: !!info?.id}
  );

  const unitsData = allUnits?.data?.results;
  const unitThatWasFractionalized = unitsData?.find(item => item?.is_fraction_sale_available);

  const {data: fractionalDetail, isLoading: isFractionalDetailLoading} = useQuery(
    ['fractional', unitThatWasFractionalized?.id],
    () => fetchFractionalInfo(unitThatWasFractionalized?.id),
    {enabled: !!unitThatWasFractionalized?.id}
  );
  const fractionalData = fractionalDetail?.data;
  const unitData = fractionalData?.fraction_data?.unit;

  const onCloseModal = () => {
    fractionalModal?.onClose();
    setFractions('');
    setStep('disclosure');
  };

  const paymentDetails = {
    bundle_id: unitThatWasFractionalized?.id,
    amount_to_pay: Number(fractions * unitData?.price_per_fraction),
    no_of_fractions: Number(fractions),
  };

  useEffect(() => {
    if (step === 'price') {
      setFixedwidth(false);
    } else {
      setFixedwidth(true);
    }
  }, [step]);

  return (
    <>
      {step === 'disclosure' ? (
        // <Disclosure
        //   setStep={setStep}
        //   fractionalModal={fractionalModal}
        //   isFractionalDetailLoading={isFractionalDetailLoading}
        //   onCloseModal={onCloseModal}
        //   fractionalData={fractionalData}
        // />
        <DisclosureContent
          setStep={setStep}
          // fractionalModal={fractionalModal}
          isFractionalDetailLoading={isFractionalDetailLoading}
          // onCloseModal={onCloseModal}
          go_back={() => change_screen('options')}
          fractionalData={fractionalData}
        />
      ) : step === 'price' ? (
        // <Price
        //   setStep={setStep}
        //   setAmountToPay={setAmountToPay}
        //   fractionalModal={fractionalModal}
        //   fractionalData={fractionalData}
        //   onCloseModal={onCloseModal}
        //   fractions={fractions}
        //   setFractions={setFractions}
        //   info={info}
        // />

        <>
          <Show above="lg">
            <PriceContent
              unitData={unitData}
              fractionalData={fractionalData}
              // fractionalModal={fractionalModal}
              fractions={fractions}
              setFractions={setFractions}
              setStep={setStep}
              progress_bar={info?.fractions_progress_bar}
              go_back={() => setStep('disclosure')}
              close={() => change_screen('options')}
              info={info}
            />
          </Show>
          <Show below="lg">
            <PriceContentMobile
              unitData={unitData}
              fractionalData={fractionalData}
              // fractionalModal={fractionalModal}
              fractions={fractions}
              setFractions={setFractions}
              setStep={setStep}
              progress_bar={info?.fractions_progress_bar}
              go_back={() => setStep('disclosure')}
              close={() => change_screen('options')}
              info={info}
            />
          </Show>
        </>
      ) : (
        <PaymentFlow
          isFractional
          paymentType={'asset'}
          amountToPay={Number(fractions * unitData?.price_per_fraction)}
          modal={fractionalModal}
          paymentDetails={paymentDetails}
          setStep={setStep}
          onCloseModal={onCloseModal}
          setFractions={setFractions}
          go_back={() => setStep('price')}
          close={() => change_screen('options')}
          unitData={unitData}
        />
      )}
    </>
  );
};

export default FractionalModal;
