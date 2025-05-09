import {Box, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchAllUnits} from '@/api/listing';
import {Spinner} from '@/ui-lib';
import ErrorState from '@/components/appState/error-state';
import {UnitCard} from '@/components/cards/UnitCard';

const OtherUnits = ({info, excludingId, ...rest}) => {
  const projectId = info?.id;
  const {data, isError, isLoading} = useQuery(
    ['fetchAllUnits', projectId],
    () => fetchAllUnits(parseInt(projectId)),
    {enabled: !!projectId}
  );

  const filteredData = data?.data?.results?.filter(unit => unit.id !== excludingId) || [];

  const Units = () =>
    filteredData?.map((unit, index) => (
      <UnitCard
        key={unit?.id}
        unit={unit}
        projectID={projectId}
        sold_out={info?.is_sold_out}
        index={index}
      />
    ));

  return (
    <>
      {Boolean(filteredData?.length) && (
        <Stack gap={{base: `23px`}} {...rest}>
          {/* <Text
            fontSize={{ base: '16px', md: '24px' }}
            fontWeight={400}
            color='text'
            className='heading-text-bold'
          >
            People also viewed
          </Text>
          <Box w='150px' mt='15px' borderBottom='1.8px solid #191919' /> */}

          <Text
            className="heading-text-regular"
            fontSize={{base: `32px`}}
            color="text"
            lineHeight={`130%`}
            textTransform={`uppercase`}
            fontWeight={`600`}
            letterSpacing={`1.908px`}
          >
            People also viewed
          </Text>

          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <ErrorState />
          ) : (
            <SimpleGrid
              gap={{base: '16px', md: '24px', '2xl': '54px'}}
              // columns={{base: 1, md: 2, xl: 3}}
              columns={{base: 1}}
              justify={'center'}
              alignItems={'center'}
            >
              <Units />
            </SimpleGrid>
          )}
        </Stack>
      )}
    </>
  );
};

export default OtherUnits;
