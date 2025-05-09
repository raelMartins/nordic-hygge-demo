import {store_name} from '../../constants/routes';
import {agent_auth_fetch} from '../../utils/axiosInstance';
import {getSession} from '../../utils/sessionmanagers';
import {BaseURL_TWO, BaseURL_ONE} from '/src/constants/routes.js';

// const store_name =
//   typeof window !== "undefined" &&
//   localStorage.getItem("storeDetails") &&
//   JSON?.parse(localStorage?.getItem("storeDetails"))["store_name"];

export const reportABug = async body => {
  const business_id = await getSession('businessId');
  return agent_auth_fetch.post(
    `${BaseURL_ONE}/account/bug-report?business_id=${business_id}`,
    body
  );
};

export const suggestAFeature = async body => {
  const business_id = await getSession('businessId');

  return agent_auth_fetch.post(
    `${BaseURL_ONE}/account/suggestions?business_id=${business_id}`,
    body
  );
};

export const getfeedbackHistory = async bundleId => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_ONE}/investment/feedback${bundleId ? `/${bundleId}` : `?store_name=${storeName}`}`
    )
    .then(res => (response = res));
  return response;
};

export const fetchpendingInspectionFeedbaack = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/investment/scheduletour?store_name=${storeName}&pending_feedback=true`)
    .then(res => (response = res));
  return response;
};

export const fetchInspectionFeedbaackDetails = async bundleId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/email_feedback/${bundleId}`)
    .then(res => (response = res));
  return response;
};

//post

export const feedback = async (body, bundleId) => {
  const storeName = store_name();

  return agent_auth_fetch.post(
    `${BaseURL_ONE}/investment/feedback${bundleId ? `/${bundleId}` : `?store_name=${storeName}`}`,
    body
  );
};

export const giveInspectionFeedback = async (body, bundleId) => {
  const storeName = store_name();

  return agent_auth_fetch.post(
    `${BaseURL_ONE}/investment/feedback?store_name=${storeName}&id=${bundleId}`,
    body
  );
};

export const giveInspectionFeedbackForEmail = async (body, bundleId) => {
  const storeName = store_name();

  return agent_auth_fetch.post(
    `${BaseURL_TWO}/investment/email_feedback/${bundleId}?store_name=${storeName}`,
    body
  );
};
