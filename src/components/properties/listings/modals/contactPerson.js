import {VStack, Flex, Text, Box, HStack, useToast, Center, Stack, Grid} from '@chakra-ui/react';
import {IoCall, IoChevronForward, IoCopy, IoCopyOutline} from 'react-icons/io5';
import {CloseIcon, CopyIcon} from '@chakra-ui/icons';
import {WhatsappIcon} from 'react-share';
import {FaWhatsapp} from 'react-icons/fa';
import {useQuery} from 'react-query';
import {storeDetails} from '@/api/auth';
import isMobile from '@/utils/extras';
import {useState} from 'react';
import {getAllContactPersons} from '@/api/listings';
import {useCustomToast} from '@/components/CustomToast';
import {Spinner} from '@/ui-lib';
import EmptyState from '@/components/appState/empty-state';
import ThreeDots from '@/components/loaders/ThreeDots';

const PhoneCallIcon = ({color = '#fff', boxSize = `24px`}) => {
  return (
    <Box boxSize={boxSize}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.62 10.7496C17.19 10.7496 16.85 10.3996 16.85 9.97961C16.85 9.60961 16.48 8.83961 15.86 8.16961C15.25 7.51961 14.58 7.13961 14.02 7.13961C13.59 7.13961 13.25 6.78961 13.25 6.36961C13.25 5.94961 13.6 5.59961 14.02 5.59961C15.02 5.59961 16.07 6.13961 16.99 7.10961C17.85 8.01961 18.4 9.14961 18.4 9.96961C18.4 10.3996 18.05 10.7496 17.62 10.7496Z"
          fill={color}
        />
        <path
          d="M21.2298 10.75C20.7998 10.75 20.4598 10.4 20.4598 9.98C20.4598 6.43 17.5698 3.55 14.0298 3.55C13.5998 3.55 13.2598 3.2 13.2598 2.78C13.2598 2.36 13.5998 2 14.0198 2C18.4198 2 21.9998 5.58 21.9998 9.98C21.9998 10.4 21.6498 10.75 21.2298 10.75Z"
          fill={color}
        />
        <path
          d="M11.05 14.95L9.2 16.8C8.81 17.19 8.19 17.19 7.79 16.81C7.68 16.7 7.57 16.6 7.46 16.49C6.43 15.45 5.5 14.36 4.67 13.22C3.85 12.08 3.19 10.94 2.71 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C10.83 13.32 10.94 13.42 11.04 13.52C11.44 13.91 11.45 14.55 11.05 14.95Z"
          fill={color}
        />
        <path
          d="M21.9701 18.33C21.9701 18.61 21.9201 18.9 21.8201 19.18C21.7901 19.26 21.7601 19.34 21.7201 19.42C21.5501 19.78 21.3301 20.12 21.0401 20.44C20.5501 20.98 20.0101 21.37 19.4001 21.62C19.3901 21.62 19.3801 21.63 19.3701 21.63C18.7801 21.87 18.1401 22 17.4501 22C16.4301 22 15.3401 21.76 14.1901 21.27C13.0401 20.78 11.8901 20.12 10.7501 19.29C10.3601 19 9.9701 18.71 9.6001 18.4L12.8701 15.13C13.1501 15.34 13.4001 15.5 13.6101 15.61C13.6601 15.63 13.7201 15.66 13.7901 15.69C13.8701 15.72 13.9501 15.73 14.0401 15.73C14.2101 15.73 14.3401 15.67 14.4501 15.56L15.2101 14.81C15.4601 14.56 15.7001 14.37 15.9301 14.25C16.1601 14.11 16.3901 14.04 16.6401 14.04C16.8301 14.04 17.0301 14.08 17.2501 14.17C17.4701 14.26 17.7001 14.39 17.9501 14.56L21.2601 16.91C21.5201 17.09 21.7001 17.3 21.8101 17.55C21.9101 17.8 21.9701 18.05 21.9701 18.33Z"
          fill={color}
        />
      </svg>
    </Box>
  );
};

