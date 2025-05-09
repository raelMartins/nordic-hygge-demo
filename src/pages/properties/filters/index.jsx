import React, {useState, useEffect} from 'react';
import {
  Flex,
  Box,
  Divider,
  InputGroup,
  InputLeftAddon,
  Input,
  Image,
  Text,
  useDisclosure,
  useToast,
  Center,
  Spinner,
} from '@chakra-ui/react';
import {Button, SelectMenu, SliderMenu, Toggle} from '../../../ui-lib/ui-lib.components';
import searchIcon from '../../../images/search-icon.svg';
import searchIcon_light from '../../../images/search-icon-light.svg';
import filterIcon from '../../../images/filter-icon.svg';
import filterIcon_light from '../../../images/filter-icon-light.svg';
import SavedFilters from './savedFiltres';
import {fetchSavedFilters, saveFilters} from '../../../api/listing';
import {useMutation, useQuery} from 'react-query';
import FilterMobile from './filterMobile';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
import saveFiltersImg from '../../../images/icons/save-filters.svg';
import hideFiltersImg from '../../../images/icons/hide-filters.svg';
import {useCustomToast} from '@/components/CustomToast';

function isAppendable(item) {
  if (item === '' || item === undefined || item === null) return false;
  else return true;
}

const domainOfPrice = [0, 900000000];

const propertyTypeOptions = [
  {value: 'Any', label: 'Any'},
  {value: 'Single Family Residential', label: 'Single Family Residential'},
  {value: 'Apartment Complex', label: 'Apartment Complex'},
  {value: 'Estate', label: 'Estate'},
  {value: 'Mall', label: 'Mall'},
  {value: 'Terraces', label: 'Terraces'},
  {value: 'Mixed Use', label: 'Mixed Use'},
  {value: 'Land', label: 'Land'},
  {value: 'Detached', label: 'Detached'},
  {value: 'Semi Detached', label: 'Semi Detached'},
];
const projectStatusOptions = [
  {value: 'Any', label: 'Any'},
  {value: 'Post Construction', label: 'Post Construction'},
  {value: 'In Construction', label: 'In Construction'},
  {value: 'Pre Construction', label: 'Pre Construction'},
];

const numberOfBedroomOptions = [
  {value: '', label: 'Any'},
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6', label: '6+'},
];

