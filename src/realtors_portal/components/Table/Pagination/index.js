import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Box, Flex, HStack, IconButton, Input, Text} from '@chakra-ui/react';
import React from 'react';

export default function CustomPagination({
  gotoPage,
  nextPage,
  pageIndex,
  pageCount,
  canNextPage,
  canPreviousPage,
  forbreakdown,
  previousPage,
  pageOptions,
  forTopTable,
  ...rest
}) {
  return (
    <HStack
      py={forbreakdown ? '10px' : 6}
      w="fit-content"
      borderColor="gray.200"
      borderTop="1.5px solid transparent"
      bg="#FFFFFF"
      {...rest}
    >
      <HStack align="center" w="fit-content" spacing="8px">
        {forTopTable ? null : (
          <Text m="0" alignSelf="center">
            Showing {pageIndex + 1} of {pageOptions.length}{' '}
          </Text>
        )}
        <IconButton
          _focus={{boxShadow: ''}}
          _hover={{backgroundColor: ''}}
          _active={{backgroundColor: ''}}
          color="gray.800"
          h="50px"
          w="50px"
          bg="#E4E4E4"
          fontSize="30px"
          borderRadius="full"
          icon={<ChevronLeftIcon />}
          isDisabled={!canPreviousPage}
          onClick={() => previousPage()}
        />
        <Input
          alignSelf="center"
          textAlign="center"
          border="1px solid"
          borderRadius="16px"
          borderColor="gray.100"
          isDisabled={forTopTable}
          _disabled={{borderColor: 'gray.200', background: '#ffffff'}}
          placeholder={forTopTable && pageIndex + 1}
          _placeholder={{color: '#191919'}}
          onChange={e => {
            let pageNumber = e.target.value ? Number(e.target.value) - 1 : pageIndex + 1;
            gotoPage(pageNumber);
          }}
          h="50px"
          w="44px"
        />
        <Flex alignItems="center" gap="8px">
          <IconButton
            _focus={{boxShadow: ''}}
            _hover={{backgroundColor: ''}}
            _active={{backgroundColor: ''}}
            color="gray.800"
            fontSize="30px"
            h="50px"
            w="50px"
            bg="#E4E4E4"
            borderRadius="full"
            icon={<ChevronRightIcon />}
            isDisabled={!canNextPage}
            onClick={() => nextPage()}
          />

          {forTopTable ? (
            <Text fontSize="16px" fontWeight="400">
              {pageOptions.length}
            </Text>
          ) : (
            ''
          )}
        </Flex>
      </HStack>
    </HStack>
  );
}