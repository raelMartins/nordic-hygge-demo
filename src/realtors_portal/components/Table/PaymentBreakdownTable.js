import React, {useMemo, useState} from 'react';
import {usePagination, useSortBy, useTable} from 'react-table';
import emptyIcon from '/src/realtors_portal/images/icons/emptyIcon.svg';
import CustomPagination from './Pagination';
import {
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

export const PaymentBreakdownTable = ({DATA, COLUMNS, headerSpace, ...rest}) => {
  const [pgSize, setPgSize] = useState(7);
  const data = DATA && useMemo(() => DATA, []);
  const columns = COLUMNS && useMemo(() => COLUMNS, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,

    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setSortBy,
    allColumns,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: pgSize,
      },
    },
    useSortBy,
    usePagination
  );
  const {pageSize, pageIndex} = state;

  return (
    <TableContainer
      //  minW={{ base: "90%", lg: "1444px" }}
      w="full"
    >
      <Table bg="#F5F5F5" borderRadius="16px" variant="unstyled">
        <Thead>
          {headerGroups?.map((headerGroup, indexKey) => (
            <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <Th
                  px="2em"
                  textAlign={headerSpace == 'evenly' ? 'left' : 'center'}
                  key={columnIndex}
                  color={'#606060'}
                  fontWeight={'400'}
                  fontSize={'16px'}
                  textTransform={'capitalize'}
                  {...column.getHeaderProps()}
                >
                  {column.hideHeader == true ? null : column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page && page?.length > 0
            ? page.map((row, indx) => {
                prepareRow(row);
                row;
                return (
                  <Tr key={indx} className="tr1" {...row.getRowProps()}>
                    {row?.cells.map((cell, index) => {
                      return (
                        <Td
                          maxW={cell?.column?.Header == 'index' ? '50px' : 'initial'}
                          key={index}
                          px="2em"
                          textAlign="center"
                          color={'gray.600'}
                          {...cell?.getCellProps()}
                        >
                          {cell?.render('Cell')}{' '}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })
            : null}
        </Tbody>
      </Table>
      {page && !page?.length && (
        <VStack
          h="150px"
          w="full"
          py="20px"
          pb="40px"
          bg="#F5F5F5"
          justifySelf="center"
          alignSelf="center"
          justify="center"
        >
          <Image mt="20px" alt="empty  icon" src={emptyIcon.src} />
          <Text fontSize="14px">No data available</Text>{' '}
        </VStack>
      )}

      {page && page?.length && data.length > 7 && (
        <HStack w="full" justify="end">
          <CustomPagination
            nextPage={nextPage}
            gotoPage={gotoPage}
            pageIndex={pageIndex}
            pageCount={pageCount}
            canNextPage={canNextPage}
            forbreakdown
            pageOptions={pageOptions}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
          />
        </HStack>
      )}
    </TableContainer>
  );
};

export default PaymentBreakdownTable;
