import {storeDetails, storeDomainCheck} from '@/api/auth';
import {fetchProjectsWithFilters} from '@/api/listing';
import {Box, Divider, Flex, Grid, HStack, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import {FaInstagram, FaLinkedin, FaWhatsapp} from 'react-icons/fa';
import {FaFacebook, FaXTwitter} from 'react-icons/fa6';
import {useQuery} from 'react-query';

export const CopyrightSVG = () => {
  return (
    <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5693_22576)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27.3462 30.172C26.3077 31.2111 25.022 32.0523 23.6374 32.646C22.2033 33.2398 20.6703 33.5367 18.989 33.5367C17.3077 33.5367 15.7747 33.2398 14.3407 32.646C12.9066 32.0523 11.6703 31.2606 10.5824 30.172C9.54396 29.1329 8.7033 27.8959 8.10989 26.461C7.51649 25.0755 7.21978 23.5911 7.21978 22.0077H10.0385C10.0879 22.5025 10.1868 22.9479 10.3352 23.3932C10.533 23.888 10.8791 24.3333 11.2253 24.7292C11.6209 25.125 12.0659 25.4219 12.5604 25.6198C13.0549 25.8177 13.6484 25.9662 14.2418 25.9662C14.8352 25.9662 15.4286 25.8672 15.9231 25.6198C16.4176 25.4219 16.9121 25.125 17.2582 24.7292C17.6538 24.3333 17.9506 23.888 18.1484 23.3932C18.2967 23.0468 18.3956 22.7005 18.4451 22.3046H19.3352C19.3846 22.7005 19.4835 23.0468 19.6319 23.3932C19.8297 23.888 20.1758 24.3333 20.522 24.7292C20.9176 25.125 21.3626 25.4219 21.8571 25.6198C22.3517 25.8177 22.9451 25.9662 23.5385 25.9662C24.1319 25.9662 24.7253 25.8672 25.2198 25.6198C25.7143 25.4219 26.2088 25.125 26.5549 24.7292C26.9506 24.3333 27.2473 23.888 27.4451 23.3932C27.6429 22.9479 27.7418 22.5025 27.7418 22.0077H30.5604C30.5604 23.5911 30.2637 25.0755 29.6703 26.461C29.2253 27.8959 28.4341 29.1329 27.3462 30.172ZM16.8132 21.7603C16.8132 22.1067 16.7637 22.4531 16.6154 22.7499C16.467 23.0468 16.3187 23.2942 16.0714 23.5416C15.8242 23.789 15.5769 23.9375 15.2802 24.0859C14.9835 24.2344 14.6374 24.2838 14.2912 24.2838C13.9451 24.2838 13.5989 24.2344 13.3022 24.0859C13.0055 23.9375 12.7088 23.789 12.511 23.5416C12.2637 23.2942 12.1154 23.0468 11.967 22.7499C11.8187 22.4531 11.7692 22.1067 11.7692 21.7603C11.7692 21.414 11.8187 21.0676 11.967 20.7707C12.1154 20.4738 12.2637 20.2264 12.511 19.979C12.7582 19.7316 13.0055 19.5832 13.3022 19.4348C13.5989 19.2863 13.9451 19.2368 14.2912 19.2368C14.6374 19.2368 14.9835 19.2863 15.2802 19.4348C15.5769 19.5832 15.8736 19.7316 16.0714 19.979C16.3187 20.2264 16.467 20.4738 16.6154 20.7707C16.7637 21.0676 16.8132 21.414 16.8132 21.7603ZM26.2088 21.7603C26.2088 22.1067 26.1593 22.4531 26.011 22.7499C25.8626 23.0468 25.7143 23.2942 25.467 23.5416C25.2198 23.789 24.9725 23.9375 24.6758 24.0859C24.3791 24.2344 24.033 24.2838 23.6868 24.2838C23.3407 24.2838 22.9945 24.2344 22.6978 24.0859C22.4011 23.9375 22.1044 23.789 21.9066 23.5416C21.6593 23.2942 21.511 23.0468 21.3626 22.7499C21.2143 22.4531 21.1648 22.1067 21.1648 21.7603C21.1648 21.414 21.2143 21.0676 21.3626 20.7707C21.511 20.4738 21.6593 20.2264 21.9066 19.979C22.1538 19.7316 22.4011 19.5832 22.6978 19.4348C22.9945 19.2863 23.3407 19.2368 23.6868 19.2368C24.033 19.2368 24.3791 19.2863 24.6758 19.4348C24.9725 19.5832 25.2692 19.7316 25.467 19.979C25.7143 20.2264 25.8626 20.4738 26.011 20.7707C26.1099 21.0676 26.2088 21.414 26.2088 21.7603ZM8.25824 16.9607C10.2857 16.3175 12.9066 15.4763 12.9066 15.4763C18.7418 13.5961 19.533 11.4189 19.533 11.4189C19.533 11.4189 20.7692 13.5961 25.022 15.0805C25.022 15.0805 27.3462 15.8722 29.5714 16.6638C29.6703 16.8618 29.8187 17.1092 29.8681 17.3071C30.2637 18.1977 30.511 19.1873 30.6593 20.177H27.6429V20.1275C27.4451 19.6327 27.0989 19.1874 26.7527 18.7915C26.3571 18.3957 25.9121 18.0988 25.4176 17.9009C24.9231 17.7029 24.3297 17.604 23.7363 17.604C23.1429 17.604 22.5495 17.7029 22.0549 17.9009C21.5604 18.0988 21.0659 18.3957 20.7198 18.7915C20.3242 19.1874 20.0275 19.6327 19.8297 20.1275C19.7802 20.2759 19.6813 20.4738 19.6319 20.6223H18.4945C18.4451 20.4738 18.3956 20.2759 18.2967 20.1275C18.0989 19.6327 17.7527 19.1874 17.4066 18.7915C17.011 18.3957 16.5659 18.0988 16.0714 17.9009C15.5275 17.7029 14.9835 17.604 14.3901 17.604C13.7967 17.604 13.2033 17.7029 12.7088 17.9009C12.2143 18.0988 11.7198 18.3957 11.3736 18.7915C10.978 19.1874 10.6813 19.6327 10.4835 20.1275V20.177H7.46704C7.61539 19.1873 7.86264 18.2472 8.25824 17.3071C8.15934 17.1586 8.20879 17.0597 8.25824 16.9607ZM35.5549 11.2705C34.6154 9.09333 33.3791 7.21307 31.7473 5.62969C30.1648 4.04632 28.2363 2.80931 26.0604 1.86918C23.8846 0.978528 21.511 0.533203 18.989 0.533203C16.467 0.533203 14.044 0.978528 11.8681 1.86918C9.69231 2.75983 7.81319 3.99684 6.18132 5.62969C4.54945 7.21307 3.31319 9.09333 2.37363 11.2705C1.43407 13.3981 0.989014 15.7732 0.989014 18.2967C0.989014 20.8202 1.43407 23.1458 2.37363 25.3229C3.31319 27.5001 4.54945 29.3803 6.18132 30.9637C7.81319 32.5471 9.69231 33.7841 11.8681 34.7242C14.044 35.6149 16.4176 36.0602 18.989 36.0602C21.5604 36.0602 23.8846 35.6149 26.1099 34.7242C28.2857 33.8336 30.1648 32.5966 31.7967 30.9637C33.4286 29.3803 34.6648 27.5001 35.6044 25.3229C36.4945 23.1458 36.989 20.8202 36.989 18.2967C36.9396 15.7732 36.4945 13.3981 35.5549 11.2705Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_5693_22576">
          <rect width="36" height="35.527" fill="white" transform="translate(0.989014 0.533203)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FullFooter = () => {
  const PROJECTS = useQuery(['Projects'], el => fetchProjectsWithFilters(el));
  const STOREINFO = useQuery(['storeInfo'], storeDetails);
  const STOREDOMAINDATA = useQuery(['storeDomainData'], storeDomainCheck);

  const store_data = STOREINFO.data?.data?.data;
  const store_domain_data = STOREDOMAINDATA?.data?.data?.store;

  // const footer_projects = PROJECTS?.data?.data?.data?.project?.filter(data => !data?.is_sold_out);

  const footer_projects = PROJECTS?.data?.data?.project?.filter(data => !data?.is_sold_out);

  const TERMS = store_data?.customer_document;
  const PRIVACY_POLICY = store_data?.customer_privacy_policy;

  return (
    <Box bg={`#191919`} color={`#ffffff`} p={{base: `0px 24px`, lg: `0px 95px`}}>
      <Grid
        templateColumns={{base: `1fr 1fr`, md: `repeat(4, 1fr)`}}
        color={{base: `#d0d0d0`}}
        fontSize={{base: `14px`}}
        fontWeight={{base: `400`}}
        lineHeight={{base: `180%`}}
        gap={{base: `16px`, md: `32px 0px`}}
        py={{base: `36px`}}
      >
        <Stack gap={`12.5px`} px={{base: `0px`, md: `25px`}}>
          <Text
            color={{base: `#FFF`}}
            fontSize={{base: `16px`}}
            fontWeight={{base: `700`}}
            lineHeight={{base: `160%`}}
            mb={`2.5px`}
          >
            Projects
          </Text>

          {footer_projects?.slice(0, 5)?.map(project => (
            <Link key={project.id} href={`/listing-details/${project.id}`}>
              {project?.name}
            </Link>
          ))}
        </Stack>
        <Stack gap={`12.5px`} px={{base: `0px`, md: `25px`}}>
          <Text
            color={{base: `#FFF`}}
            fontSize={{base: `16px`}}
            fontWeight={{base: `700`}}
            lineHeight={{base: `160%`}}
            mb={`2.5px`}
          >
            Legal
          </Text>
          {TERMS && (
            <Link href={TERMS} target="_blank" rel="noopener">
              Terms of Service
            </Link>
          )}
          {PRIVACY_POLICY && (
            <Link href={PRIVACY_POLICY} target="_blank" rel="noopener">
              Privacy Policy
            </Link>
          )}
        </Stack>
        <Stack gap={`12.5px`} px={{base: `0px`, md: `25px`}}>
          <Text
            color={{base: `#FFF`}}
            fontSize={{base: `16px`}}
            fontWeight={{base: `700`}}
            lineHeight={{base: `160%`}}
            mb={`2.5px`}
          >
            Location
          </Text>
          <Text>{store_data?.company_address}</Text>
        </Stack>
        <Stack gap={`12.5px`} px={{base: `0px`, md: `25px`}}>
          <Text
            color={{base: `#FFF`}}
            fontSize={{base: `16px`}}
            fontWeight={{base: `700`}}
            lineHeight={{base: `160%`}}
            mb={`2.5px`}
          >
            Contact
          </Text>
          <Text>{store_domain_data?.owner?.phone?.replace(`+234+234`, `+234`)}</Text>
          {/* <Text>Fax (230) 243 6161</Text> */}
          <Text>{store_data?.email}</Text>
        </Stack>
      </Grid>
      <Flex
        align={`center`}
        direction={{base: `column`, md: `row`}}
        gap={{base: `11px`, md: `16px`}}
        py={`20px`}
        borderTop={`1px solid`}
        borderColor={`rgba(255, 255, 255, 0.12)`}
        justify={`space-between`}
      >
        <HStack
          gap={{base: `11px`, md: `16px`}}
          as={Link}
          href={`https://www.myxellia.io/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <CopyrightSVG /> */}
          {/* <Text>Copyright All Rights Reserved © {new Date(Date.now()).getFullYear()}</Text> */}
          <Text>Created with Myxellia.io</Text>
        </HStack>
        <HStack gap={`20px`}>
          {store_data?.social_links?.linkedin && (
            <Link
              href={store_data?.social_links?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin fontSize={`20px`} />
            </Link>
          )}
          {store_data?.social_links?.facebook && (
            <Link
              href={store_data?.social_links?.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook fontSize={`20px`} />
            </Link>
          )}
          {store_data?.social_links?.instagran && (
            <Link
              href={store_data?.social_links?.instagran}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram fontSize={`20px`} />
            </Link>
          )}
          {store_data?.social_links?.twitter && (
            <Link
              href={store_data?.social_links?.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter fontSize={`20px`} />
            </Link>
          )}
          {store_data?.whatsapp_url && (
            <Link href={store_data?.whatsapp_url} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp fontSize={`20px`} />
            </Link>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
