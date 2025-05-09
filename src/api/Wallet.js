import axios from '../utils/axiosInstance';
import {BaseURL_TWO, store_name} from '../constants/routes.js';

// GET REQUEST
export const fetchStoreWalletTxns = async () => {
  const storeName = store_name();

  return await axios.get(`${BaseURL_TWO}/store/transactions/?store_name=${storeName}`);
};
export const fetchSavedBankDetailsForWithdrawal = async () => {
  const storeName = store_name();

  return await axios.get(
    `${BaseURL_TWO}/store/wallet_withdrawal/?accounts=true&store_name=${storeName}`
  );
};
export const fetchSupportedBanks = async () => {
  return await axios.get(`${BaseURL_TWO}/store/wallet_withdrawal/?banks=true`);
};
export const fetchVirtualAccountNumber = async () => {
  const storeName = store_name();

  return await axios.get(`${BaseURL_TWO}/store/virtual-account/?store=${storeName}`);
};
export const fetchWalletCurrentBalance = async () => {
  const storeName = store_name();

  return await axios.get(`${BaseURL_TWO}/store/account-balance/?store=${storeName}`);
};

// POST REQUEST
export const walletWithdrawal = withdrawalPayload => {
  return axios.post(`${BaseURL_TWO}/store/wallet_withdrawal/`, withdrawalPayload);
};
export const makeeDepositToWallet = depositPayload => {
  return axios.post(`${BaseURL_TWO}/store/deposit/`, depositPayload);
};
