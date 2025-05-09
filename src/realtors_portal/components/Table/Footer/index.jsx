import {
  Button,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react';
import CustomPagination from '../Pagination';
import collapsedIcon from '/src/realtors_portal/images/icons/collapsed-icon.svg';
import collapsedDarkIcon from '/src/realtors_portal/images/icons/collapsed-icon-dark.svg';
import expandIcon from '/src/realtors_portal/images/icons/expand-icon.svg';
import expandDarkIcon from '/src/realtors_portal/images/icons/expand-icon-dark.svg';

const TableFooter = ({
  dontExpand,
  isCollapsed,
  isManageAgentEmpty,
  display,
  handleExpand,
  page,
  nextPage,
  previousPage,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageOptions,
  gotoPage,
  pageCount,
}) => {
  const [isNotMobile] = useMediaQuery('(min-width: 768px)');

  return (
    <HStack
      display={display}
      w="full"
      justify={dontExpand || isNotMobile ? 'end' : 'space-between'}
      gap="21px"
      px={4}
    >
      {isManageAgentEmpty && !page && !page?.length ? null : (
        <Stack direction={{base: 'row-reverse', md: 'row'}} spacing="22px" align={'center'}>
          <CustomPagination
            nextPage={nextPage}
            gotoPage={gotoPage}
            pageIndex={pageIndex}
            pageCount={pageCount}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            forTopTable={isNotMobile ? false : true}
          />

          {!dontExpand && (!isCollapsed || !isNotMobile) ? (
            <Button bg={{md: '#4545FE'}} borderRadius="12px" onClick={() => handleExpand('expand')}>
              <HStack spacing="4px">
                {isCollapsed ? (
                  <Image
                    src={isNotMobile ? collapsedIcon.src : collapsedDarkIcon.src}
                    alt="collapse Icon"
                    boxSize="18px"
                  />
                ) : (
                  <Image
                    src={isNotMobile ? expandIcon.src : expandDarkIcon.src}
                    alt="expand Icon"
                    boxSize="18px"
                  />
                )}
                <Text
                  className="collapseforlistingsMain"
                  as="span"
                  color={{base: '#4545FE', md: '#ffffff'}}
                  fontSize="16px"
                  fontWeight="400"
                >
                  {isCollapsed ? 'Collapse List' : ' Expand List'}
                </Text>
              </HStack>
            </Button>
          ) : null}
        </Stack>
      )}
    </HStack>
  );
};

export default TableFooter;
