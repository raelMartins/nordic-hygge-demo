import React, {useMemo, useState} from 'react';
import {useTable, useSortBy, usePagination} from 'react-table';
import {TriangleDownIcon, TriangleUpIcon} from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  TableContainer,
  VStack,
  Image,
  Center,
} from '@chakra-ui/react';
import CustomPagination from '../Pagination';
import {ImFilesEmpty} from 'react-icons/im';
import {Spinner} from '../loaders/AnimatedLoader';
import emptyImageIcon from '@/realtors_portal/images/icons/emptyIcon.svg';

export const MatadorCustomTable = ({DATA, COLUMNS, ...rest}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  const data = DATA && useMemo(() => DATA, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks, react-hooks/exhaustive-deps
  const columns = COLUMNS && useMemo(() => COLUMNS, []);
  const [selectedSortColumn, setSelectedSortColumn] = useState({
    id: '',
    desc: false,
  });
  const tableInstance =
    DATA &&
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
      usePagination
    );
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
  } = tableInstance;

  const {pageSize, pageIndex} = state;

  function handleSort(e) {
    let temp = Object.assign({}, selectedSortColumn);
    temp['id'] = e;
    setSelectedSortColumn(temp);
    setSortBy([temp]);
  }

  const typeOfSort = e => {
    let tempColumn;
    if (e == '0') {
      tempColumn = Object.assign({}, selectedSortColumn);
      tempColumn['desc'] = false;
      setSelectedSortColumn(tempColumn);
      setSortBy([tempColumn]);
    } else {
      tempColumn = Object.assign({}, selectedSortColumn);
      tempColumn['desc'] = true;
      setSelectedSortColumn(tempColumn);
      setSortBy([tempColumn]);
    }
  };

  return (
    <Box pb="1.5em" overflow="auto" borderRadius="xl" mx="auto">
      {getTableProps ? (
        <TableContainer
          mx="auto"
          align="center"
          maxW={'fit-content'}
          background={'#FFFFFF'}
          color={'gray.900'}
          borderRadius={'16px'}
          boxShadow={'0px 4px 8px rgba(0, 0, 0, 0.02)'}
          display={'table'}
          tableLayout={'fixed'}
          width={'max-content'}
          minW={{base: '90%', lg: '1444px'}}
          {...rest}
        >
          <Table {...getTableProps()} colorScheme="gray" bg="white">
            <Thead p="0" position="sticky" zIndex="1" top="0px" style={{overflow: 'scroll'}}>
              {page && page?.length > 0
                ? headerGroups?.map((headerGroup, indexKey) => (
                    <Tr p="0" key={indexKey} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, columnIndex) => (
                        <Th
                          p="2em .5em"
                          textAlign="center"
                          key={columnIndex}
                          color={'gray.800'}
                          {...column.getHeaderProps(column.getSortByToggleProps())}
                        >
                          {column.render('Header')}
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              <TriangleDownIcon />
                            ) : (
                              <TriangleUpIcon />
                            )
                          ) : (
                            ''
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))
                : null}
            </Thead>

            <Tbody w="full" p="1em" {...getTableBodyProps()}>
              {page && page?.length > 0 ? (
                page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <Tr key={index} className="tr1" {...row.getRowProps()}>
                      {row?.cells.map((cell, cellIndex) => {
                        return (
                          <Td
                            key={cellIndex}
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
              ) : (
                <VStack spacing={8} mx="auto" w="full" h="full" py="100px">
                  <ImFilesEmpty style={{height: '70px', width: '75px', color: '#4545FE'}} />
                  <Text w="full" textAlign="center" fontSize="1em" mx="auto">
                    {`Oops! you don't have any data yet...`}
                  </Text>
                </VStack>
              )}
            </Tbody>
          </Table>

          {page && page?.length > 0 && page?.length >= 10 && (
            <CustomPagination
              nextPage={nextPage}
              gotoPage={gotoPage}
              pageIndex={pageIndex}
              pageCount={pageCount}
              canNextPage={canNextPage}
              pageOptions={pageOptions}
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
            />
          )}
        </TableContainer>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export const EmptyState = ({description, title, emptyIcon, show_image = true, ...rest}) => {
  return (
    <Center
      flexDir={'column'}
      gap="4px"
      mx="auto"
      w="full"
      h="full"
      py="70px"
      textAlign={'center'}
      {...rest}
    >
      {emptyIcon ? (
        emptyIcon
      ) : show_image ? (
        <Image alt="empty table icon" src={emptyImageIcon.src} mb={'16px'} />
      ) : null}
      <Text
        fontSize={{base: '14px', md: '20px'}}
        color="#3D3D3D"
        fontWeight={{base: '600', md: '700'}}
      >
        {title || 'Nothing Found'}
      </Text>
      <Text fontSize={{base: '8px', md: '14px'}} fontWeight="400" color="#919191">
        {description || 'You do not have any data yet...'}
      </Text>
    </Center>
  );
};
