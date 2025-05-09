import {Image, VStack, Text, Flex, Box} from '@chakra-ui/react';
import EmptyState from '../appState/empty-state';
import {formatToCurrency} from '../../utils';
import {Spinner} from '../../ui-lib';
import {EquityCard} from '../cards/EquityCard';

const AssetsList = ({equitiesData, setEquityData, setType, customScrollbarStyles, isLoading}) => {
  const handleManageAssets = property => {
    setEquityData(property);
    setType('summary');
  };

  return (
    <Box h={'fit-content'} px={`4px`} overflowY="auto">
      {/* <Box h={'fit-content'} px={`4px`} overflowY="auto" __css={customScrollbarStyles}> */}
      {isLoading ? (
        <VStack w="80vw">
          <Spinner />
        </VStack>
      ) : (
        <>
          {equitiesData?.length > 0 ? (
            <VStack align="stretch" spacing={'12px'}>
              {(equitiesData || [])?.map((equity, idx) => (
                <EquityCard
                  key={idx}
                  equity={equity}
                  // sub_text={`${formatToCurrency(equity?.total_unit_price)}`}
                  sub_text={equity?.unit?.unit_title}
                  handleClick={() => handleManageAssets(equity)}
                />
                // <Flex
                //   key={equity}
                //   w="full"
                //   px="24px"
                //   py="16px"
                //   gap="12px"
                //   bg="background"
                //   cursor="pointer"
                //   align={'center'}
                //   border="1px solid"
                //   borderRadius="4px"
                //   borderColor="matador_border_color.100"
                //   onClick={() => handleManageAssets(equity)}
                // >
                //   <Image
                //     h="60px"
                //     w="60px"
                //     borderRadius={'5px'}
                //     alt="next_image"
                //     src={equity?.project?.photos[0]?.photo}
                //   />
                //   <VStack align="stretch" spacing={'8px'} maxW="330px">
                //     <Text fontSize={'15px'} fontWeight="500" color="text">
                //       {equity?.project?.name}
                //     </Text>
                //     <Text fontSize={'12px'} fontWeight="500" color="text">
                //       {`${formatToCurrency(equity?.total_unit_price)}`}
                //     </Text>
                //   </VStack>
                // </Flex>
              ))}
            </VStack>
          ) : (
            <EmptyState text={`You haven't purchased any property yet`} />
          )}
        </>
      )}
    </Box>
  );
};

export default AssetsList;
