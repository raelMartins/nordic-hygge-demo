import {fetchProjectsByIdServerside} from '@/api/listing';
import {AuthLayout} from '@/components/page_layout/AuthLayout';
import {ListingPage} from '@/components/properties/listings/ListingPage';
import {getServersideCookie} from '@/utils/sessionmanagers';

const ListingDetails = ({info, err}) => {
  return <AuthLayout InnerComponent={<ListingPage info={info} err={err} />} />;
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
