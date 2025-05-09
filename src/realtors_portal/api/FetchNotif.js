import {store_name} from '../../constants/routes';
import {agent_auth_fetch} from '../../utils/axiosInstance';
import {BaseURL_TWO} from '/src/constants/routes.js';

export const fetchNotifs = async () => {
  let response = [];
  // const userToken = typeof window !== 'undefined' && localStorage.getItem('userToken');

  const storeName = store_name();
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/get_notify_store?notify=true&store=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchSpace = async () => {
  const storeName = store_name();

  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/get_notify_store?space=true&store=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const getMoreInfo = async id => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/view_notification_data/${parseInt(id)}`)
    .then(res => (response = res));
  return response;
};

export const UpdateStatus = async body => {
  return agent_auth_fetch.patch(`${BaseURL_TWO}/store/get_notify_store`, body);
};

export const UpdateSingleNotif = async body => {
  const id = body.id;
  delete body.id;

  return agent_auth_fetch.patch(`${BaseURL_TWO}/store/get_notify_store/${parseInt(id)}`, body);
};

export const handleCoownerShipRequest = (requestId, body) => {
  return agent_auth_fetch.post(
    `${BaseURL_TWO}/investment/co-own/respond/${parseInt(requestId)}/`,
    body
  );
};
