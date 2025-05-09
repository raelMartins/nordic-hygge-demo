import {HStack, Image, Stack, Text, Button, Box} from '@chakra-ui/react';
import {EmptyState} from '/src/realtors_portal/components/common/Table';
import {Container2} from '/src/realtors_portal/components/common/containers';
import rightArrow from '/src/realtors_portal/images/icons/angledArrowRight.svg';

export const NoInspectionRequest = ({drawerDisclosure, isClosed}) => {
  return (
    <Stack>
      <HStack>
        <Text fontSize="16px" color="#191919" fontWeight="500">
          Inspection
        </Text>
        {/* {isClosed ? (
          <Stack direction={{base: 'column', md: 'row'}} w="full" justify="flex-end">
            <Button
              onClick={drawerDisclosure.onOpen}
              h="fit-content"
              w="fit-content"
              p="0px"
              _hover={{bg: 'transparent'}}
              _active={{bg: 'transparent'}}
              _focus={{bg: 'transparent'}}
              fontSize="14px"
              color="#191919"
              fontWeight="600"
              variant="ghost"
              iconSpacing="none"
              rightIcon={<Image src={rightArrow.src} alt="doc icon" />}
            >
              View Inspection History
            </Button>
          </Stack>
        ) : null} */}
      </HStack>

      <EmptyState
        description="No upcoming inspection"
        p={{base: '24px', md: '52px'}}
        bg="#fff"
        borderRadius="9px"
      />
    </Stack>
  );
};
