import {Text, Flex, Modal, ModalOverlay, ModalContent, useToast, VStack} from '@chakra-ui/react';
import {useMutation} from 'react-query';
import {deleteSavedFilters} from '../../../api/listing';
import Attribute from './attribute';
import {themeStyles} from '../../../theme';
import {Button, Spinner} from '../../../ui-lib/ui-lib.components';
import EmptyState from '../../../components/appState/empty-state';
import {priceString} from '../../../utils/priceString';
import {CloseIcon} from '@chakra-ui/icons';
import {useCustomToast} from '@/components/CustomToast';

const SavedFilters = ({
  filterDataExtracted,
  filtersLoading,
  refetch,
  isOpen,
  onClose,
  applySelectedFilter,
}) => {
  const toast = useCustomToast();

  const deletesMutation = useMutation(deleteSavedFilters, {
    onSuccess: async res => {
      toast({
        description: 'All filter successfully removed',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      return await refetch();
    },
    onError: err => {
      return toast({
        title: 'An Error Occured!.',
        description: "We couldn't delete filter",
        status: 'warning',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteMutation = useMutation(id => deleteSavedFilters(id), {
    onSuccess: async res => {
      toast({
        description: 'Filter successfully removed',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      return await refetch();
    },
    onError: err => {
      return toast({
        title: 'An Error Occured!.',
        description: "We couldn't delete filter",
        status: 'warning',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const customScrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '4px',
      borderRadius: '16px',
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '16px',
      WebkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '16px',
      backgroundColor: '#000',
      // outline: "1px solid slategrey", // You can include this line if needed
    },
  };

  const formatPrice = value => priceString(value, {notation: 'compact', compactDisplay: 'short'});

  return (
    <Modal autoFocus={false} isOpen={isOpen} onClose={onClose} isCentered blockScrollOnMount>
      <ModalOverlay />
      <ModalContent
        px={{base: '20px', md: '40px'}}
        bg="card_bg"
        py="35px"
        minW={{base: 'auto', md: '900px'}}
        minH="520px"
        borderRadius={{base: '10px', md: '2px'}}
      >
        {filtersLoading ? (
          <Spinner />
        ) : filterDataExtracted.length ? (
          <>
            <Flex w="full" justify="space-between" align="center">
              <Text fontSize={{base: '15px', md: '28px'}} fontWeight={500} color="text">
                Saved Filters
              </Text>
              <CloseIcon color="text" cursor={'pointer'} onClick={onClose} fontSize={'18px'} />
            </Flex>

            <VStack
              spacing="25px"
              height="45vh"
              css={customScrollbarStyles}
              overflowY="auto"
              mt={{base: '10px', md: '15px'}}
              px="5px"
            >
              {filterDataExtracted.map((filter, i) => (
                <Flex
                  gap={{base: '20px', md: '50px'}}
                  key={i}
                  borderRadius={'2px'}
                  justify={'space-between'}
                  px={{base: '10px', md: '20px'}}
                  py={{base: '10px', md: '15px'}}
                  border={'0.5px solid #747474'}
                  w={'100%'}
                  align={'center'}
                  cursor="pointer"
                >
                  <Flex
                    w="80%"
                    justify={{base: 'flex-start', md: 'space-between'}}
                    onClick={() => applySelectedFilter(filter.filter_data, filter.id)}
                    flexWrap={'wrap'}
                    alignItems={'center'}
                    rowGap={{base: '20px', md: '10px'}}
                  >
                    <Attribute
                      w={{base: '50%', md: 'auto'}}
                      value={filter?.search || 'Any location'}
                      lable={'Location'}
                    />
                    <Attribute
                      w={{base: '50%', md: 'auto'}}
                      value={`${formatPrice(Number(filter?.price_from))} - ${formatPrice(
                        Number(filter?.price_to)
                      )}`}
                      lable={'Price'}
                    />
                    <Attribute
                      w={{base: '50%', md: 'auto'}}
                      value={filter?.status}
                      lable={'Project Status'}
                    />
                    <Attribute
                      w={{base: '50%', md: 'auto'}}
                      value={filter?.building_type}
                      lable={'Unit Type'}
                    />
                    {/* <Attribute
                      w={{ base: '50%', md: 'auto' }}
                      value={filter?.payment_plan_is_available}
                      lable={"Payment Plan"}
                    />
                    <Attribute
                      w={{ base: '50%', md: 'auto' }}
                      value={`${filter?.bedroom_from} - ${filter?.bedroom_to}`}
                      lable={"Bedroom"}
                    /> */}
                  </Flex>
                  <Text
                    opacity={deleteMutation?.isLoading ? '0.5' : '1'}
                    onClick={() => deleteMutation.mutate(filter?.id)}
                    borderBottom={'1px solid'}
                    borderColor="custom_color.color !important"
                    color="custom_color.color"
                    bg="custom_color.background"
                    {...themeStyles.textStyles.sl6}
                  >
                    Remove
                  </Text>
                </Flex>
              ))}
            </VStack>

            <Button
              isLoading={deletesMutation.isLoading}
              mt={'40px'}
              mx="auto"
              w={{base: 'full', md: 'auto'}}
              onClick={() => deletesMutation.mutate()}
              color="custom_color.contrast"
              bg="custom_color.color"
              h={'63px'}
              borderRadius={'2px'}
            >
              Remove all Filters
            </Button>
          </>
        ) : (
          <EmptyState height="250px" text="No saved filter yet" />
        )}
      </ModalContent>
    </Modal>
  );
};

export default SavedFilters;
