import {RButton} from '@/realtors_portal/ui-lib';
import {Center} from '@chakra-ui/react';
import {CSVLink} from 'react-csv';
import {RiDownloadCloudLine} from 'react-icons/ri';

export const DownloadCSV = ({filename, handleData}) => {
  return (
    <CSVLink filename={filename || 'Realtors Portal CSV Sheet'} data={handleData}>
      <RButton
        variation={`tertiary`}
        w="max-content"
        h={`max-content`}
        color="#4545FE"
        borderRadius="8px"
        bg="#ffffff"
        fontWeight="400"
        fontSize="14px"
        lineHeight="18px"
        p={`10px`}
      >
        <Center boxSize={`18px`} fontSize={`18px`} position={`relative`}>
          <RiDownloadCloudLine />
        </Center>
      </RButton>
    </CSVLink>
  );
};
