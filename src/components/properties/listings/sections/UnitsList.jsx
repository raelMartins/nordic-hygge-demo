import {Center, SimpleGrid, Stack, Text} from '@chakra-ui/react';
import {useQuery} from 'react-query';
import {fetchAllUnits} from '@/api/listing';
import ErrorState from '@/components/appState/error-state';
import {UnitCard} from '@/components/cards/UnitCard';
import {useEffect} from 'react';
import ThreeDots from '@/components/loaders/ThreeDots';

export const UnitsList = ({info, excludingId, setHasUnits = () => {}, ...rest}) => {
  const projectId = info?.id;
  const {data, isError, isLoading} = useQuery(
    ['fetchAllUnits', projectId],
    () => fetchAllUnits(parseInt(projectId)),
    {enabled: !!projectId}
  );

  const filteredData = excludingId
    ? data?.data?.results?.filter(unit => unit.id !== excludingId) || []
    : data?.data?.results || [];

  useEffect(() => {
    filteredData?.length > 0 ? setHasUnits(true) : setHasUnits(false);
  }, [filteredData]);

  return (
    <>
      {Boolean(filteredData?.length) && (
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
            {excludingId ? `People also viewed` : `Available Units`}
          </Text>

          {isLoading ? (
            <Center minH={`200px`}>
              <ThreeDots />
            </Center>
          ) : isError ? (
            <ErrorState text={`There was an error while fetching units`} />
          ) : (
            <SimpleGrid
              gap={{base: '16px', md: '24px', '2xl': '54px'}}
              columns={{base: 1}}
              justify={'center'}
              alignItems={'center'}
            >
              {filteredData?.map((unit, index) => (
                <UnitCard
                  key={unit?.id}
                  unit={unit}
                  projectID={projectId}
                  sold_out={info?.is_sold_out}
                  index={index}
                />
              ))}
            </SimpleGrid>
          )}
        </Stack>
      )}
    </>
  );
};
