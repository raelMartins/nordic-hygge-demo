import {SearchBar} from './components/searchBar';
import PriceRange from './components/priceRange';
import SelectMenu from './components/selectMenu';
import {Divider, HStack, Text, VStack} from '@chakra-ui/react';
import {Toggle} from './components/toggle';
import {SearchFilterIconSVG} from '../../assets/svgs';

const propertyTypeOptions = [
  {value: '', label: 'Any'},
  // {value: 'Single Family Residential', label: 'Single Family Residential'},
  {value: 'Apartment Complex', label: 'Apartment'},
  // {value: 'Estate', label: 'Estate'},
  {value: 'Mall', label: 'Commercial'},
  // {value: 'Terraces', label: 'Terraces'},
  // {value: 'Mixed Use', label: 'Mixed Use'},
  {value: 'Land', label: 'Land'},
  {value: 'Detached', label: 'House'},
  // {value: 'Semi Detached', label: 'Semi Detached'},
];

const projectStatusOptions = [
  {value: '', label: 'Any'},
  {value: 'In Construction', label: 'In Construction'},
  {value: 'Pre Construction', label: 'Pre Construction'},
  {value: 'Post Construction', label: 'Post Construction'},
];

const numberOfBedroomOptions = [
  {value: '1', label: '1'},
  {value: '2', label: '2'},
  {value: '3', label: '3'},
  {value: '4', label: '4'},
  {value: '5', label: '5'},
  {value: '6+', label: '6+'},
];

const FilterList = ({filterObj, setFilterObj, shouldDisable, handleFilter, ...rest}) => {
  return (
    <HStack
      position="relative"
      zIndex={2}
      bg="matador_background.200"
      maxW="1440px"
      display={{base: 'none', xl: 'flex'}}
      mx="80px"
      h="93px"
      border="1px solid"
      borderColor="matador_border_color.100"
      boxShadow="0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)"
      justify="space-between"
      spacing="24px"
      p="12px 30px"
      {...rest}
    >
      <SearchBar
        filterForSearch
        label={'Location'}
        placeholder={'___'}
        updateSearch={setFilterObj}
        value={filterObj.searchString}
      />
      <Divider orientation="vertical" height={'70px'} bg="matador_background.200" />

      <PriceRange
        label={'Price Range'}
        shouldDisable={shouldDisable}
        placeholder={'Price'}
        upDatePrice={setFilterObj}
        priceRange={filterObj.priceRange}
      />

      <Divider bg="matador_background.200" orientation="vertical" height={'70px'} />

      <SelectMenu
        label={'Property Type'}
        placeholder={'Show All'}
        updateOption={setFilterObj}
        selectedOptions={filterObj.propertyType}
        objKey="propertyType"
        options={propertyTypeOptions}
        minW="228px"
      />
      <Divider bg="matador_background.200" orientation="vertical" height={'70px'} />

      <SelectMenu
        label={'Bedroom No'}
        placeholder={'Show All'}
        options={numberOfBedroomOptions}
        updateOption={setFilterObj}
        objKey="no_of_bedroom"
        selectedOptions={filterObj.no_of_bedroom}
      />

      <Divider bg="matador_background.200" orientation="vertical" height={'70px'} />

      <Toggle label={'Payment Plan'} value={filterObj.paymentPlan} onChange={setFilterObj} />
      <VStack role="button" spacing="9.5px" onClick={handleFilter}>
        <SearchFilterIconSVG />
        <Text color="text" fontSize="13px" fontWeight={400}>
          search
        </Text>
      </VStack>
    </HStack>
  );
};

export default FilterList;
