import {agent_auth_fetch} from '../../utils/axiosInstance';
import {getSession} from '../../utils/sessionmanagers';
import {BaseURL_TWO, BaseURL_ONE} from '/src/constants/routes';

// GET REQUESTS
export const fetchAllCustomers = async () => {
  let response = [];
  await agent_auth_fetch.get(`${BaseURL_TWO}/developers/customers/`).then(res => (response = res));
  return response;
};
export const fetchCustomers = async () => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/developer-customer`)
    .then(res => (response = res));
  return response;
};

export const fetchOneCustomer = async id => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/developer-customer/${id}`)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerViaEmail = async email => {
  let response = [];

  const business_id = await getSession('businessId');

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/account/user-basic-data?business_id=${business_id}&email=${email}`)
    .then(res => (response = res))
    .catch(res => (response = res));
  return response;
};

export const fetchCustomersEquity = async customerId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/customers/${customerId}/equity/`)
    .then(res => (response = res));
  return response;
};

export const fetchCustomersEquityTxns = async equityId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/equity/${equityId}/transactions/`)
    .then(res => (response = res));
  return response;
};

// POST REQUESTS

export const createCustomer = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/customers/`, body);
};
export const createCustomerEquity = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/customers/equity/`, {...body});
};

export const allocateUnitToEquity = body => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/allocate/`, {...body});
};

export const blacklistCustomer = (customerId, body) => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/developers/customers/${customerId}/blacklist/`, {
    ...body,
  });
};

export const respondToInspectionFeedBack = (data, project_id) => {
  return agent_auth_fetch.post(
    `${BaseURL_TWO}/developers/project-inspection/${data.project_id}/`,
    data.body
  );
};
