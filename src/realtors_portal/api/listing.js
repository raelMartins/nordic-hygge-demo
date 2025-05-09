import {BaseURL_TWO, BaseURL_ONE} from '/src/constants/routes.js';
import {store_name} from '../../constants/routes';
import {agent_auth_fetch} from '../../utils/axiosInstance';
import {getSession} from '../../utils/sessionmanagers';

// GET REQUESTS
export const fetchProjectsWithFilters = async querySting => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_ONE}/investment/project?store_name=${storeName}${
        querySting ? `${querySting}` : ''
      }`
    )
    .then(res => (response = res))
    .catch(res => (response = res));

  return response;
};
export const fetchProjectsById = async id => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/investment/project/${parseInt(id)}?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchFractionalInfo = async id => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/fractions/info/${parseInt(id)}`)

    .then(res => (response = res));
  return response;
};
export const fractionalEquityTransactionHistory = async param => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/fraction-history/?equity_id=${param}`)

    .then(res => (response = res));
  return response;
};
export const fetchUserEquity = async status => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/investment/equity/?paymentStatus=${status}&store_name=${
        storeName && storeName
      }`
    )
    .then(res => (response = res));
  return response;
};

export const fetchEquity = async equityId => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/equity/${equityId}/?store_name=${storeName && storeName}`)
    .then(res => (response = res));
  return response;
};
export const fetchForCustomerEquityValidation = async () => {
  let response = [];
  const business_id = await getSession('businessId');
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/equity-validation/?business_id=${business_id}`)
    .then(res => (response = res));
  return response;
};
export const fetchAllUnits = async id => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${parseInt(id)}`)
    .then(res => (response = res));
  return response;
};

export const fetchSavedFilters = async () => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/investment/saved-project-filters`)
    .then(res => (response = res));
  return response;
};

export const fetchProjectDocument = async id => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/project-documents?project=${parseInt(id)}&purpose=brochure`)
    .then(res => (response = res));
  return response;
};
export const fetchAllBundlePaymentPlan = async bundleId => {
  let response = [];

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/investment/get_plans?bundle_id=${bundleId}
`
    )
    .then(res => (response = res));
  return response;
};

export const fetchFractionalizedInfo = async bundleId => {
  let response = [];
  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/developers/fractions/info/${parseInt(bundleId)}
`
    )
    .then(res => (response = res));
  return response;
};

//post request
export const saveFilters = async filterQuery => {
  return agent_auth_fetch.post(`${BaseURL_ONE}/investment/saved-project-filters`, filterQuery);
};

export const PostForCustomerEquityValidationoOrDispute = async body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/investment/equity-validation/`, body);
};

export const shareProject = async body => {
  const storeName = store_name();

  return agent_auth_fetch.post(`${BaseURL_TWO}/store/share/?store=${storeName && storeName}`, body);
};
//delete savefilters
export const deleteSavedFilters = async id => {
  return agent_auth_fetch.delete(
    `${BaseURL_ONE}/investment/saved-project-filters${id ? '/' : ''}${id}`
  );
};
export const requestPropeertyTour = async (body, id) => {
  return agent_auth_fetch.post(`${BaseURL_ONE}/investment/scheduletour/${id}`, body);
};

export const contactAnAgent = async (body, id) => {
  return agent_auth_fetch.post(
    // `${BaseURL_TWO}/developer/add_contact/${id}?contact_agent=true`,
    `${BaseURL_TWO}/developers/contact_person/`,

    body
  );
};

export const setRecurringPayment = async (body, id) => {
  return agent_auth_fetch.patch(
    `${BaseURL_TWO}/investment/equity/${id}/`,

    body
  );
};

// AGENTS
