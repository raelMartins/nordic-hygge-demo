import {Flex, HStack, Text, useClipboard, Button, Input, Stack, Center} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {CreateToast, ResponsivePopup, ResponsivePopupContent} from '@/realtors_portal/ui-lib';
import copyIcon from '@/realtors_portal/images/icons/copy.svg';
import {ellipsize} from '@/realtors_portal/utils/ellipsize';
import useGetSession from '@/utils/hooks/getSession';
import {ShareLinkIcon} from './AgentLayout/assets/NavbarSvgs';
import {IoCopy, IoCopyOutline} from 'react-icons/io5';

export const ShareAgentLink = ({disclosure, children}) => {
  const toaster = CreateToast();
  const {sessionData: agentInfo} = useGetSession('a_details');

  const agentId = agentInfo?.agent_id;

  const getDomainOnly = () => {
    return window.location.origin;
  };

  const baseUrl = getDomainOnly();

  const link = `${baseUrl}/auth/login?ref_id=${agentId}`;
  const linkToCopy = `${baseUrl}/auth/login?ref_id=${agentId}`;

  const {hasCopied, onCopy} = useClipboard(linkToCopy);

  useEffect(() => {
    if (hasCopied === true) {
      disclosure?.onClose();
      toaster('Link copied!', {
        position: 'top-right',
      });
    }
  }, [hasCopied]);

  return (
    <ResponsivePopup
      h="fit-content"
      minW={{base: `200px`, md: '440px'}}
      isOpen={disclosure?.isOpen}
      onClose={disclosure?.onClose}
      placement={`bottom`}
      // mt={16}
    >
      <ResponsivePopupContent
        borderRadius={{base: `12px`, lg: '16px'}}
        background="#FFF"
        p="24px 20px"
      >
        <Stack gap={`16px`}>
          <HStack>
            <img src={copyIcon.src} />
            <Text fontSize={'20px'} fontWeight="500" lineHeight="41px">
              Share link
            </Text>
          </HStack>
          <Flex
            position="relative"
            align={`center`}
            justify={`space-between`}
            borderRadius={`4px`}
            border={`1px solid #E4E4E7`}
            background={`#FAFAFA`}
            gap="10px"
            p={`8px 12px`}
            h={`max-content`}
          >
            <Input
              bg="transparent"
              cursor="not-allowed"
              value={ellipsize(link, 30)}
              isReadOnly
              w="100%"
              border="none"
              _focus={{
                outline: 'none',
                boxShadow: `none`,
              }}
              _focusVisible={{
                outline: 'none',
                boxShadow: `none`,
              }}
              margin="0px"
            />
            <Center
              fontSize={`24px`}
              zIndex={`3`}
              onClick={onCopy}
              cursor={hasCopied ? `not-allowed` : `pointer`}
            >
              {hasCopied ? <IoCopy /> : <IoCopyOutline />}
            </Center>
          </Flex>
        </Stack>
      </ResponsivePopupContent>
    </ResponsivePopup>
  );
};
