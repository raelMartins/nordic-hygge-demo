import {useState} from 'react';
import {Box, Center, Flex, useDisclosure} from '@chakra-ui/react';
import {RequestTourContent} from './modals/requestTour';
import {ContactPersonContent} from './modals/contactPerson';
import {PropertyInfo} from './sections/propertyInfo';
import FractionalModal from './sections/fractionalModal';
import {useQuery} from 'react-query';
import {fetchAllUnits} from '@/api/listing';
import BuyModal from '../units/buyModal';
import {checkIfSFH} from '@/utils/misc';

export const ListingActionBox = ({info, refetch, openAuth, ...rest}) => {
  const [screen, set_screen] = useState('options');
  const [fixedwidth, setFixedwidth] = useState(true);

  const purchase_disclosure = useDisclosure();

  const handle_screen_change = val => {
    setFixedwidth(true);
    set_screen(val);
  };

  const is_detached = checkIfSFH(info);

  const {data: allUnits} = useQuery(
    ['fetchAllUnits', info?.id],
    () => fetchAllUnits(parseInt(info?.id)),
    {enabled: !!is_detached}
  );

  const unitsData = allUnits?.data?.results;

  const content = {
    options: <PropertyInfo openAuth={openAuth} info={info} change_screen={handle_screen_change} />,
    inspection: <RequestTourContent info={info} change_screen={handle_screen_change} />,
    fractional: (
      <FractionalModal
        info={info}
        change_screen={handle_screen_change}
        setFixedwidth={setFixedwidth}
      />
    ),
    contact: <ContactPersonContent info={info} change_screen={handle_screen_change} />,
    purchase: (
      <BuyModal
        unitData={unitsData?.[0]}
        buyModal={purchase_disclosure}
        change_screen={handle_screen_change}
      />
    ),
  }[screen];

  // const top_margin = screen === `inspection` ? {lg: `70px`} : {lg: `148px`};
  const top_margin = {base: `0px`, lg: `100px`};

  return (
    <Center
      position={{base: `absolute`, lg: `static`}}
      top={{base: `80px`, lg: `0px`}}
      left={`0px`}
      right={`0px`}
      alignItems={`flex-start`}
    >
      <Flex
        direction={`column`}
        position={{lg: `absolute`}}
        top={top_margin}
        left={{lg: `80px`}}
        zIndex={`2`}
        // w={{base: `max-content`}}
        minW={{lg: `350px`}}
        minH={{base: `320px`, lg: `400px`}}
        mx={{base: `16px`, lg: `0px`}}
        // background={`rgba(21, 21, 30)`}
        background={`#15151E`}
        color={`#ffffff`}
        p={{base: `34px`, lg: `32px`}}
        w={fixedwidth ? {base: `100%`, lg: `430px`} : {base: `100%`, sm: `unset`}}
        {...rest}
      >
        {content || <PropertyInfo info={info} change_screen={handle_screen_change} />}
      </Flex>
    </Center>
  );
};
