import isMobile from '@/utils/extras';
import {CopyIcon, PhoneIcon} from '@chakra-ui/icons';
import {Center, HStack, Image, Stack, Text} from '@chakra-ui/react';
import {useState} from 'react';
import {IoCopy, IoCopyOutline} from 'react-icons/io5';

export const ContactComponent = ({contactObj}) => {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    if (isMobile) {
      location.assign(`tel:${contactObj.phone_number}`);
    } else {
      navigator?.clipboard?.writeText(contactObj.phone_number);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  };
  return (
    <HStack
      padding="14px 22px 13px 25.074px"
      bg="#F9FAFB"
      justify="space-between"
      border="0.5px solid #E4E4E4"
      borderRadius={'4px'}
      w={'full'}
      onClick={handleClick}
      cursor={`pointer`}
    >
      <HStack spacing="15px">
        <Image
          alt="profile image icon"
          borderRadius="full"
          boxSize="38.5px"
          src={contactObj.img || contactObj.image}
          objectFit="cover"
        />
        <Stack spacing="10px" textTransform={'capitalize'}>
          <Text fontSize="14px" fontWeight="500" color="#191919" lineHeight={'18px'}>
            {contactObj.name}
          </Text>
          <Text fontSize="12px" fontWeight="400" color="#606060" lineHeight={'15px'}>
            {contactObj.phone_number}
          </Text>
        </Stack>
      </HStack>
      <Center>{isMobile ? <PhoneIcon /> : copied ? <IoCopy /> : <IoCopyOutline />}</Center>
    </HStack>
  );
};

export default ContactComponent;
