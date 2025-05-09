import axios from '../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE} from '../constants/routes.js';

const userToken = typeof window !== 'undefined' && localStorage.getItem('userToken');

// GET REQUEST
export const fetchCoOwnRequestForEquity = async ({equityId}) => {
  return await axios.get(`${BaseURL_ONE}/investment/co-own/${equityId}/`);
};

export const fetchIndividualCoOwnersData = async (userID, equity_id) => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/investment/coown-individual/${equity_id}/?user=${userID}`)
    .then(res => (response = res))
    .catch(res => (response = res));

  return response;
};

export const expectedCoownersPayment = async ({equityId}) => {
  return await axios.get(`${BaseURL_TWO}//investment/equity-payments/${equityId}/`);
};
export const fetchIndividualCoOwnershipData = async (equity_id, userID) => {
  return await axios.get(`${BaseURL_TWO}/investment/coown-individual/${equity_id}/?user=${userID}`);
};
export const fetchUserEquityInviteData = async ({id}) => {
  return await axios.get(`${BaseURL_TWO}/v2/store/view_notification_data/${id}/`);
};

// POST
export const inviteCoOwners = async body => {
  return axios.post(`${BaseURL_TWO}/investment/co-own/invite/`, body);
};
export const inviteSingleCo_owner = body => {
  return axios.post(`${BaseURL_TWO}/investment/equity/`, body);
};
export const fetchListOfCoowners = async equity_id => {
  return axios.get(`${BaseURL_TWO}/investment/co-own/${equity_id}/`);
};
export const fetchCustomersInfo = async query => {
  return axios.get(`${BaseURL_ONE}/user/fetch_customer?${query}`);
};

export const respondToCoOwnersRequest = async (body, coownerId) => {
  return axios.post(`${BaseURL_TWO}/investment/co-own/respond/${coownerId}/`, body);
};
export const startCoOwnershipPaymentByHost = async equityId => {
  return axios.post(`${BaseURL_TWO}/investment/co-own/start/${equityId}/`, {
    payment_option: 'matador_wallet',
  });
};

export const proposeNewEquity = async equityId => {
  return axios.post(`${BaseURL_TWO}/investment/co-own/propose-new/${equityId}/`, {
    payment_option: 'matador_wallet',
  });
  // 	{
  //     "equity_value": 23
  // }
};

export const coOwnersPayment = async equityId => {
  return axios.post(
    `${BaseURL_TWO}/investment/co-own/make-initial-payment/<equity_id>{equityId}/`,
    {payment_option: 'matador_wallet'}
  );
};

// Host: Start Co_ownership payment body 👇🏻
// {
//             "paymentplan_id": 233,
//             "bundle_id": 355,
//             "payment_option": "matador_wallet",
//             "project_id": 224,
//             "type": "WHOLE",
//             "offer_expires": "2022-11-30T00:00:00",
//             "invitees": [
//                 {
//                     "username": "prosper",
//                     "equity_value": 30
//                 }
//             ]
//         }'
