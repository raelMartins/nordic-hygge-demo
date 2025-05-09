import {store_name} from '../../constants/routes';
import {agent_auth_fetch} from '../../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE} from '/src/constants/routes';

// const storeName = typeof window !== 'undefined' && localStorage.getItem('storeDetails') && JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];
// const storeName = 'cherry';

// GET REQUESTS EXAMPLE
export const fetchAmenities = async () => {
  let response = [];
  await agent_auth_fetch.get(`${BaseURL_ONE}/investment/amenity`).then(res => (response = res));
  return response;
};

export const fetchPaymentPlanDoc = async param => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/project-documents?${param}`)
    .then(res => (response = res));
  return response;
};

export const fetchListings = async querySting => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/investment/project?store_name=${storeName}` + '?' + querySting ?? '')
    .then(res => (response = res));
  return response;
};

export const fetchListingStats = async () => {
  let response = [];
  await agent_auth_fetch.get(`${BaseURL_ONE}/investment/data_stats`).then(res => (response = res));
  return response;
};
export const fetchAllListingBundles = async projectId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${projectId}`)
    .then(res => (response = res));
  return response;
};
export const fetchAllArchivedUnits = async projectId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/archive/${projectId}`)
    .then(res => (response = res));
  return response;
};
export const fetchListingTxns = async projectId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_ONE}/transaction/project/${projectId}/`)
    .then(res => (response = res));
  return response;
};
export const fetchDocument = async (projectId, purpose) => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/project-documents?project=${projectId}&purpose=${purpose}`)
    .then(res => (response = res));
  return response;
};

export const fetchAllBundlePaymentPlan = async bundleId => {
  let response = [];

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/investment/bundle-paymentplans/?bundle_id=${bundleId}
`
    )
    .then(res => (response = res));
  return response;
};

export const fetchFractionalizedInfo = async bundleId => {
  let response = [];
  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/developers/fractions/info/${bundleId}
`
    )
    .then(res => (response = res));
  return response;
};

// POST REQUESTS

export const addListingDocument = (projectId, body) => {
  return agent_auth_fetch.post(
    `${BaseURL_TWO}/developers/project-documents?project=${projectId}`,
    body
  );
};
export const addAmenitiesToProject = (projectId, body) => {
  return agent_auth_fetch.post(
    `${BaseURL_TWO}/developers/add-project-amenities/${projectId}/`,
    body
  );
};
export const addUnitsToArchive = (bundleId, body) => {
  return agent_auth_fetch.patch(`${BaseURL_TWO}/developers/archive/${bundleId}`, body);
};
export const publishProject = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/publish-project/`, body);
};
export const scheduleInspection = body => {
  return agent_auth_fetch.post(`${BaseURL_ONE}/investment/scheduletour/${projectId}`, body);
};
export const CreateCustomerEquity = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/equity/`, body);
};

export const calculateTotalFractions = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/fractions `, body);
};

export const createFractions = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/fractions`, body);
};
