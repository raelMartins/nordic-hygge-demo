import {useDropzone} from 'react-dropzone';
import {useCallback} from 'react';
import {Flex, Center, HStack, Spinner, useToast} from '@chakra-ui/react';
import fallbackSrc from '@/images/avatar.svg';
import {BiCamera} from 'react-icons/bi';
import Image from 'next/image';
import {encodeFileToBase64} from '@/utils';
import {useMutation, useQuery} from 'react-query';
import {getSettingsData, updateSettings} from '@/api/Settings';
import {useCustomToast} from '@/components/CustomToast';

export const UploadProfilePicture = ({
  boxSize = `160px`,
  cameraSize = `30px`,
  showCamera = true,
  ...rest
}) => {
  const toast = useCustomToast();

  const SETTINGS_INFO = useQuery(
    ['user_data'],

    () => getSettingsData({profile: true})
  );

  const User_Data = SETTINGS_INFO?.data?.data?.data;

  const mutation_avatar = useMutation(formData => updateSettings(formData), {
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
  });

  const onAvatarChange = async file => {
    mutation_avatar.mutate({
      profile_avatar: true,
      avatar: file[0]?.image.replace('data:', '').replace(/^.+,/, ''),
    });
    return SETTINGS_INFO.refetch();
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
    >
      <Image
        src={mutation_avatar.isLoading ? fallbackSrc.src : User_Data?.avatar || fallbackSrc.src}
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
          {...getRootProps({className: 'dropzone'})}
        >
          <BiCamera />
          <input {...getInputProps()} />
        </HStack>
      )}
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
