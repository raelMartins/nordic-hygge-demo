import {storeDetails} from '@/api/auth';
import {Box, Center, Tooltip} from '@chakra-ui/react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {IoLogoWhatsapp} from 'react-icons/io';
import {useQuery} from 'react-query';

export const WhatsappSupport = ({}) => {
  const router = useRouter();
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const store_data = STOREINFO.data?.data?.data;

  const whatsapp_url = store_data?.whatsapp_url;

  const [showIcon, setShowIcon] = useState(false);
  useEffect(() => {
    const element = document?.getElementById('scroll_down_icon');

    const observer = new IntersectionObserver(([entry]) => setShowIcon(!entry.isIntersecting));
    if (!element) {
      setShowIcon(true);
    } else {
      observer.observe(element);
    }
    return () => observer.disconnect();
  });
  return (
    whatsapp_url && (
      <Box
        position={`fixed`}
        bottom={`200px`}
        right={`35px`}
        zIndex={`2`}
        display={{base: `none`, lg: `block`}}
        visibility={showIcon ? `visible` : `hidden`}
        transition={`.3s`}
      >
        <Tooltip
          hasArrow
          label="Hello, How can we help you today?"
          placement="left"
          bg="#fff"
          color={`#606060`}
          padding={`12px`}
        >
          <Center
            as={Link}
            href={whatsapp_url}
            target="_blank"
            rel="noopener noreferrer"
            cursor={`pointer`}
            bg={`#191919`}
            boxSize={`56px`}
            borderRadius={`50%`}
            color={`#fff`}
          >
            <IoLogoWhatsapp fontSize={`24px`} />
          </Center>
        </Tooltip>
      </Box>
    )
  );
};
