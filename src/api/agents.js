import axios from '../utils/axiosInstance';
import {BaseURL_TWO, BaseURL_ONE, STORE__DOMAIN, STORENAMEFROMDOMAIN} from '../constants/routes';

const token =
  typeof window !== 'undefined' &&
  localStorage.getItem('devToken') !== 'undefined' &&
  JSON?.parse(localStorage.getItem('devToken'));

const BEARER_TOKEN = {
  headers: {Authorization: `Bearer ${token}`},
};

const storeName = STORENAMEFROMDOMAIN;

// const storeName =
//   typeof window !== "undefined" &&
//   localStorage.getItem("agentStoreDetails") &&
//   JSON?.parse(localStorage?.getItem("agentStoreDetails"))["store_name"];

export const fetchTermsAndConditionsPDF = async (token, storeName) => {
  let response = [];

  const BEARER_TOKEN = {
    headers: {
      Authorization: `Bearer ${token}`,
      'store-name': storeName,
    },
  };
  await axios
    .get(`${BaseURL_TWO}/store/terms?type=agent&store_name=${storeName}`, BEARER_TOKEN)
    .then(res => (response = res));
  return response;
};

export const fetchCustomers = async () => {
  return await axios.get(
    `${BaseURL_TWO}/agents/customers/?store_name=${storeName}&sort=lowest_paying_customers_to_highest`,
    BEARER_TOKEN
  );
};

export const fetchCustomerInfo = async id => {
  return await axios.get(
    `${BaseURL_TWO}/agents/customers/${id}/?store_name=${storeName}`,
    BEARER_TOKEN
  );
};

export const fetchAgentProjectDocument = async (id, purpose) => {
  return await axios.get(
    `${BaseURL_TWO}/developers/project-documents?project_id=${id}&purpose=${purpose}`,
    BEARER_TOKEN
  );
};

export const fetchWithdrawAccounts = async () => {
  return await axios.get(
    `${BaseURL_TWO}/agents/withdrawals/?accounts=true&store_name=${storeName}`,
    BEARER_TOKEN
  );
};

export const fetchAgentRequest = async () => {
  return await axios.get(`${BaseURL_TWO}/agents/requests`, BEARER_TOKEN);
};
export const fetchAgentsAccountUpcomingPayments = async () => {
  return await axios.get(`${BaseURL_TWO}/agents/account/upcomings`, BEARER_TOKEN);
};
//   export const fetchWithdrawAccounts = async (name) => {
//     return
//     await axios
//       .get(
//         `${BaseURL_TWO}/agent/withdrawals/?transactions=${true}&store_name=${name}`,
//         BEARER_TOKEN
//       )
//   };

export const fetchAllWithdrawal = async () => {
  return await axios.get(
    `${BaseURL_TWO}/agents/transactions?transaction_type=withdrawal&store_name=${storeName}`,
    BEARER_TOKEN
  );
};
export const fetchWithdrawal = async () => {
  return await axios.get(
    `${BaseURL_TWO}/agents/transactions?store_name=${storeName}&type=withdrawal`,
    BEARER_TOKEN
  );
};

export const fetchAllListings = async () => {
  return await axios.get(`${BaseURL_ONE}/investment/project`, BEARER_TOKEN);
};

export const fetchBanksForAgents = async () => {
  return await axios.get(
    `${BaseURL_TWO}/agents/settings/?store_name=${storeName}&bank=true`,
    BEARER_TOKEN
  );
};

export const fetchAgentSettingsInfo = async () => {
  return await axios.get(`${BaseURL_TWO}/agents/settings/?store_name=${storeName}`, BEARER_TOKEN);
};

export const fetchAgentsNotif = async () => {
  return await axios.get(
    `${BaseURL_TWO}/agents/notify_agent/?store_name=${storeName}`,
    BEARER_TOKEN
  );
};
export const UpdateAgentStatus = async body => {
  return axios.patch(`${BaseURL_TWO}/agents/notify_agent/`, body, BEARER_TOKEN);
};

export const UpdateSingleAgentNotif = async id => {
  return axios.patch(
    `${BaseURL_TWO}/agents/notify_agent/${parseInt(id)}`,
    {store_name: storeName},
    BEARER_TOKEN
  );
};

export const deleteAgentsBankDetail = async id => {
  return await axios.delete(
    `${BaseURL_TWO}/agents/settings/${parseInt(id)}?store_name=${storeName}`,
    BEARER_TOKEN
  );
};

export const updateAgentSettingsInfo = async body => {
  return await axios.patch(
    `${BaseURL_TWO}/agents/settings/?store_name=${storeName}`,
    body,
    BEARER_TOKEN
  );
};
export const withDrawForAgent = async body => {
  return await axios.post(`${BaseURL_TWO}/agents/withdrawals/`, body, BEARER_TOKEN);
};

export const AgentListings = async param => {
  return await axios.get(`${BaseURL_TWO}/store/agent_dashboard${param}`, BEARER_TOKEN);
};

export const AgentSingleListing = async param => {
  return await axios.get(
    `${BaseURL_ONE}/investment/project/${param}?store_name=${storeName}`,
    BEARER_TOKEN
  );
};

export const fetch_user_payment_breakdown_fractional = async (equity_id, user_id) => {
  return await axios.get(
    `${BaseURL_TWO}/agents/equity_breakdown/${equity_id}/?user=${user_id}&store_name=${storeName}`,
    BEARER_TOKEN
  );
};

