import React from 'react';
import {Box, Divider, HStack, Text, VStack} from '@chakra-ui/react';
import {Button} from '@/ui-lib';
import {formatToCurrency} from '@/utils';
import AssetCarouselMobile from '@/components/assetCarousel/mobile';

const FractionalDetails = ({fractionalData, setStep}) => {
  const unitData = fractionalData?.fraction_data?.unit;
  const slideImages =
    unitData?.photos?.map(image => ({
      original: image.photo,
      thumbnail: image.photo,
    })) || [];

  const fractionalPercent = (
    (Number(unitData?.total_purchased_fractions) / Number(unitData?.total_fractions)) *
    100
  ).toFixed(2);
  const leftFractions =
    Number(unitData?.total_fractions) - Number(unitData?.total_purchased_fractions);

  return (
    <Box w="full" display={{base: 'block', lg: 'none'}}>
      {/* <LayoutView noPadding h="full" noFooter> */}
      <Box h="full" px={{base: '16px', lg: '24px'}} pt="20px" w="full">
        <AssetCarouselMobile noBorderRadius slideImages={slideImages} />
        <Text
          mt="16px"
          className="heading-text-medium"
          fontSize={'28px'}
          lineHeight={'140%'}
          textTransform={'uppercase'}
          color="matador_text.100"
        >
          {unitData?.project?.name}
        </Text>

        <Text
          mt="16px"
          className="sub-text-regular"
          fontSize={'13px'}
          fontWeight={500}
          // lineHeight={'140%'}
          color="matador_form.label"
          textTransform={`uppercase`}
        >
          STARTING from {formatToCurrency(unitData?.price_per_fraction)}
        </Text>

        <Box
          mt="16px"
          w="full"
          bg="matador_background.200"
          border="0.2px solid"
          borderColor={`matador_border_color.100 !important`}
          borderRadius={'5px'}
          px="10px"
          pb="9px"
        >
          <Box
            mt="39px"
            bg={`custom_color.contrast`}
            w="full"
            h="10px"
            borderRadius={'full'}
            position={'relative'}
          >
            <Box
              position={'absolute'}
              h="20px"
              w="2px"
              bg="custom_color.color"
              left={`${fractionalPercent}%`}
              top="-5px"
            />
            <Text
              position={'absolute'}
              color="custom_color.color"
              left={`${fractionalPercent}%`}
              top="-30px"
            >
              {`${fractionalPercent}%`}
            </Text>
            <Box
              w={`${fractionalPercent}%`}
              h="full"
              bg="custom_color.color"
              borderRadius={'full'}
            />
          </Box>
          <HStack w="full" align="center" justify={'space-between'} mt="10px" px="4px">
            <Text fontSize={'11px'} fontWeight={400} color="text">
              {unitData?.total_purchased_fractions} fraction
              {unitData?.total_purchased_fractions != 1 && `s`} sold
            </Text>
            <Text fontSize={'11px'} fontWeight={400} color="text">
              {leftFractions} fraction{leftFractions != 1 && `s`} left
            </Text>
          </HStack>
        </Box>

        <VStack w="full" justify={'space-between'} mt="20px" gap="10px" divider={<Divider />}>
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="matador_form.label">
              Unit Type
            </Text>
            <Text fontSize={'16px'} fontWeight={500} color="text" textTransform="capitalize">
              {fractionalData?.fraction_data?.unit?.unit_title || '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="matador_form.label">
              Dividend Payout Type
            </Text>
            <Text fontSize={'16px'} fontWeight={500} color="text" textTransform="capitalize">
              {fractionalData?.extra_info?.dividend_payout || '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="matador_form.label">
              Dividend Payout Amount
            </Text>
            <Text fontSize={'16px'} fontWeight={500} color="text" textTransform="capitalize">
              {fractionalData?.extra_info?.dividend_amount
                ? formatToCurrency(fractionalData?.extra_info?.dividend_amount)
                : '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="matador_form.label">
              No of Stakeholders
            </Text>
            <Text fontSize={'16px'} fontWeight={500} color="text" textTransform="capitalize">
              {fractionalData?.partners?.length || '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="matador_form.label">
              Holding Period
            </Text>
            <Text fontSize={'16px'} fontWeight={500} color="text" textTransform="capitalize">
              {unitData?.holding_period || '-'}
            </Text>
          </HStack>
          <HStack justify="space-between" w="full">
            <Text fontSize={'13px'} fontWeight={500} color="matador_form.label">
              Investor&apos;s Packet
            </Text>
            <Text
              fontSize={'16px'}
              fontWeight={500}
              color="custom_color.color"
              cursor={'pointer'}
              onClick={() =>
                window.open(
                  `${
                    fractionalData?.packets?.[0]?.packet ? fractionalData?.packets?.[0]?.packet : ''
                  }`,
                  '_blank'
                )
              }
            >
              View
            </Text>
          </HStack>
        </VStack>

        <Button
          mt="24px"
          h="48px"
          w="full"
          color="custom_color.contrast"
          bg="custom_color.color"
          zIndex="100"
          mb="50px"
          // isDisabled={error || !Boolean(Number(fractions))}
          onClick={() => setStep('enterFraction')}
        >
          Proceed
        </Button>
      </Box>
      {/* </LayoutView> */}
    </Box>
  );
};

export default FractionalDetails;
