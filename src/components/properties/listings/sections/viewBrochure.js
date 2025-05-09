import {Box, Link, Tooltip} from '@chakra-ui/react';
import {FaRegFolderOpen} from 'react-icons/fa';

const ViewBrochure = ({file, color, ...rest}) => {
  return (
    <Tooltip hasArrow label="View Brochure">
      <Box
        as={Link}
        href={file}
        target="_blank"
        rel="noreferrer noopener"
        cursor="pointer"
        borderRadius="4.444px"
        px="10px"
        py="8px"
        border="0.9px solid"
        // borderColor={'matador_text.200'}  //confirm style change from Ahmed before deleting
        borderColor={'matador_border_color.100'}
        boxShadow={`0px 0.889px 1.778px 0px rgba(16, 24, 40, 0.05)`}
        color="matador_text.200"
        fontSize={`28px`}
        // bg={`transparent !important`}  //confirm style change from Ahmed before deleting
        bg={`matador_background.200 !important`}
        {...rest}
      >
        <FaRegFolderOpen />
      </Box>
    </Tooltip>
  );
};

export default ViewBrochure;
