import {fetchProjectsByIdServerside} from '@/api/listing';
import {AuthLayout} from '@/components/page_layout/AuthLayout';
import {ListingPage} from '@/components/properties/listings/ListingPage';
import useGetSession from '@/utils/hooks/getSession';
import {capitalizeString} from '@/utils/misc';
import {getServersideCookie} from '@/utils/sessionmanagers';
import Head from 'next/head';

const ListingDetails = ({info, err}) => {
  const {sessionData: store_data} = useGetSession('store_data');

  const metaData = {title: info?.name, description: info?.description, image: slideImages?.[0]};

  return (
    <>
      <Head>
        {/* Basic */}
        <title>
          {capitalizeString(
            metaData?.title
              ? `${metaData?.title} | ${store_data?.store_name}`
              : store_data?.store_name
              ? `${store_data?.store_name} - Luxury Properties for Discerning Buyers`
              : `loading`
          )}
        </title>
        <meta
          name="description"
          content={metaData?.description || `Property Development Company`}
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={capitalizeString(
            metaData?.title
              ? `${metaData?.title} | ${store_data?.store_name}`
              : store_data?.store_name
              ? `${store_data?.store_name} - Luxury Properties for Discerning Buyers`
              : `loading`
          )}
        />
        <meta
          property="og:description"
          content={metaData?.description || `Property Development Company`}
        />
        <meta
          property="og:image"
          content={
            metaData?.image?.photo ||
            metaData?.image?.original ||
            metaData?.image ||
            store_data?.company_image
          }
        />
        <meta property="og:site_name" content={store_data?.store_name} />

        {/* Twitter Meta Tags */}
        <meta
          name="twitter:title"
          content={capitalizeString(
            metaData?.title
              ? `${metaData?.title} | ${store_data?.store_name}`
              : store_data?.store_name
              ? `${store_data?.store_name} - Luxury Properties for Discerning Buyers`
              : `loading`
          )}
        />
        <meta
          name="twitter:description"
          content={metaData?.description || `Property Development Company`}
        />
        <meta
          name="twitter:image"
          content={
            metaData?.image?.photo ||
            metaData?.image?.photo?.[0] ||
            metaData?.image?.original ||
            metaData?.image ||
            store_data?.company_image
          }
        />
        <meta name="twitter:image:alt" content={`Image of ${store_data?.store_name}`} />
        <meta name="twitter:site" content={`@${store_data?.store_name}`} />
        <meta name="twitter:card" content={'summary_large_image'} />
      </Head>
      <AuthLayout InnerComponent={<ListingPage info={info} err={err} />} />
    </>
  );
};

// export default Auth(ListingDetails);
export default ListingDetails;

// This gets called on every request
export async function getServerSideProps(ctx) {
  // Fetch data from external API
  try {
    const server_store_name = await getServersideCookie(ctx.req.cookies?.store_name);
    const res = await fetchProjectsByIdServerside(parseInt(ctx.params.id), server_store_name);

    // Pass data to the page via props
    return {props: {info: res?.data?.project, err: false}};
  } catch (err) {
    return {props: {info: null, err: true}};
  }
}