export const fetch_user_payment_breakdown_fractional_payments = async user_id => {
  return await axios.get(
    `${BaseURL_TWO}/agents/equity_breakdown/?user=${user_id}&store_name=${storeName}&type=FRACTIONAL`,
    BEARER_TOKEN
  );
};

export const fetch_user_payment_breakdown_autopay = async (equity_id, user_id) => {
  return await axios.get(
    `${BaseURL_TWO}/agents/equity_breakdown/${equity_id}/?user=${user_id}&paymentStatus=PAID&store_name=${storeName}`,
    BEARER_TOKEN
  );
};

export const fetch_user_payment_breakdown_upcoming_payments = async (equity_id, user_id) => {
  return await axios.get(
    `${BaseURL_ONE}/transaction/upcoming?user=${user_id}&equity=${equity_id}`,
    BEARER_TOKEN
  );
};

export const fetch_user_payment_breakdown_past_payments = async (equity_id, user_id) => {
  return await axios.post(
    `${BaseURL_ONE}/transaction/equity/${parseInt(equity_id)}/`,
    {},
    BEARER_TOKEN
  );
};

export const fetchListingTransactions = async (id, filter, sort) => {
  return await axios.get(
    `${BaseURL_TWO}/agents/listing-customers/${id}/?store_name=${storeName}&${
      filter == '4'
        ? 'defaulting=true'
        : filter == '3'
        ? 'outstanding=false'
        : filter == '2'
        ? 'outstanding=true'
        : ''
    }${'&' + sort}`,
    BEARER_TOKEN
  );
};

export const Fractional = async param => {
  return await axios.get(`${BaseURL_TWO}/agents/fraction_details/${param}`, BEARER_TOKEN);
};

export const fetchAgentTerms = async () => {
  return await axios.get(`${BaseURL_TWO}/store/terms?store_name=${storeName}&type=agent`);
};

export const fetchAgentPrivacyPolicy = async () => {
  return await axios.get(
    `${BaseURL_TWO}/store/terms?store_name=${storeName}&type=agentprivacypolicy`
  );
};

export const agentListingTxns = async projectId => {
  return await axios.get(`${BaseURL_ONE}/transaction/project/${projectId}`, BEARER_TOKEN);
};
export const fetchInspectionHistoryForAgents = async param => {
  return await axios.get(
    `${BaseURL_TWO}/agents/inspection-history/${param.id}/?store_name=${storeName}${param.addedParam}      `,
    BEARER_TOKEN
  );
};

export const fetchAllListingBundles = async projectId => {
  return await axios.get(
    `${BaseURL_TWO}/investment/project-bundles/?project_id=${parseInt(projectId)}`,
    BEARER_TOKEN
  );
};

export const fetchAllListingBundleid = async projectId => {
  return await axios.get(
    `${BaseURL_TWO}/investment/project-bundles/?project_id=${parseInt(projectId)}`,
    BEARER_TOKEN
  );
};

export const fetchAllCommissions = async name => {
  return await axios.get(
    `${BaseURL_TWO}/agents/transactions?type=commission&store_name=${name}`,
    BEARER_TOKEN
  );
};

// agents/commission-request/<str:store>/

export const fetchRecentCommissions = async () => {
  return;
  await axios.get(`${BaseURL_TWO}/agents/commission-request/${storeName}/`, BEARER_TOKEN);
};

export const fetchAccountInfo = async name => {
  return await axios.get(`${BaseURL_TWO}/agents/account?store_name=${storeName}`, BEARER_TOKEN);
};

export const getAccountGraphDetails = async val => {
  return await axios.get(
    `${BaseURL_TWO}/agents/account/graph?store_name=${storeName}&${
      val == '3'
        ? `months=${12}`
        : val == '2'
        ? `weeks=${4}`
        : val == '1'
        ? `days=${7}`
        : `days=${7}`
    }`,
    BEARER_TOKEN
  );
};

export const fetchBanks = async () => {
  return await axios.get(`${BaseURL_TWO}/agents/withdrawals/?banks=true`, BEARER_TOKEN);
};

//post
// /v2/agent/withdrawals

export const addBankDetails = async ({bank_code: bankCode, account_number: accNum}) => {
  return await axios.post(
    `${BaseURL_TWO}/agents/withdrawals/`,
    {
      add_account: true,
      store_name: storeName,
      account_number: accNum,
      bank_code: bankCode,
    },
    BEARER_TOKEN
  );
};

export const agentSignUp = async form => {
  let nameOfStore = STORE__DOMAIN?.split('.')[0];
  let data = {...form, store_name: nameOfStore};
  return await axios.post(`${BaseURL_ONE}/user/agent`, data);
};

export const requestCommission = async (form, storeName) => {
  return await axios.post(
    `${BaseURL_TWO}/agents/commission-request/${storeName}/`,
    form,
    BEARER_TOKEN
  );
};

export const fetchTerms = async () => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/store/terms?store_name=${storeName}&customer_document=true`)
    .then(res => (response = res));
  return response;
};

export const fetchPrivacyPolicy = async () => {
  let response = [];

  await axios
    .get(`${BaseURL_TWO}/store/terms?store_name=${storeName}&customer_privacy_document=true`)
    .then(res => (response = res));
  return response;
};
