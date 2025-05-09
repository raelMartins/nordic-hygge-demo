import {Box, Button, Container, Image, Text, SimpleGrid} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import docIcon from '@/realtors_portal/images/icons/doc_icon.svg';
import rightArrow from '@/realtors_portal/images/icons/arrow_right_listings_agent.svg';
import {useQuery} from 'react-query';
import {fetchAgentProjectDocument} from '@/realtors_portal/api/agents';
import useGetSession from '@/utils/hooks/getSession';

export const ListingInfoDocuments = () => {
  const {query} = useRouter();

  const {sessionData: LoggedInAgent} = useGetSession('a_details');
  const {sessionData: agentToken} = useGetSession('a_token');

  const storeName = LoggedInAgent?.storeName;

  const Brochure = useQuery(['brochure-document', query], () =>
    fetchAgentProjectDocument(query.id, 'brochure', storeName, agentToken)
  );
  const PaymentPlan = useQuery(['paymentplan-contract-document', query], () =>
    fetchAgentProjectDocument(query.id, 'paymentplan', storeName, agentToken)
  );
  const Outright = useQuery(['outright-document', query], () =>
    fetchAgentProjectDocument(query.id, 'outright', storeName, agentToken)
  );

  const BrochureData = Brochure.data && Brochure.data?.data?.results;
  const PaymentplanData = PaymentPlan.data && PaymentPlan.data?.data?.results;
  const OutrightData = Outright.data && Outright.data?.data?.results;

  const BrochureDocument =
    BrochureData &&
    BrochureData?.length > 0 &&
    BrochureData[BrochureData?.length - 1]?.document_file;

  const isDocumentAvailable =
    BrochureData &&
    BrochureData?.length > 0 &&
    PaymentplanData &&
    PaymentplanData?.length > 0 &&
    OutrightData &&
    OutrightData?.length > 0;

  return (
    <>
      {isDocumentAvailable ? (
        <Box mt={{lg: '60px'}} w={`100%`}>
          <Text
            fontSize={{base: '18px', lg: '32px'}}
            fontWeight="500"
            color="#191919"
            lineHeight="41px"
          >
            Documents
          </Text>
          <Container
            maxW="1284px"
            padding={{base: `12px 13px`, lg: '19px 36px'}}
            w={`100%`}
            mt={{base: `0px`, lg: '20px'}}
          >
            <SimpleGrid minChildWidth={'277px'} spacing="23px">
              <Box
                minW="277px"
                h="150px"
                border="1px solid lightgray"
                borderRadius="14px"
                p="23px"
                w="max-content"
              >
                <Image alt="" src={docIcon.src} h="33.8px" w="40px" />
                <Text pt={2}>Brochure</Text>
                <Button
                  target="_blank"
                  as="a"
                  href={BrochureDocument}
                  mt={4}
                  variant="link"
                  color="#4545FE"
                >
                  View
                  <Image alt="arrowIcon" src={rightArrow.src} />
                </Button>
              </Box>
            </SimpleGrid>
          </Container>
        </Box>
      ) : (
        <Box mt={{lg: '60px'}} w={`100%`}>
          <Text
            fontSize={{base: '18px', lg: '32px'}}
            fontWeight="500"
            color="#191919"
            lineHeight="41px"
          >
            Documents
          </Text>
          <Container
            bg="#ffffff"
            maxW="1284px"
            padding="22px 23px"
            borderRadius="16px"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.02)"
            mt="25px"
          >
            <Text>Nil</Text>
          </Container>
        </Box>
      )}
    </>
  );
};

export default ListingInfoDocuments;
