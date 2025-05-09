import {useState} from 'react';
import {Box, Center, Flex, useDisclosure} from '@chakra-ui/react';
import {UnitOptions} from './UnitOptions';
import {ContactPersonContent} from '../listings/modals/contactPerson';
import BuyModal from './buyModal';
import {RequestTourContent} from '../listings/modals/requestTour';

export const action_box_header_style = {
  spacing: '12px',
  cursor: 'pointer',
  className: 'heading-text-regular',
  fontSize: {base: '23px', lg: '24px'},
  fontWeight: `400`,
  lineHeight: `120%`,
  letterSpacing: `-0.24px`,
};

export const UnitActionBox = ({info, openAuth, unitData, ...rest}) => {
  const [screen, set_screen] = useState('options');
  const [fixedwidth, setFixedwidth] = useState(true);

  const handle_screen_change = val => {
    setFixedwidth(true);
    set_screen(val);
  };

  const buyModal = useDisclosure();

  const content = {
    options: (
      <UnitOptions
        info={info}
        unitData={unitData}
        openAuth={openAuth}
        change_screen={handle_screen_change}
      />
    ),
    purchase: (
      <BuyModal unitData={unitData} buyModal={buyModal} change_screen={handle_screen_change} />
    ),
    inspection: <RequestTourContent info={info} change_screen={handle_screen_change} />,
    contact: <ContactPersonContent info={info} change_screen={handle_screen_change} />,
  }[screen];
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
        left={{base: `0px`, lg: `80px`}}
        zIndex={`2`}
        // w={`max-content`}
        minW={{base: `200px`, lg: `350px`}}
        minH={{base: `370px`, lg: `400px`}}
        // background={`rgba(21, 21, 30)`}
        background={`#15151E`}
        color={`#ffffff`}
        p={{base: `34px`, lg: `32px`}}
        w={fixedwidth ? {base: `100%`, lg: `430px`} : {base: `100%`, sm: `unset`}}
        mx={{base: `16px`, lg: `0px`}}
        {...rest}
      >
        {content || <UnitOptions info={info} change_screen={handle_screen_change} />}
      </Flex>
    </Center>
  );
};
