import {
  HStack,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
} from '@chakra-ui/react';

import {MatadorCustomTable} from '../../Table/Table';
import {INSPECTION_REQUEST_COLUMNS} from '/src/realtors_portal/constants/agent-request/inspection_request';
import {COMMISSION_REQUEST_COLUMN} from '/src/realtors_portal/constants/agent-request/commission_request';

const RequestTypes = ({inspection_info, isRefetching, setTabIndex, commission_info, forData}) => {
  return (
    <>
      <Tabs
        onChange={index => setTabIndex(index)}
        defaultIndex={0}
        position="relative"
        variant="unstyled"
      >
        <TabList w="full">
          <HStack
            mt="40px"
            px="301px"
            w="full"
            bg="#ffffff"
            py="25px"
            justify="space-between"
            borderTopRightRadius="10px"
            borderTopLeftRadius="10px"
          >
            <Tab color="#919191" wordBreak="keep-all" w="34px" pb="0" _selected={{color: '#000'}}>
              <Text fontWeight="500" whiteSpace="nowrap">
                Inspection Request
              </Text>
            </Tab>
            <Tab color="#919191" w="34px" wordBreak="keep-all" pb="0" _selected={{color: '#000'}}>
              <Text fontWeight="500" whiteSpace="nowrap">
                Commission Request
              </Text>
            </Tab>
          </HStack>
        </TabList>

        <TabIndicator mt="-19px" height="6px" minWidth="34px" bg="#000" borderRadius="27px" />

        <TabPanels mt="20px">
          <TabPanel p="0">
            <MatadorCustomTable
              dontExpand
              forData={forData}
              headerSpace="evenly"
              noTopPaginate
              isRefetching={isRefetching}
              DATA={inspection_info && inspection_info}
              COLUMNS={INSPECTION_REQUEST_COLUMNS}
              isManageAgentEmpty="There is currently no inspection request"
            />
          </TabPanel>
          <TabPanel p="0">
            <MatadorCustomTable
              forData={forData}
              dontExpand
              headerSpace="evenly"
              noTopPaginate
              isRefetching={isRefetching}
              DATA={commission_info}
              COLUMNS={COMMISSION_REQUEST_COLUMN}
              isManageAgentEmpty="There is currently no commission request"
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default RequestTypes;
