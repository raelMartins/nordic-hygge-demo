import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import back_arrow from '/src/realtors_portal/images/icons/back_arrow_circle_small.svg';
import {useRouter} from 'next/router';
import {GoBack} from '../assets/BackArrow';
import {navbar_height} from '../AgentLayout/View';
import {NavSearchIcon} from '../AgentLayout/assets/NavbarSvgs';

export const RequestSidebar = ({tabs, tab, changeTab = el => {}, setSearch}) => {
  const router = useRouter();

  return (
    <Flex
      direction={'column'}
      position={{base: 'static', lg: 'sticky'}}
      top={navbar_height}
      width="100%"
      maxW={{base: '100%', lg: '258px'}}
      height={'max-content'}
    >
      <Flex py={{base: `20px`, lg: `32px`}}>
        <GoBack />
        <InputGroup alignItems="center" display={{base: `inline-block`, lg: `none`}}>
          <InputLeftElement>
            <NavSearchIcon cursor="pointer" ml={`10px`} />
          </InputLeftElement>
          <Input
            type="search"
            color="#919191"
            background="#FAFAFA"
            borderRadius="8px"
            fontSize="14px"
            _placeholder={{
              color: '#a1a1a1',
              opacity: `1`,
              fontSize: `14px`,
            }}
            p={'16px'}
            pl={`48px`}
            placeholder="Search"
            border={`1px solid`}
            borderColor={`#E4E4E7 !important`}
            w={`100%`}
            onChange={e => setSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>
      <List
        borderRadius="8px"
        border="1px solid #EAECF0"
        box-shadow="0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
        overflow={'hidden'}
        width={'100%'}
        display={{base: 'flex', lg: 'block'}}
      >
        {tabs.map((el, i) => (
          <ListItem
            key={i}
            p={'10px 16px'}
            bg={tab === el ? '#F5F5F5' : '#fff'}
            borderBottom={'1px solid #EAECF0'}
            onClick={() => changeTab(el)}
            gap={'8px'}
            alignItems={'center'}
            display={'flex'}
            cursor={'pointer'}
            flex={'1'}
          >
            {tab === el && <Box h="10px" w="10px" borderRadius={'50%'} bg={'#191919'}></Box>}
            <Text
              fontSize={'14px'}
              lineHeight={'20px'}
              fontWeight={tab === el ? '600' : '400'}
              color={tab === el ? '#191919' : '#344054'}
              textTransform={'capitalize'}
            >
              {el?.split('_')?.join(' ')}
            </Text>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
