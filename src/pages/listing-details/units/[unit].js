import {fetchAllUnits, fetchProjectsByIdServerside} from '@/api/listing';
import {AuthLayout} from '@/components/page_layout/AuthLayout';
import {UnitPage} from '@/components/properties/units/UnitPage';
import {getServersideCookie} from '@/utils/sessionmanagers';

const Unit = ({info, unitData, err}) => {
  return <AuthLayout InnerComponent={<UnitPage info={info} unitData={unitData} err={err} />} />;
};

export default Unit;
export async function getServerSideProps(ctx) {
  // Fetch data from external API
  try {
    const server_store_name = await getServersideCookie(ctx.req.cookies?.store_name);
    const res = await fetchProjectsByIdServerside(parseInt(ctx.query.projectId), server_store_name);
    const units = await fetchAllUnits(parseInt(ctx.query.projectId));
    const unitData = units?.data?.results?.find(
      item => parseInt(item.id) == parseInt(ctx.params.unit)
    );

    // Pass data to the page via props
    return {props: {info: res?.data?.project, unitData, err: !unitData ? true : false}};
  } catch (err) {
    return {props: {info: null, unitData: null, err: true}};
  }
}
