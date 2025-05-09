import axios from '../utils/axiosInstance';

import {BaseURL_TWO, BaseURL_ONE, store_name} from '../constants/routes';

// const storeName = typeof window !== 'undefined' && localStorage.getItem('storeDetails') && JSON?.parse(localStorage?.getItem('storeDetails'))['store_name'];
// const storeName = 'cherry';

// GET REQUESTS EXAMPLE
export const fetchAmenities = async () => {
  return await axios.get(`${BaseURL_ONE}/investment/amenity`);
};

export const fetchPaymentPlanDoc = async param => {
  return await axios.get(`${BaseURL_TWO}/developers/project-documents?${param}`);
};

export const fetchListings = async querySting => {
  const storeName = store_name();

  return await axios.get(
    `${BaseURL_ONE}/investment/project?store_name=${storeName}` + '?' + querySting ?? ''
  );
};

export const fetchListingStats = async () => {
  return await axios.get(`${BaseURL_ONE}/investment/data_stats`);
};
export const fetchAllListingBundles = async projectId => {
  return await axios.get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${projectId}`);
};
export const fetchAllArchivedUnits = async projectId => {
  return await axios.get(`${BaseURL_TWO}/developers/archive/${projectId}`);
};
export const fetchListingTxns = async projectId => {
  return await axios.get(`${BaseURL_ONE}/transaction/project/${projectId}/`);
};
export const fetchDocument = async (projectId, purpose) => {
  return await axios.get(
    `${BaseURL_TWO}/developers/project-documents?project=${projectId}&purpose=${purpose}`
  );
};

export const fetchAllBundlePaymentPlan = async bundleId => {
  return await axios.get(`${BaseURL_TWO}/investment/bundle-paymentplans/?bundle_id=${bundleId}`);
};
export const fetchFractionalizedInfo = async bundleId => {
  return await axios.get(`${BaseURL_TWO}/developers/fractions/info/${bundleId}`);
};

// POST REQUESTS

export const addListingDocument = (projectId, body) => {
  return axios.post(`${BaseURL_TWO}/developers/project-documents?project=${projectId}`, body);
};
export const addAmenitiesToProject = (projectId, body) => {
  return axios.post(`${BaseURL_TWO}/developers/add-project-amenities/${projectId}/`, body);
};
export const addUnitsToArchive = (bundleId, body) => {
  return axios.patch(`${BaseURL_TWO}/developers/archive/${bundleId}`, body);
};
export const publishProject = body => {
  return axios.post(`${BaseURL_TWO}/developers/publish-project/`, body);
};
export const scheduleInspection = body => {
  return axios.post(`${BaseURL_ONE}/investment/scheduletour/${projectId}`, body);
};
export const CreateCustomerEquity = body => {
  return axios.post(`${BaseURL_TWO}/developers/equity/`, body);
};

export const calculateTotalFractions = body => {
  return axios.post(`${BaseURL_TWO}/developers/fractions `, body);
};

export const createFractions = body => {
  return axios.post(`${BaseURL_TWO}/developers/fractions`, body);
};

export const getAllContactPersons = async projectId => {
  return axios.get(`${BaseURL_TWO}/developers/contact-persons?project=${projectId}`);
};
