import axios from 'axios';
import {BaseURL_TWO, BUSINESS_ID} from '../constants/routes.js';
import {getSession} from '../utils/sessionmanagers.js';

// initiate support
export const initiateSupport = async body => {
  const business_id = await getSession('businessId');

  return axios.post(`${BaseURL_TWO}/supports/${business_id}/initiate/`, body);
};

// send new message
export const sendMessage = (support_id, body) => {
  return axios.post(`${BaseURL_TWO}/supports/chat/${support_id}/`, body);
};

// fetch all chats in support
export const fetchSupportChats = async support_id => {
  let response = [];

  await axios.get(`${BaseURL_TWO}/supports/chat/${support_id}/`).then(res => (response = res));
  return response;
};

// fetch events
export const fetchSupportEvents = async id => {
  let response = [];

  await axios.get(`${BaseURL_TWO}/supports/event/${id}/`).then(res => (response = res));
  return response;
};

// get support initiation
export const getSupportInitiation = async () => {
  const businessId = await getSession('businessId');

  return axios.get(`${BaseURL_TWO}/supports/${businessId}/initiate/`);
};