const FilterList = ({onFilterChange}) => {
  const toast = useCustomToast();
  const savedFilterDisclosure = useDisclosure();
  const mobileFilterDisclosure = useDisclosure();
  const [showFilters, setShowFilters] = useState(true);

  const [selectedProjectStatus, setSelectedProjectStatus] = useState('Any');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Any');
  const [searchString, setSearchString] = useState('');
  const [rangeOfPrice, setRangeOfPrice] = useState(domainOfPrice);
  const [isPaymentPlanOn, setPaymentPlan] = useState(true);
  const [numberOfBedroom, setNumberOfBedroom] = useState('');

  const getQueryString = () => {
    var queryString = new URLSearchParams();

    if (isAppendable(selectedPropertyType))
      queryString.append('building_type', selectedPropertyType);

    if (isAppendable(numberOfBedroom)) queryString.append('bedroom_from', numberOfBedroom);

    if (isAppendable(numberOfBedroom)) queryString.append('bedroom_to', numberOfBedroom);

    if (isAppendable(selectedProjectStatus)) queryString.append('status', selectedProjectStatus);

    if (isAppendable(isPaymentPlanOn))
      queryString.append('payment_plan_is_available', isPaymentPlanOn ? 'True' : 'False');

    if (isAppendable(rangeOfPrice[0])) queryString.append('price_from', rangeOfPrice[0]);

    if (isAppendable(rangeOfPrice[1])) queryString.append('price_to', rangeOfPrice[1]);

    if (isAppendable(searchString)) queryString.append('search', searchString);

    onFilterChange(queryString.toString());
    return queryString.toString();
  };

  function prepareAndSetQueryString(filterData) {
    if (filterData) {
      onFilterChange(filterData);
    } else {
      var queryString = new URLSearchParams();

      if (isAppendable(selectedPropertyType))
        queryString.append('building_type', selectedPropertyType);

      if (isAppendable(numberOfBedroom)) queryString.append('bedroom_from', numberOfBedroom);

      if (isAppendable(numberOfBedroom)) queryString.append('bedroom_to', numberOfBedroom);

      if (isAppendable(selectedProjectStatus)) queryString.append('status', selectedProjectStatus);

      if (isAppendable(isPaymentPlanOn))
        queryString.append('payment_plan_is_available', isPaymentPlanOn ? 'True' : 'False');

      if (isAppendable(rangeOfPrice[0])) queryString.append('price_from', rangeOfPrice[0]);

      if (isAppendable(rangeOfPrice[1])) queryString.append('price_to', rangeOfPrice[1]);

      if (isAppendable(searchString)) queryString.append('search', searchString);

      onFilterChange(queryString.toString());
    }
  }

  const {
    data: fetchedData,
    isLoading: filtersLoading,
    refetch,
  } = useQuery(['fetchSavedFilters'], fetchSavedFilters);

  useEffect(prepareAndSetQueryString, [
    selectedPropertyType,
    selectedProjectStatus,
    isPaymentPlanOn,
    rangeOfPrice,
    searchString,
    numberOfBedroom,
  ]);

  const applySelectedFilter = (filterData, id) => {
    savedFilterDisclosure.onClose();
    prepareAndSetQueryString(filterData);
  };

  const {mutate, isLoading} = useMutation(
    async () => {
      const queryString = getQueryString();
      saveFilters({filter_query: queryString.toString()});
      return await refetch();
    },
    {
      onSuccess: async res => {
        return toast({
          description: 'Filter successfully saved',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
      onError: err => {
        return toast({
          title: 'An Error Occured!.',
          description: 'Filter not saved',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleOpenModal = async () => {
    savedFilterDisclosure.onOpen();
    return await refetch();
  };

  const SAVED_FILTERSS = fetchedData?.data?.results || [];

  const filterDataExtracted = SAVED_FILTERSS?.map(filter => {
    let obj = {
      filter_data: filter?.filter_data,
      id: filter?.id,
    };
    filter?.filter_data?.split('&')?.map(data => {
      obj[data?.split('=')[0]] = data?.replaceAll('+', ' ')?.split('=')[1];
    });
    return obj;
  });

  const handleSave = async () => {
    mutate();
  };

  return (
    <>
      <Box w={'100%'}>
        <Flex
          w="full"
          justify={'flex-end'}
          gap="8px"
          align={'center'}
          mb="18px"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Text
            textDecoration={'underline'}
            cursor="pointer"
            whiteSpace={'nowrap'}
            textOverflow="clip"
            overflow="hidden"
            color="custom_color.color"
            fontSize="16px"
            fontWeight="400"
            float={'right'}
          >
            {showFilters ? 'Hide filters' : 'Show filters'}
          </Text>
          <Image src={hideFiltersImg.src} />
        </Flex>
        <Box w="full" overflowY={!showFilters && 'hidden'} h="100px">
          <Flex
            bg="background"
            w="full"
            h={'100px'}
            px={'35px'}
            alignItems={'center'}
            justify={'space-between'}
            transition="transform 1s"
            transform={`translateY(${showFilters ? '0' : '-100'}%)`}
          >
            <Flex
              w={'100%'}
              cursor={'pointer'}
              justify="space-between"
              align="flex-start"
              direction="column"
            >
              <Text fontSize="13px" fontWeight="500" fontFamily="Roboto">
                {'Location'}
              </Text>
              <Input
                placeholder="Search by Location"
                py={'10px'}
                px="0"
                h={'100%'}
                border={'none !important'}
                onChange={e => setSearchString(e.target.value)}
              />
            </Flex>
            <Box
              borderRight={'1px solid #797979'}
              height={'70px'}
              mx={{base: `10px`, '2xl': '30px'}}
            />
            <SliderMenu
              placeholder={'Any price'}
              label={'Price'}
              range={rangeOfPrice}
              onApply={setRangeOfPrice}
              domain={domainOfPrice}
              stepOfIncrement={1000}
            />
            <Box
              borderRight={'1px solid #797979'}
              height={'70px'}
              mx={{base: `10px`, '2xl': '30px'}}
            />
            <SelectMenu
              label={'Post Construction'}
              placeholder={'Show All'}
              options={projectStatusOptions}
              selected={selectedProjectStatus}
              onApply={setSelectedProjectStatus}
            />
            <Box
              borderRight={'1px solid #797979'}
              height={'70px'}
              mx={{base: `10px`, '2xl': '30px'}}
            />
            <SelectMenu
              placeholder={'Show All'}
              label={'Property type'}
              options={propertyTypeOptions}
              selected={selectedPropertyType}
              onApply={setSelectedPropertyType}
            />
            <Box
              borderRight={'1px solid #797979'}
              height={'70px'}
              mx={{base: `10px`, '2xl': '30px'}}
            />
            <SelectMenu
              label={'Bedroom no'}
              placeholder={'Show All'}
              options={numberOfBedroomOptions}
              selected={numberOfBedroom}
              onApply={setNumberOfBedroom}
              pb="0px"
            />
            <Box
              borderRight={'1px solid #797979'}
              height={'70px'}
              mx={{base: `10px`, '2xl': '30px'}}
            />
            <Toggle label={'Payment Plan'} value={isPaymentPlanOn} onChange={setPaymentPlan} />
            {isLoading ? (
              <Spinner />
            ) : (
              <Center
                mr="20px"
                w={{base: '350px', '2xl': '500px'}}
                flexDirection={'column'}
                gap="7px"
                onClick={handleSave}
                cursor={'pointer'}
              >
                <Image src={saveFiltersImg.src} />
                <Text color={'#191919'} fontSize={'13px'} fontWeight={500} minW={`max-content`}>
                  Save filter
                </Text>
              </Center>
            )}
          </Flex>
        </Box>
        <Flex w="full" justify={'flex-end'} mt="18px">
          <Text
            textDecoration={'underline'}
            onClick={handleOpenModal}
            cursor="pointer"
            whiteSpace={'nowrap'}
            textOverflow="clip"
            overflow="hidden"
            color="custom_color.color"
            fontSize="16px"
            fontWeight="400"
            float={'right'}
          >
            View saved filter
          </Text>
        </Flex>
      </Box>
      <Flex
        w={'100%'}
        my={'5px'}
        mx="auto"
        color="matador_text.100"
        gap="8px"
        display={{base: 'flex', md: 'none'}}
      >
        <InputGroup
          w="85%"
          borderRadius={'8px'}
          border={'1px solid #E4E4E4 !important'}
          boxShadow={'0px 2.675px 5.647px 0px rgba(142, 151, 158, 0.15)'}
        >
          <InputLeftAddon bg={'transparent'} mt="2px" px={'10px'} border={'none'}>
            <Image
              w="25px"
              h="auto"
              alt="next_image"
              src={appCurrentTheme === LIGHT ? searchIcon.src : searchIcon_light.src}
            />
          </InputLeftAddon>
          <Input
            placeholder="Search by Location"
            w="full"
            py={'10px'}
            pl="0px"
            h={'100%'}
            border={'none !important'}
            onChange={e => setSearchString(e.target.value)}
          />
        </InputGroup>
        <Center
          cursor={'pointer'}
          onClick={mobileFilterDisclosure.onOpen}
          w="48px"
          h="48px"
          borderRadius={'8px'}
          border={'1px solid #E4E4E4 !important'}
          boxShadow={'0px 2.675px 5.647px 0px rgba(142, 151, 158, 0.15)'}
        >
          <Image
            alt="next_image"
            src={appCurrentTheme === LIGHT ? filterIcon.src : filterIcon_light.src}
          />
        </Center>
      </Flex>

      <FilterMobile
        onFilterChange={onFilterChange}
        isOpen={mobileFilterDisclosure.isOpen}
        onClose={mobileFilterDisclosure.onClose}
      />

      <SavedFilters
        filtersLoading={filtersLoading}
        filterDataExtracted={filterDataExtracted}
        fetchedData={fetchedData}
        refetch={refetch}
        applySelectedFilter={applySelectedFilter}
        isOpen={savedFilterDisclosure.isOpen}
        onClose={savedFilterDisclosure.onClose}
      />
    </>
  );
};

export default FilterList;
