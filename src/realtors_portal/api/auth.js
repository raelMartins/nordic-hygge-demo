import {store_name} from '../../constants/routes';
import {agent_auth_fetch} from '../../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE} from '/src/constants/routes.js';

//Get Request
export const storeDetails = async () => {
  let response = [];
  const storeName = store_name();
  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/store/store_info/?store_name=${storeName}`

      // ,
      // BEARER_USER_TOKEN
    )
    .then(res => (response = res))
    .catch(res => (response = res));

  return response;
};

// POST REQUEST
export const verifyMagicToken = async token => {
  return agent_auth_fetch.post(`${BaseURL_TWO}/store/verify-magic-token/`, token);
};

export const AttemptLogin = async data => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/store/login/`, data)
    .then(res => (response = res))
    .catch(err => (response = err));

  return response;
};

export const registerUser = async data => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/store/customers/`, data)
    .then(res => (response = res))
    .catch(err => (response = err));

  return response;
};

export const outreach = async data => {
  let response = [];
  await agent_auth_fetch
    .post(`${BaseURL_TWO}/developers/outreach`, data)
    .then(res => (response = res))
    .catch(err => (response = err));
  return response;
};

// agents

export const VerifyTokenAgents = async data => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/store/verify-agent-token`, data)
    .then(res => (response = res))
    .catch(err => (response = err));

  return response;
};

export const agentLogin = async data => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/store/agent-webstore`, data)
    .then(res => (response = res))
    .catch(err => (response = err));

  return response;
};

export const agentAccount = async data => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_ONE}/user/agent-login`, data)
    .then(res => (response = res))
    .catch(err => (response = err));

  return response;
};
