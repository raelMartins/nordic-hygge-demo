import axios from '../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE, store_name} from '../constants/routes.js';

export const reportABug = async body => {
  return axios.post(`${BaseURL_ONE}/account/bug-report`, body);
};

export const suggestAFeature = async body => {
  return axios.post(`${BaseURL_ONE}/account/suggestions`, body);
};

export const getfeedbackHistory = async bundleId => {
  let response = [];
  const storeName = store_name();

  await axios
    .get(
      `${BaseURL_ONE}/investment/feedback${bundleId ? `/${bundleId}` : `?store_name=${storeName}`}`
    )
    .then(res => (response = res));
  return response;
};

export const fetchpendingInspectionFeedbaack = async status => {
  let response = [];
  const storeName = store_name();

  await axios
    .get(
      `${BaseURL_ONE}/investment/scheduletour?store_name=${
        storeName && storeName
      }&pending_feedback=true`
    )
    .then(res => (response = res));
  return response;
};

export const fetchInspectionFeedbaackDetails = async bundleId => {
  let response = [];
  await axios
    .get(`${BaseURL_TWO}/investment/email_feedback/${bundleId}`)
    .then(res => (response = res));
  return response;
};

//post

export const feedback = async (body, bundleId) => {
  const storeName = store_name();

  return axios.post(
    `${BaseURL_ONE}/investment/feedback${bundleId ? `/${bundleId}` : `?store_name=${storeName}`}`,
    body
  );
};

export const feedbackEquity = async (body, bundleId) => {
  const storeName = store_name();

  return axios.post(
    `${BaseURL_ONE}/investment/feedback?id=${bundleId}&store_name=${storeName}`,
    body
  );
};

export const giveInspectionFeedback = async (body, bundleId) => {
  const storeName = store_name();

  return axios.post(
    `${BaseURL_ONE}/investment/feedback?store_name=${storeName}&id=${bundleId}`,
    body
  );
};

export const giveInspectionFeedbackForEmail = async (body, bundleId) => {
  const storeName = store_name();

  return axios.post(
    `${BaseURL_TWO}/investment/email_feedback/${bundleId}?store_name=${storeName}`,
    body
  );
};

export const feedbackPurchase = async (body, id) => {
  return axios.post(`${BaseURL_ONE}/investment/feedback/${id}`, body);
};
