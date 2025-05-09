import {BaseURL_TWO} from '/src/constants/routes.js';
import {getSession} from '../../utils/sessionmanagers';
import {agent_auth_fetch} from '../../utils/axiosInstance';

// initiate support
export const initiateSupport = async body => {
  const business_id = await getSession('businessId');

  return agent_auth_fetch.post(`${BaseURL_TWO}/supports/${business_id}/initiate/`, body);
};

// send new message
export const sendMessage = (support_id, body) => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/supports/chat/${support_id}/`, body);
};

// fetch all chats in support
export const fetchSupportChats = async support_id => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/supports/chat/${support_id}/`)
    .then(res => (response = res));
  return response;
};

// fetch events
export const fetchSupportEvents = async id => {
  let response = [];

  await agent_auth_fetch.get(`${BaseURL_TWO}/supports/event/${id}/`).then(res => (response = res));
  return response;
};

// get support initiation
export const getSupportInitiation = async () => {
  const businessId = await getSession('businessId');

  return agent_auth_fetch.get(`${BaseURL_TWO}/supports/${businessId}/initiate/`);
};
