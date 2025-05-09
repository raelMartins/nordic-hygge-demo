import {Box, Center, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchAllUnits} from '@/api/listing';
import {Spinner} from '@/ui-lib';
import {useRouter} from 'next/router';
import ErrorState from '@/components/appState/error-state';
import {UnitCard} from '@/components/cards/UnitCard';

const AllUnits = ({info, ...rest}) => {
  const router = useRouter();
  const projectId = info?.id;
  const {data, isError, isLoading, error} = useQuery(
    ['fetchAllUnits', projectId],
    () => fetchAllUnits(parseInt(projectId)),
    {enabled: !!projectId}
  );

  const Units = () =>
    data?.data?.results?.map((unit, index) => (
      <UnitCard
        key={unit?.id}
        unit={unit}
        projectID={projectId}
        sold_out={info?.is_sold_out}
        index={index}
      />
    ));

  return (
    <Stack gap={{base: `23px`}} {...rest}>
      <Text
        className="heading-text-regular"
        fontSize={{base: `32px`}}
        color="text"
        lineHeight={`130%`}
        textTransform={`uppercase`}
        fontWeight={`600`}
        letterSpacing={`1.908px`}
      >
        Available Units
      </Text>

      {isLoading ? (
        <Center minH={`200px`}>
          <Spinner disableAbsoluteCenteredSpinner h={{base: `50px`}} w={{base: `50px`}} />
        </Center>
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
  );
};

export default AllUnits;
