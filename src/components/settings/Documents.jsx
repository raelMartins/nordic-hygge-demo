import {Box, useToast} from '@chakra-ui/react';
import {UploadUserDocuments} from './UploadUserDocuments';
import {useMutation, useQuery} from 'react-query';
import {getSettingsData, postDoc} from '@/api/Settings';
import {useCustomToast} from '../CustomToast';

export const Documents = ({type = ''}) => {
  const toast = useCustomToast();

  const documentsQuery = useQuery(['getSettingsData', 'documents'], () =>
    // getSettingsData({documents: true})
    getSettingsData({profile: true})
  );
  const documentsData = documentsQuery?.data?.data?.data;
  const documentDetail =
    type === 'utility_bill'
      ? {
          document: documentsQuery?.data?.data?.data?.utility_bill,
          created_at: documentsQuery?.data?.data?.data?.utility_bill_updated_at,
        }
      : documentsQuery?.data?.data?.data?.documents?.[0];

  const toDateFormat = dateString => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const {mutate, isLoading} = useMutation(postDoc, {
    onSuccess: res => {
      documentsQuery.refetch();
    },
    onError: err => {
      return toast({
        description: `${err?.response?.data?.message || 'please check your network connection'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const handleDocument = data => {
    // type === `utility_bill`

    const obj =
      type === `utility_bill`
        ? {
            utility_bill: data.map(item => item.replace('data:', '')?.replace(/^.+,/, ''))?.[0],
            profile_details: true,
          }
        : {
            document_update: true,
            document: data.map(item => item.replace('data:', '').replace(/^.+,/, '')),
            profile_details: true, // document_type: "International Passport",
            // id_number: "3456789",
            // exp_date: "4567",
          };
    mutate(obj);
  };

  return (
    <UploadUserDocuments
      noNeedForType
      displayText={
        documentsQuery?.isLoading
          ? 'Loading...'
          : isLoading
          ? 'Uploading...'
          : documentDetail?.document
          ? `Uploaded: ${toDateFormat(documentDetail?.created_at)}`
          : 'Choose file to upload'
      }
      // isDisabled={(documentDetail?.document && documentDetail?.created_at)}
      isDisabled={documentsQuery?.isLoading || isLoading}
      type={type}
      handleDocument={handleDocument}
    />
  );
};
export default Documents;
