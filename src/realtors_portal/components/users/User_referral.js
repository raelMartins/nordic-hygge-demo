import {Box, Center, HStack, Image, Stack, Text, VStack} from '@chakra-ui/react';
import image_fallback from '/src/realtors_portal/images/avatar.jpeg';
import React from 'react';

import emptyIcon from '/src/realtors_portal/images/icons/emptyIcon.png';
import {IoChevronForward} from 'react-icons/io5';
import {useRouter} from 'next/router';

export const User_referral = ({refData}) => {
  const router = useRouter();
  return (
    <Stack pt={{base: `9px`, md: '24px'}} gap={`10px`}>
      <Text
        fontSize={`18px`}
        fontWeight={500}
        lineHeight={`22px`}
        color={`#191919`}
        display={{base: 'none', md: 'block'}}
      >
        Referred by
      </Text>
      <Box borderRadius="16px" w={`100%`} boxShadow={`0px 4px 8px 0px #00000005`} bg={`#fff`}>
        <HStack align={'center'} gap={{md: `10px`}}>
          <Text
            display={{base: 'flex', md: 'none'}}
            textAlign="start"
            color={'#919191'}
            m={`0px`}
            flex={`1`}
            p={{base: `10px 22px`}}
            fontSize={{base: `12px`, md: '20px'}}
            lineHeight={{base: `15px`, md: '25px'}}
          >
            {refData?.type == 'created' ? 'Created by' : 'Referred by'}{' '}
          </Text>
          <HStack
            gap={{base: `8px`, md: '14px'}}
            p={{base: '16px 25px', md: '20px 25px'}}
            align="center"
            h="full"
            flex={`2`}
          >
            <Center
              boxSize="68px"
              w={{base: `36px`, md: '68px'}}
              h={{base: `36px`, md: '68px'}}
              minW={{base: `36px`, md: '68px'}}
              minH={{base: `36px`, md: '68px'}}
              borderRadius={`50%`}
              overflow={`hidden`}
              pos={`relative`}
            >
              <Image
                alt=""
                src={refData?.avatar || refData?.image || image_fallback.src}
                minW={`100%`}
                minH={`100%`}
              />
            </Center>
            <Text
              fontWeight="600"
              fontSize={{base: `12px`, md: '20px'}}
              lineHeight={{base: `15px`, md: '25px'}}
              color="#191919"
              textTransform={`capitalize`}
            >
              {refData?.name || refData?.user || `unknown user`}
            </Text>
            <Center
              ml={`auto`}
              color={`#919191`}
              cursor={`pointer`}
              onClick={() => router.push(`/agents/users/customer_profile/${refData?.id}`)}
            >
              <IoChevronForward />
            </Center>
          </HStack>
        </HStack>
      </Box>
    </Stack>
  );
};
