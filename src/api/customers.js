import axios from '../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE, BUSINESS_ID} from '../constants/routes';
import {getSession} from '../utils/sessionmanagers';

// GET REQUESTS
export const fetchAllCustomers = async () => {
  return await axios.get(`${BaseURL_TWO}/developers/customers/`);
};
export const fetchCustomers = async () => {
  return await axios.get(`${BaseURL_TWO}/developers/developer-customer`);
};

export const fetchOneCustomer = async id => {
  return await axios.get(`${BaseURL_TWO}/developers/developer-customer/${id}`);
};

export const fetchCustomersEquity = async customerId => {
  return await axios.get(`${BaseURL_TWO}/developers/customers/${customerId}/equity/`);
};

export const fetchCustomersEquityTxns = async equityId => {
  return await axios.get(`${BaseURL_TWO}/developers/equity/${equityId}/transactions/`);
};

export const fetchCustomerViaEmail = async email => {
  const businessId = await getSession('businessId');
  return await axios.get(
    `${BaseURL_ONE}/account/user-basic-data?business_id=${businessId}&email=${email}`
  );
};

// POST REQUESTS

export const createCustomer = body => {
  return axios.post(`${BaseURL_TWO}/developers/customers/`, body);
};
export const createCustomerEquity = body => {
  return axios.post(`${BaseURL_TWO}/developers/customers/equity/`, {...body});
};

export const allocateUnitToEquity = body => {
  return axios.post(`${BaseURL_TWO}/developers/allocate/`, {...body});
};

export const blacklistCustomer = (customerId, body) => {
  return axios.post(`${BaseURL_TWO}/developers/customers/${customerId}/blacklist/`, {...body});
};
