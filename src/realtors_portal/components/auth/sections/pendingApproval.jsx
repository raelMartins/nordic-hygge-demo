import React from 'react';
import {Flex, Image, Text, Box, Stack, Center} from '@chakra-ui/react';
import pending_approval from '@/images/approval_pending.gif';

const PendingApproval = () => {
  return (
    <Box
      maxW="440px"
      w={{base: `100%`, lg: `440px`}}
      bg="matador_background.200"
      // maxH={'358px'}
      px={{base: `24px`, md: '40px'}}
      py="32px"
      borderRadius={5}
      boxShadow={'0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)'}
    >
      <Flex
        w="full"
        h="full"
        direction="column"
        justify={'center'}
        align="center"
        textAlign={'center'}
        gap={{base: `24px`, md: `12px`}}
      >
        <Center boxSize={{base: `60px`}} minW={{base: `60px`}} overflow={`hidden`}>
          <Image alt="next_image" src={pending_approval.src} />
        </Center>
        <Stack gap={`7px`}>
          <Text
            fontSize={'23px'}
            fontWeight={700}
            color="text"
            className="heading-text-regular"
            textAlign={`center`}
            lineHeight={`140%`}
            maxW={`80%`}
            mx={`auto`}
          >
            Approval Pending
          </Text>
          <Text
            textAlign={'center'}
            fontSize={'12px'}
            mt="0px !important"
            fontWeight={`500`}
            color="matador_text.300"
            lineHeight={`130%`}
          >
            Thank you for registering with us! We&apos;ve received your application and our team is
            currently reviewing it. We&apos;ll be in touch soon with an update.
          </Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default PendingApproval;
