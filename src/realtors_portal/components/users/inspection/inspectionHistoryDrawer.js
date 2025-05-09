import React, {useEffect, useState} from 'react';
import {
  HStack,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Box,
  Flex,
  Center,
} from '@chakra-ui/react';

import RatingIcon from '../rating';
import Filter from '@/realtors_portal/components/inspection/history/filter';
import {generateID} from '@/realtors_portal/utils/generateId';
import InspectionDetails from './inspectionDetails';
import {OvalLoader} from '@/realtors_portal/components/loaders/AnimatedLoader';
import {drawer_style} from '../../AgentLayout/drawers/drawer_style';
import {GoBack} from '../../assets/BackArrow';
import {ArrowBackIcon} from '@chakra-ui/icons';
import {IoChevronForward} from 'react-icons/io5';
import Image from 'next/image';

const mode = {
  'in-person': {
    color: '#12D8A0',
    bg: 'rgba(18, 216, 160, 0.10)',
    text: 'In Person',
  },
  video: {
    color: '#4545FE',
    bg: 'rgba(69, 69, 254, 0.10)',
    text: 'Video',
  },
};

const InspectionHistoryDrawer = ({isLoading, data, drawerDisclosure, setAddedParam}) => {
  console.log(data, isLoading);
  const [openDetails, setOpenDetails] = useState(false);

  // Track the selected inspection data
  const [selectedInspectionData, setSelectedInspectionData] = useState(null);

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);

  // Function to handle inspection item click
  const handleInspectionItemClick = data => {
    setSelectedInspectionData(data);
    setOpenDetails(true);
  };

  return (
    <div>
      <Drawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        closeOnSelect={false}
        placement={'right'}
      >
        <DrawerOverlay bg="rgba(0,0,0,0.1)" />
        <DrawerContent {...drawer_style}>
          <HStack
            bg={{md: '#F5F5F5'}}
            justify="space-between"
            align="center"
            position="relative"
            p={{base: `24px`, md: `14px 20px`}}
          >
            <HStack gap={`12px`}>
              <ArrowBackIcon
                onClick={openDetails ? () => setOpenDetails(false) : drawerDisclosure.onClose}
                cursor={`pointer`}
                display={{md: openDetails ? `block` : `none`}}
              />
              <Heading fontSize={{base: `19px`, md: `16px`}} fontWeight="600">
                Inspection {openDetails ? `Details` : ` History`}
              </Heading>
            </HStack>

            <HStack spacing="15px">
              {!openDetails && <Filter setUrl={setAddedParam} />}
              <Center position="relative" boxSize="30px" borderRadius="5px">
                <DrawerCloseButton right="0px" left="0px" top="0" bottom="0" />
              </Center>
            </HStack>
          </HStack>
          {!openDetails ? (
            <>
              {isLoading ? (
                <Box width="100%" display="flex" justifyContent="center">
                  <OvalLoader />
                </Box>
              ) : (
                <Flex
                  direction={`column`}
                  gap={{base: `20px`, md: `12px`}}
                  p={{base: `20px`, md: `24px`}}
                >
                  {data?.message?.map(data => (
                    <HStack
                      width="full"
                      padding={'12px'}
                      justifyContent="space-between"
                      cursor="pointer"
                      key={generateID()}
                      onClick={() => handleInspectionItemClick(data)}
                      border={{base: `1px solid`}}
                      borderColor={`#e4e4e7 !important`}
                      borderRadius={{base: `10px`}}
                    >
                      <HStack gap={'12px'} align={'start'}>
                        <Center
                          position={`relative`}
                          boxSize={`100px`}
                          minW={`100px`}
                          borderRadius={`6px`}
                          overflow={`hidden`}
                        >
                          <Image
                            objectFit="cover"
                            src={data?.project_details.image}
                            alt=""
                            fill
                            style={{objectFit: `cover`}}
                          />
                        </Center>
                        <Stack gap={`8px`} flex={`1`}>
                          <Text fontSize="15px" fontWeight="500">
                            {data?.project_details.name}
                          </Text>
                          <HStack gap={0}>
                            {[...Array(5)].map((_, index) => (
                              <RatingIcon
                                key={index}
                                fill={index < data.star_rating ? '#FF9103' : '#CBCBCB'}
                              />
                            ))}
                          </HStack>
                          <Text fontSize="13px" fontWeight="400">
                            {data?.time}
                          </Text>
                          {mode[data?.tour_method] && (
                            <Tag
                              p="4px 7px"
                              bg={mode[data?.tour_method]?.bg}
                              color={mode[data?.tour_method]?.color}
                              borderRadius="full"
                              maxW={`max-content`}
                            >
                              <TagLabel fontSize={`10px`}>{mode[data?.tour_method]?.text}</TagLabel>
                            </Tag>
                          )}
                        </Stack>
                      </HStack>
                      <IoChevronForward color="#b5b5b5" />
                    </HStack>
                  ))}
                </Flex>
              )}
            </>
          ) : (
            <>
              <Flex
                direction={`column`}
                gap={{base: `20px`, md: `12px`}}
                p={{base: `20px`, md: `24px`}}
              >
                <InspectionDetails inspectionData={selectedInspectionData} />
              </Flex>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default InspectionHistoryDrawer;
