import React, {useEffect, useMemo, useState} from 'react';
import {useTable, useSortBy, usePagination} from 'react-table';
import {
  Table,
  Tbody,
  Image,
  Tr,
  Td,
  Text,
  HStack,
  TableContainer,
  SlideFade,
} from '@chakra-ui/react';
import thinArrow from '/src/images/icons/thinArrow.svg';
import {css, keyframes} from '@emotion/react';

const AssetsTransactionTable = ({
  DATA,
  shouldScroll,
  scrollToTop,
  isFetchingNextPage,
  COLUMNS,
  forData,
  isError,
  error,
  pageSize,
  forColumn,
}) => {
  const data = useMemo(() => DATA, forData ? [...forData] : []);

  const columns = useMemo(() => COLUMNS, forColumn ? [...forColumn] : []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {pageSize},
    },
    useSortBy,
    usePagination
  );

  const {getTableProps, state, getTableBodyProps, setPageSize, prepareRow, page} = tableInstance;

  useEffect(() => {
    setPageSize(pageSize);
  }, [pageSize]);

  if (isError) {
    return (
      <Text fontSize={{base: '12px', md: '16px'}} textAlign="center" fontWeight="400">
        {error?.response?.status === 500
          ? "Apologies for the inconvenience. We're working on it. Please try again later."
          : error?.response?.status === 401
          ? 'Authentication Timeout: For security reasons, your session has timed out. Please log in again to continue.'
          : error?.response?.data?.message ??
            error?.response?.message ??
            error?.message ??
            'Something went wrong'}
      </Text>
    );
  } else if (DATA.length < 1) {
    return (
      <Text fontSize="16px" textAlign="center" fontWeight="400">
        No transactions have occurred.
      </Text>
    );
  }

  return getTableProps ? (
    <TableContainer px="5px" position="sticky" py="0px">
      {isError ? null : (
        <Table mb="0px">
          <Tbody {...getTableBodyProps()}>
            {page && page?.length > 0
              ? page?.map((row, indx) => {
                  prepareRow(row);

                  return (
                    <Tr
                      position="relative"
                      key={indx}
                      borderBottom="8px solid transparent"
                      h="fit-content"
                      borderBottomWidth={{base: '10.68px', xl: '15.66px'}}
                    >
                      {row?.cells.map((cell, idx) => {
                        return (
                          <Td key={idx} {...cell?.getCellProps()} p="0px">
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
      )}

      <SlideFade in={isFetchingNextPage}>
        <Text
          color="matador_text.200"
          fontSize={{base: '10px', xl: '12px'}}
          fontWeight="400"
          css={isFetchingNextPage ? loadingAnimation : null}
          textAlign="center"
        >
          Just a sec, loading transactions ...
        </Text>
      </SlideFade>
      <ScrollToTop shouldScroll={shouldScroll} scrollToTop={scrollToTop} />
    </TableContainer>
  ) : null;
};

export default AssetsTransactionTable;

const colorChange = keyframes`
  0% {
    color: #191919; /* Start color */
  }
  100% {
    color: #3d3d3d; /* End color */
  }
`;

const loadingAnimation = css`
  animation: ${colorChange} 1s infinite alternate; /* Apply animation only when loading */
`;

const ScrollToTop = ({shouldScroll, scrollToTop}) => {
  return (
    <HStack
      justify="center"
      opacity={shouldScroll === 'up' ? 1 : 0}
      visibility={shouldScroll === 'up' ? 'visible' : 'hidden'}
      transition="ease-in-out 0.3s"
      transform={`translateY(${shouldScroll === 'up' ? '0px' : '20px'}) scale(${
        shouldScroll === 'up' ? 1 : 0.8
      })`}
      position="fixed"
      bottom="10"
      right={{base: '3%', md: '10'}}
      align="center"
      p="5px"
      role="button"
      onClick={scrollToTop}
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.6)"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)"
    >
      <Image src={thinArrow.src} boxSize="20px" transform="rotate(-90deg)" alt="right arrow" />
    </HStack>
  );
};
