import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons';
import {Flex, IconButton, Input} from '@chakra-ui/react';

export const RequestPagePagination = ({
  page = 1,
  limit = 10,
  setPage = el => {},
  total,
  list = [],
}) => {
  const previous_page = () => {
    if (page <= 1) {
      return;
    } else {
      setPage(page - 1);
    }
  };
  const next_page = () => {
    if (list.length < limit || page * limit > total) {
      return;
    } else {
      setPage(page + 1);
    }
  };
  return (
    <Flex p={'24px 16px'} gap={'19px'} justify="flex-end" align={'center'}>
      Showing {(page - 1) * limit + 1} -{' '}
      {total === 0 ? 10 : page * limit > total ? total : page * limit}{' '}
      {total && total > 0 ? <>of {total}</> : null}
      <Flex align={'center'} gap={'6px'}>
        <IconButton
          color="gray.800"
          bg="#E4E4E4"
          fontSize="30px"
          borderRadius="full"
          icon={<ChevronLeftIcon />}
          disabled={page <= 1}
          opacity={page <= 1 ? '.45' : '1'}
          cursor={page <= 1 ? 'not-allowed' : 'pointer'}
          onClick={previous_page}
        />

        <Input
          type="number"
          alignSelf="center"
          textAlign="center"
          border="1px solid #E4E4E4"
          borderRadius="full"
          borderColor="gray.200"
          value={page}
          disabled
          w={'30px'}
          padding={'0px'}
        />
        <IconButton
          color="gray.800"
          bg="#E4E4E4"
          fontSize="30px"
          opacity={list.length < limit || page * limit > total ? '.45' : '1'}
          cursor={list.length < limit || page * limit > total ? 'not-allowed' : 'pointer'}
          borderRadius="full"
          disabled={list.length < limit || page * limit > total}
          icon={<ChevronRightIcon />}
          onClick={next_page}
        />
      </Flex>
    </Flex>
  );
};
