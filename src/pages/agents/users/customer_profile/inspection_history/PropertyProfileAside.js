import {Heading, HStack, Button, Image, Text, VStack} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import React from 'react';

// import { Button } from "/src/ui-lib";

export const PropertyProfileAside = ({data}) => {
  const router = useRouter();

  return (
    <VStack
      borderRadius="16px"
      mt="70px"
      bg="#FFFFFF"
      //   w="371px"
      px="28px"
      pt="28px"
      pb="35px"
    >
      <HStack w="355px">
        <HStack w="full" align="center">
          <Image alt="" boxSize="48px" objectFit="cover" src={data?.avatar} borderRadius="50%" />
          <Text textAlign="start" as="span" maxW="100px" fontSize="16px" fontWeight="600">
            {data?.first_name ?? 'N/a'} {data?.last_name ?? 'N/a'}
          </Text>
        </HStack>
        <Button
          w="113px"
          bg="#4545FE"
          h="48px"
          color="#ffffff"
          fontSize="16px"
          fontWeight="400"
          borderRadius="12px"
          onClick={() => router.push(`/agents/users/customer_profile/${data.id}`)}
        >
          Profile
        </Button>
      </HStack>
      {/* <VStack w="full" m spacing="16px">
        <Image src="" w="314px" h="320px" borderRadius="24px" />
        <VStack alignSelf="start" align="start">
          <Heading as="h1" fontSize="32px" fontWeight="600">
            Astrid 2.0
          </Heading>
          <Text as="span" fontSize="14px" color="#606060" fontWeight="400">
            Under construction
          </Text>
        </VStack>
      </VStack> */}
    </VStack>
  );
};

export default PropertyProfileAside;
