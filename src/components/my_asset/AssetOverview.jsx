import {Flex, Stack, StackDivider, Text} from '@chakra-ui/react';

export const AssetOverview = ({arrayData}) => {
  return (
    <Stack
      w="full"
      gap={'0px'}
      mt="0px"
      border="1px solid"
      borderColor={'matador_border_color.100'}
      divider={<StackDivider borderColor={'matador_border_color.100'} />}
      p={{base: `8px 20px`}}
    >
      {[...arrayData]?.map(
        item =>
          !item?.hide && (
            <Flex
              key={item?.id}
              w="full"
              p="12px 0px"
              align={'center'}
              justify={'space-between'}
              display={item?.hide ? `none` : `flex`}
            >
              <Text color="matador_text.400" fontSize={'14px'} fontWeight={400}>
                {item?.label}
              </Text>
              {item?.component || (
                <Text color="text" fontSize={'16px'} fontWeight={600}>
                  {item?.value}
                </Text>
              )}
            </Flex>
          )
      )}
    </Stack>
  );
};
