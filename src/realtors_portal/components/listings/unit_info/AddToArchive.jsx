import {HStack, Image, Text, useDisclosure, VStack, Button, Input} from '@chakra-ui/react';
import React, {useState} from 'react';
import {Popup} from '@/realtors_portal/ui-lib';
import lock from '@/realtors_portal/images/lock.png';
import successGif from '@/realtors_portal/images/animated_icons/check-icon-unscreen.gif';
import {useMutation} from 'react-query';
import {MdOutlineArchive} from 'react-icons/md';

import {addUnitsToArchive} from '@/realtors_portal/api/listings';

export const AddToArchive = ({bundleId}) => {
  const ArchiveInfo = useDisclosure();
  const ArchiveSuccess = useDisclosure();
  // const VerifyBlacklistOTP = useDisclosure();
  const [unitsToArchive, setUnitsToArchive] = useState(1);

  const mutation = useMutation(formData => addUnitsToArchive(bundleId, formData), {
    onSuccess: res => {
      ArchiveInfo.onClose();
      ArchiveSuccess.onOpen();
      setTimeout(() => {
        location.reload();
      }, 3000);
    },
    onError: err => {
      // <SwalError errMsgTitle={'Oops!'} errMsgDesc={`Adding Amenities to this project was unsuccessful `} />;
    },
  });

  const handleArchive = () => {
    unitsToArchive > 0
      ? mutation.mutate({
          status: true,
          amount: Number(unitsToArchive),
        })
      : alert('Number of units must be greater than zero');
  };
  return (
    <div>
      <HStack onClick={ArchiveInfo.onOpen} p="1.2em" spacing="20px">
        <MdOutlineArchive style={{color: 'tomato', fontSize: '34px'}} />
        <Text color="#4545FE" fontSize="20px" fontWeight={500}>
          {`Archive unit(s)`}
        </Text>
      </HStack>

      <Popup
        minW="455px"
        minH="392px"
        pt="35px"
        pb="35px"
        isOpen={ArchiveInfo.isOpen}
        onClose={ArchiveInfo.onClose}
        isCentered
      >
        <Image alt="" src={lock.src} boxSize="88px" mt="25px" mx="auto" />

        <Popup.Body mb={4}>
          <Text fontSize="24px" fontWeight={600}>
            Add to Archive
          </Text>
          <VStack w="full" px={0.2} pt={4}>
            <Text fontSize="14px" textAlign="center">
              You are about to take some of this unit off the online store
            </Text>
          </VStack>
          <VStack w="full" pt={6}>
            <Input
              mx={1}
              required
              type="text"
              name="Number of units to archive"
              onChange={e => setUnitsToArchive(e.target.value)}
              value={unitsToArchive}
              placeholder="Enter number of units to archive"
              _placeholder={{
                color: 'gray.500',
              }}
            />
          </VStack>
          <Button
            type="submit"
            onClick={handleArchive}
            variant="primary"
            mx="auto"
            w="321px"
            h="55px"
          >
            Proceed
          </Button>
        </Popup.Body>
      </Popup>

      {/* Archive success */}
      <Popup
        pt="45px"
        pb="15px"
        h="392px"
        isCentered
        minW="425px"
        isOpen={ArchiveSuccess.isOpen}
        onClose={ArchiveSuccess.onClose}
      >
        <Image alt="" src={successGif.src} w="108px" mb="25px" mx="auto" />
        <Text textAlign="center" fontSize="24px" fontWeight={600}>
          {`${unitsToArchive > 1 ? 'Units' : 'Unit'} added to Archive successfully`}
        </Text>
        <Popup.Body>
          <VStack w="full" px={0.2} maxW="320px">
            <Text fontSize="14px" textAlign="center">
              {`You have successfully added ${unitsToArchive} ${
                unitsToArchive > 1 ? 'units' : 'unit'
              } to your archive`}
            </Text>
          </VStack>
          <Button onClick={ArchiveSuccess.onClose} variant="primary" mx="auto" w="321px" h="55px">
            OK
          </Button>
        </Popup.Body>
      </Popup>
    </div>
  );
};

export default AddToArchive;
