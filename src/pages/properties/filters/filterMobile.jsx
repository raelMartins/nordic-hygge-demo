import React, {useState} from 'react';
import {
  Flex,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  Image,
  Text,
  useDisclosure,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import backIcon from '../../../images/navar/backIcon.svg';
import searchIcon from '../../../images/search-icon.svg';
import searchIcon_light from '../../../images/search-icon-light.svg';
import SavedFiltersMobile from './savedFilterMobile';
import {fetchSavedFilters, saveFilters} from '../../../api/listing';
import {useMutation, useQuery} from 'react-query';
import SelectMenu from './mobile-dropdowns/selectMenu';
import SliderMenu from './mobile-dropdowns/sliderMenu';
import Toggle from './mobile-dropdowns/toggleMenu';
import SelectMenuHorizontal from './mobile-dropdowns/selectMenuHorizontal';
import {Button} from '../../../ui-lib';
import saveFilterIcon from '../../../images/icons/save-filter-icon.svg';
import {appCurrentTheme} from '../../../utils/localStorage';
import {LIGHT} from '../../../constants/names';
import {ChevronLeftIcon} from '@chakra-ui/icons';
import {useCustomToast} from '@/components/CustomToast';

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

const FilterMobile = ({isOpen, onClose, onFilterChange}) => {
  const toast = useCustomToast();
  const savedFilterDisclosure = useDisclosure();

  const [selectedProjectStatus, setSelectedProjectStatus] = useState('Any');
  const [selectedPropertyType, setSelectedPropertyType] = useState('Any');
  const [searchString, setSearchString] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [isPaymentPlanOn, setPaymentPlan] = useState(true);
  const [numberOfBedroom, setNumberOfBedroom] = useState('');

  const getQueryString = () => {
    var queryString = new URLSearchParams();
    queryString.append('building_type', selectedPropertyType);
    queryString.append('bedroom_from', numberOfBedroom);
    queryString.append('bedroom_to', numberOfBedroom);
    queryString.append('status', selectedProjectStatus);
    queryString.append('payment_plan_is_available', isPaymentPlanOn ? 'True' : 'False');
    queryString.append('price_from', priceFrom?.replaceAll(',', ''));
    queryString.append('price_to', priceTo?.replaceAll(',', ''));
    queryString.append('search', searchString);

    return queryString.toString();
  };

  function prepareAndSetQueryString(filterData) {
    onFilterChange(filterData);
  }

  const {data: fetchedData, refetch} = useQuery(['fetchSavedFilters'], fetchSavedFilters);

  const applySelectedFilter = (filterData, id) => {
    savedFilterDisclosure.onClose();
    onClose();
    prepareAndSetQueryString(filterData);
  };

  const {mutate, isLoading} = useMutation(
    async () => {
      const queryString = getQueryString();
      return saveFilters({filter_query: queryString.toString()});
    },
    {
      onSuccess: async res => {
        await refetch();
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
    onClose();
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

  const handleResetFilter = () => {
    setSelectedProjectStatus('Any');
    setSelectedPropertyType('Any');
    setSearchString('');
    setPriceFrom('');
    setPriceTo('');
    setPaymentPlan(true);
    setNumberOfBedroom('');

    prepareAndSetQueryString(getQueryString());
    onClose();
  };

  const handleApplyFilter = () => {
    prepareAndSetQueryString(getQueryString());
    onClose();
  };

  return (
    <>
      <Drawer autoFocus="false" blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="background" px="18px" py="25px" minW="100vw">
          <Flex w="full" justify={'space-between'} align={'center'}>
            <Flex align={'center'} gap="8px" onClick={onClose}>
              <Box cursor={'pointer'}>
                <ChevronLeftIcon color="text" fontSize={'40px'} />
              </Box>
              <Text color="text" fontSize={'18px'} fontWeight={500}>
                Search filters
              </Text>
            </Flex>

            {Boolean(filterDataExtracted.length) && (
              <Text
                color="text"
                onClick={handleOpenModal}
                fontSize={'14px'}
                fontWeight={400}
                textDecoration={'underline'}
              >
                View saved filters
              </Text>
            )}
          </Flex>

          <Box mt="30px" overflowY="auto" h="90vh" w="full">
            <InputGroup
              w="full"
              borderRadius={'8px'}
              border={'1px solid #E4E4E4 !important'}
              boxShadow={'0px 2.675px 5.647px 0px rgba(142, 151, 158, 0.15)'}
            >
              <InputLeftAddon bg={'transparent'} px={'10px'} border={'none'}>
                <Image
                  w="30px"
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

            <SliderMenu
              priceFrom={priceFrom}
              priceTo={priceTo}
              setPriceFrom={setPriceFrom}
              setPriceTo={setPriceTo}
              label={'Price'}
            />
            <SelectMenu
              label={'Project Status'}
              onClose={onClose}
              options={projectStatusOptions}
              selected={selectedProjectStatus}
              onApply={setSelectedProjectStatus}
            />
            <SelectMenu
              label={'Property type'}
              onClose={onClose}
              options={propertyTypeOptions}
              selected={selectedPropertyType}
              onApply={setSelectedPropertyType}
            />
            <SelectMenuHorizontal
              label={'Bedroom numbers'}
              placeholder={'Show All'}
              options={numberOfBedroomOptions}
              selected={numberOfBedroom}
              onApply={setNumberOfBedroom}
            />
            <Toggle
              label={'Payment Plan'}
              onClose={onClose}
              value={isPaymentPlanOn}
              onChange={setPaymentPlan}
            />

            <Flex direction="row" justify="center" align="center" gap="10px">
              <Button
                border="1px solid !important"
                borderColor="custom_color.color !important"
                color="custom_color.color"
                bg="custom_color.background"
                isLoading={isLoading}
                maxW={{base: 'unset', md: '112px'}}
                onClick={handleResetFilter}
                w="full"
              >
                Reset
              </Button>
              <Button
                color="custom_color.contrast"
                bg="custom_color.color"
                isLoading={isLoading}
                maxW={{base: 'unset', md: '112px'}}
                onClick={handleApplyFilter}
                w="full"
              >
                Apply Filter
              </Button>
            </Flex>
            <Button
              color="custom_color.color"
              leftIcon={<Image w="14px" h="14px" src={saveFilterIcon.src} />}
              bg="primaryFilterOpacity"
              mt="16px"
              isLoading={isLoading}
              maxW={{base: 'unset', md: '112px'}}
              onClick={handleSave}
              w="full"
            >
              Save
            </Button>
          </Box>
        </DrawerContent>
      </Drawer>
      <SavedFiltersMobile
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

export default FilterMobile;
