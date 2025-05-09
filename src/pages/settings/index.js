import {useState} from 'react';
import {LayoutView} from '@/components/page_layout';
import {
  Box,
  Center,
  Flex,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Profile from '@/components/settings/sections/Profile';
import Payments from '@/components/settings/sections/Payments';
import {useRouter} from 'next/router';
import Auth from '@/hoc/Auth';
import layoutBG from '@/images/settings_background.jpeg';
import {UploadProfilePicture} from '@/ui-lib';
import useGetSession from '@/utils/hooks/getSession';

const Settings = () => {
  const router = useRouter();
  const {sessionData: LoggedinUser} = useGetSession('loggedIn');
  const {sessionData: store_data} = useGetSession('store_data');

  const gateway_disabled = store_data?.gateway_disabled;

  const tabs = [
    {
      tablist: 'Profile',
      component: <Profile />,
    },
    {
      tablist: 'Payment',
      component: <Payments />,
      hide: gateway_disabled,
    },
  ];

  const [tab, setTab] = useState(tabs[0]);

  const handleTabChange = index => {
    setTab(tabs[index]);
    router.query = {
      id: index,
      tabName: tabs[index].tablist,
    };
  };

  return (
    <LayoutView noPadding fullFooter>
      <Box
        w="full"
        h={{base: `200px`, lg: '200px'}}
        bgImage={layoutBG.src}
        bgPosition={'center'}
        bgSize={'cover'}
        position={'relative'}
      >
        <Box
          position={'absolute'}
          bg={`linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60))`}
          h="full"
          w="full"
        />
        <Center
          position={'absolute'}
          h={'full'}
          w="full"
          p={{base: '40px'}}
          flexDirection={'column'}
          zIndex={20}
          gap={{base: `12px`, lg: `13px`}}
          textTransform={`uppercase`}
          textAlign={`center`}
          color="#FFF"
        >
          <Text
            className="heading-text-regular"
            fontSize={{base: `20px`, lg: '48px'}}
            fontWeight={`600`}
            lineHeight={`130%`}
          >
            {tab.tablist}
          </Text>
        </Center>
      </Box>

      <Box w="full" px={{base: '20px', lg: '80px'}} pt={{base: '20px'}}>
        <Flex
          gap={{base: `20px`, md: `48px`}}
          align="center"
          position={`relative`}
          top={`-48px`}
          direction={{base: `column`, md: `row`}}
        >
          <UploadProfilePicture />
          <Stack textAlign={{base: `center`, md: `left`}} gap={`4px`}>
            <Text
              color={{base: `text`}}
              fontSize={{base: `20px`, md: `28px`}}
              fontWeight={{base: `600`}}
              lineHeight={{base: `130%`}}
            >
              {LoggedinUser?.first_name} {LoggedinUser?.last_name}
            </Text>
            <Text
              color={{base: `matador_text.400`}}
              fontSize={{base: `14px`, md: `16px`}}
              fontWeight={{base: `400`}}
              lineHeight={{base: `160%`}}
              letterSpacing={{base: `0.32px`}}
            >
              {LoggedinUser?.email}
            </Text>
          </Stack>
        </Flex>
        <Tabs onChange={handleTabChange} isLazy>
          <TabList
            flexDirection={{base: 'row', md: 'row'}}
            py="12px"
            gap={{base: '8px', md: '10px'}}
            fontWeight="600"
            fontSize="18px"
            borderColor={`matador_border_color.100 !important`}
          >
            {tabs.map(
              (item, index) =>
                !item?.hide && (
                  <Tab
                    flex={{base: `1`, lg: `none`}}
                    key={index}
                    borderBottom={{base: 'none', md: 'unset'}}
                    color="matador_form.label"
                    p={{base: `8px 14px`}}
                    textTransform={`uppercase`}
                    _selected={{color: 'custom_color.color_pop', border: 'none', fontWeight: '500'}}
                  >
                    <Text
                      fontSize={{base: 14, md: 16}}
                      w={'full'}
                      fontWeight={700}
                      letterSpacing={{base: '0.16px', md: ''}}
                      whiteSpace={'nowrap'}
                    >
                      {item.tablist}
                    </Text>
                  </Tab>
                )
            )}
          </TabList>
          <TabIndicator
            mt="-2.5px"
            height="3px"
            bg="custom_color.color_pop"
            borderRadius="27px"
            borderColor={`custom_color.color_pop !important`}
          />

          <TabPanels>
            {tabs.map(
              (item, index) =>
                !item?.hide && (
                  <TabPanel key={index} px="0px" pb={`64px`}>
                    {item.component}
                  </TabPanel>
                )
            )}
          </TabPanels>
        </Tabs>
      </Box>
    </LayoutView>
  );
};

export default Auth(Settings);
