import axios from '../utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes.js';

// GET REQUESTS
export const checkStoreNameAvailability = async storeName => {
  return await axios.get(`${BaseURL_TWO}/store/name/?name_to_check=${storeName}`);
};

export const fetchStoreDetailsByDev = async () => {
  return await axios.get(`${BaseURL_TWO}/store/settings/`);
};

export const fetchLogo = async () => {
  return await axios.get(`${BaseURL_TWO}/developers/compliance`);
};

export const fetchStoreDetailsByUser = async storeName => {
  return await axios.get(`${BaseURL_TWO}/store/settings/?storeName=${storeName}`);
};

export const fetchAllDomain = async storeName => {
  return await axios.get(`${BaseURL_TWO}/store/domains/`);
};

export const fetchStoreWallet = async storeName => {
  return await axios
    .get(`${BaseURL_TWO}/store/wallet/?store=${storeName}`)
    .then(res => (response = res));
};

// POST REQUEST
export const createStore = async storeDetailsPayload => {
  return await axios.post(`${BaseURL_TWO}/store/settings/`, storeDetailsPayload);
};
