import axios from '../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE, BUSINESS_ID} from '../constants/routes.js';
import {getSession} from '../utils/sessionmanagers';

const USER_OBJECT =
  typeof window !== 'undefined' && localStorage && localStorage.getItem('LoggedinUser');

// GET REQUESTS

export const fetchProjectsWithFilters = async querySting => {
  return await axios.get(`${BaseURL_ONE}/investment/project?` + querySting);
};

export const fetchFractionsPurchaseHistory = async id => {
  return await axios.get(`${BaseURL_TWO}/investment/fraction-history/?equity_id=${parseInt(id)}`);
};

export const fetchCustomPlanSummaryForAssets = async equityId => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/investment/equity-payments/${equityId}/`)
    .then(res => (response = res))
    .catch(res => (response = res));

  return response;
};

export const fetchUpcomingPayments = async id => {
  return await axios.get(
    `${BaseURL_TWO}/investment/equity-payments/${parseInt(id)}/?display_fee=true`
  );
};

export const fetchCustomPlanSummary = async planId => {
  return await axios.get(
    `${BaseURL_TWO}/investment/custom-plan-payments/${planId}/?display_fee=true`
  );
};

export const fetchInvestorPackets = async id => {
  return await axios.get(
    `${BaseURL_TWO}/investment/equity/${parseInt(id)}/packets/?requester=customer`
  );
};

//POST REQUESTS

export const fetchPurchaseHistory = async (equityId, user_id) => {
  let response = [];
  await axios
    .post(`${BaseURL_ONE}/transaction/equity/${parseInt(equityId)}/`, {
      ...(user_id ? {user_id} : {}),
    })
    .then(res => (response = res));
  return response;
};

export const createPaymentPlanEquity = body => {
  return axios.post(`${BaseURL_TWO}/investment/equity/`, body);
  // This endpoint could be for initial payment plan.
};
export const makeEquityDeposit = body => {
  return axios.post(`${BaseURL_TWO}/investment/make-equity-payment`, body);
  // This endpoint is used for any kind of deposit.
  // payment options: card, store_wallet, bank_transfer
  // {
  // 	"equity_id": 729,
  // 	"amount_to_pay": 5000,
  // 	"payment_option": "matador_wallet"
  // }
};
export const fetchBankDetails = projectId => {
  return axios.get(`${BaseURL_TWO}/payment/project-account/?project=${projectId}`);
};

export const fetchAllPurchaseHistory = async id => {
  const user = await getSession('loggedIn');

  return await axios.post(`${BaseURL_ONE}/transaction/equity/${parseInt(id)}/?display_fee=true`, {
    user_id: parseInt(user?.user?.id),
  });
};
export const makeEquityPayment = body => {
  return axios.post(`${BaseURL_TWO}/investment/equity/`, body);
};

export const fetchSavedCards = async () => {
  const businessId = await getSession('businessId');

  return await axios.get(`${BaseURL_TWO}/account/cards/?business_id=${businessId}`);
};

export const sendInvestorPackets = (id, body) => {
  return axios.post(`${BaseURL_TWO}/investment/equity/${parseInt(id)}/packets/`, body);
};

export const makePaymentWithSavedCard = body => {
  return axios.post(`${BaseURL_TWO}/account/pay-with-card/`, body);
};
