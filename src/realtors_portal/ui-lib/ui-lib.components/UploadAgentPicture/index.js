import {useDropzone} from 'react-dropzone';
import {useCallback} from 'react';
import {Flex, Center, HStack, Spinner, useToast} from '@chakra-ui/react';
import fallbackSrc from '@/realtors_portal/images/avatar.svg';
import {BiCamera} from 'react-icons/bi';
import Image from 'next/image';
import {encodeFileToBase64} from '@/realtors_portal/utils';
import useGetSession from '@/utils/hooks/getSession';
import {fetchAgentSettingsInfo, updateAgentSettingsInfo} from '@/realtors_portal/api/agents';
import {useMutation, useQuery} from 'react-query';
import isMobile from '@/utils/extras';

export const UploadAgentPicture = ({
  boxSize = `128px`,
  cameraSize = `30px`,
  showCamera = true,
  ...rest
}) => {
  const toast = useToast();
  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');
  const storeName = LoggedInAgent?.storeName;

  const SETTINGS_INFO = useQuery(
    ['agent_data'],

    () => fetchAgentSettingsInfo(agentToken, storeName)
  );

  const Agent_Data = SETTINGS_INFO.data?.data?.message?.user;

  const mutation_avatar = useMutation(
    formData => updateAgentSettingsInfo(formData, agentToken, storeName),
    {
      onSuccess: async res => {
        toast({
          title: 'Profile Photo Updated Successfully!',
          status: 'success',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
        return SETTINGS_INFO?.refetch();
      },
      onError: res => {
        return toast({
          title: res?.message === 'Network Error' ? 'Network Error' : 'Oops something went wrong',
          description: `${
            res?.response?.data?.message ??
            res?.response?.message ??
            res?.message ??
            'Something went wrong, we are working on resolving it.'
          }`,
          status: 'error',
          duration: 8000,
          isClosable: true,
          position: 'top-right',
        });
      },
    }
  );

  const onAvatarChange = async file => {
    mutation_avatar.mutate({
      avatar_update: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return;
  };

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    onDrop: useCallback(acceptedFiles => {
      acceptedFiles.forEach(file =>
        encodeFileToBase64(file)
          .then(res => {
            onAvatarChange([Object.assign({image: res}, {preview: URL.createObjectURL(file)})]);
          })
          .catch(err => {
            return err;
          })
      );
    }, []),
  });

  return (
    <Center
      minWidth={boxSize}
      boxSize={boxSize}
      borderRadius="full"
      overflow="hidden"
      position={`relative`}
      {...rest}
      {...getRootProps({className: 'dropzone'})}
    >
      <Image
        src={mutation_avatar.isLoading ? fallbackSrc.src : Agent_Data?.avatar || fallbackSrc.src}
        alt=""
        fill
        style={{objectFit: 'cover'}}
      />
      {showCamera && (
        <HStack
          justify={`center`}
          cursor={`pointer`}
          position={`absolute`}
          bottom={`0px`}
          left={`0px`}
          height={`40%`}
          width={`100%`}
          color={`#fff`}
          bg={`rgba(0, 0, 0, 0.80)`}
          p={`4px`}
          fontSize={cameraSize}
          // {...getRootProps({className: 'dropzone'})}
        >
          <BiCamera />
        </HStack>
      )}
      <input {...getInputProps()} />
      <Flex
        position={`absolute`}
        left={`0px`}
        top={`0px`}
        right={`0px`}
        bottom={`0px`}
        bg={`rgba(200,200, 200, 0.8)`}
        alignItems={`center`}
        justifyContent={`center`}
        zIndex={mutation_avatar.isLoading ? `1` : `-1`}
        transition={`.3s`}
        opacity={mutation_avatar.isLoading ? `1` : `0`}
      >
        <Spinner />
      </Flex>
    </Center>
  );
};