export const ContactPersonContent = ({info, change_screen, screenWidth}) => {
  const toast = useCustomToast();
  const [copiedContact, setCopiedContact] = useState('');

  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const ALL_CONTACT_PERSONS_QUERY = useQuery(['allContactPersons', info?.id], () =>
    getAllContactPersons(info?.id)
  );

  const ALL_CONTACT_PERSONS_DATA = ALL_CONTACT_PERSONS_QUERY?.data?.data?.results || [];
  const contact_people = !ALL_CONTACT_PERSONS_DATA?.length
    ? info?.contact_persons
    : ALL_CONTACT_PERSONS_DATA;

  const handleClick = number => {
    navigator.clipboard.writeText(number);
    setCopiedContact(number);
    setTimeout(() => {
      setCopiedContact(``);
    }, 2000);
  };

  return (
    <Box w={{base: `100%`}}>
      <Flex
        direction="row"
        justify="space-between"
        align={'center'}
        mb={{base: '25px', md: '25px'}}
        className="sub-text-regular"
      >
        <Text fontSize={'23px'} fontWeight={500} className="heading-text-regular">
          Contact Person
        </Text>
        <CloseIcon cursor="pointer" fontSize="17px" onClick={() => change_screen('options')} />
      </Flex>

      <Grid gap={{base: '10px', md: '10px'}} templateColumns={{base: `1fr`}}>
        {ALL_CONTACT_PERSONS_QUERY?.isLoading ? (
          <Center minH={`200px`} p={`16px`}>
            <ThreeDots darkBg boxSize={{base: '10px', md: '14px'}} />
          </Center>
        ) : contact_people?.length <= 0 ? (
          <EmptyState
            icon={<PhoneCallIcon />}
            textSize={12}
            // headerStyle={{textTransform: 'uppercase', fontWeight: 700, fontSize: '14px'}}
            height={{base: '100px', md: '200px'}}
            minH={{base: '100px', md: '200px'}}
            text={`There is no contact person for this listing`}
          />
        ) : (
          contact_people?.map(person => (
            <HStack
              as={'a'}
              href={isMobile ? `tel:${person?.phone_number}` : null}
              onClick={() => handleClick(person?.phone_number)}
              key={person?.id}
              spacing={'10px'}
              cursor="pointer"
              borderRadius={'4px'}
              bg={`#1C1C2A`}
              border={`1px solid`}
              borderColor={`#24242B`}
              w="full"
              p={{base: '8px 10px', md: '12px 8px'}}
              gap={`10px`}
              justify={`space-between`}
            >
              <HStack gap={'10px'}>
                <Center
                  boxSize={`44px`}
                  minW={`44px`}
                  bg={`rgba(255, 255, 255, 0.04)`}
                  borderRadius={`50%`}
                  position={`relative`}
                  fontSize={`10px`}
                  p={`2px`}
                >
                  <PhoneCallIcon />
                </Center>
                <Stack gap={'4px'}>
                  <Text
                    fontSize={'16px'}
                    fontWeight={600}
                    lineHeight={`140%`}
                    letterSpacing={`0.16px`}
                  >
                    {person?.name}
                  </Text>
                  <Text
                    color="#D4D4D8"
                    fontSize={'13px'}
                    fontWeight={400}
                    lineHeight={`150%`}
                    letterSpacing={`0.26px`}
                  >
                    {person?.phone_number}
                  </Text>
                </Stack>
              </HStack>
              {isMobile ? (
                <PhoneCallIcon />
              ) : (
                // <CopyIcon
                //   fontSize={`20px`}
                //   color={copiedContact === person?.phone_number && `custom_color.color_pop`}
                // />
                <Center
                  fontSize={`20px`}
                  color={
                    copiedContact === person?.phone_number && `custom_color.dark_background_pop`
                  }
                >
                  {copiedContact === person?.phone_number ? <IoCopy /> : <IoCopyOutline />}
                </Center>
              )}
            </HStack>
          ))
        )}
      </Grid>
      {false && (
        <HStack
          mt={`32px`}
          as={'a'}
          href={store_data?.whatsapp_url}
          target="_blank"
          rel="noreferrer noopener"
          spacing={'10px'}
          cursor="pointer"
          borderRadius={'4px'}
          bg={`#1C1C2A`}
          border={`1px solid`}
          borderColor={`#24242B`}
          w="full"
          p={{base: '8px 10px', md: '16px 18px'}}
          gap={`10px`}
          justify={`space-between`}
        >
          <HStack gap={'10px'}>
            <FaWhatsapp fontSize={`25px`} />
            <Text fontWeight={600}>Send a Whatsapp Message</Text>
          </HStack>
          <IoChevronForward fontSize={`16px`} />
        </HStack>
      )}
    </Box>
  );
};
