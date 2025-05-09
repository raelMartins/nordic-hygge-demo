import {BaseURL_TWO, BaseURL_ONE} from '@/constants/routes';
import {store_name} from '../../constants/routes';
import {agent_auth_fetch} from '../../utils/axiosInstance';

export const fetchTermsAndConditionsPDF = async () => {
  let response = [];

  const storeName = store_name();
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/terms?type=agent&store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchCustomers = async params => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/customers/?store_name=${storeName}&${params}`)
    .then(res => (response = res));
  return response;
};

export const fetchCustomerInfo = async id => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/customers/${id}/?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchAgentProjectDocument = async (id, purpose) => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/project-documents?project_id=${id}&purpose=${purpose}`)
    .then(res => (response = res));
  return response;
};

export const fetchWithdrawAccounts = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/withdrawals/?accounts=true&store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};
export const fetchAllBundlePaymentPlanForAgents = async bundleId => {
  let response = [];

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/investment/bundle-paymentplans/?bundle_id=${bundleId}
`
    )
    .then(res => (response = res));
  return response;
};
export const fetchAgentRequest = async param => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/requests${param}`)
    .then(res => (response = res));
  return response;
};
export const fetchAgentsAccountUpcomingPayments = async ({date}) => {
  let response = [];
  let query = date === '0' ? '' : date;
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/account/upcomings${query}`)
    .then(res => (response = res));
  return response;
};

export const fetchAllWithdrawal = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/transactions?transaction_type=withdrawal&store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};
export const fetchWithdrawal = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      // `${BaseURL_TWO}/agents/transactions?store_name=${storeName}&type=withdrawal`,
      `${BaseURL_TWO}/agents/withdrawals/?store_name=${storeName}&transactions=true&withdrawal=true`
    )
    .then(res => (response = res));
  return response;
};

export const fetchAllListings = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/investment/project?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchBanksForAgents = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/settings/?store_name=${storeName}&bank=true`)
    .then(res => (response = res));
  return response;
};

export const fetchAgentSettingsInfo = async () => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/settings/?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchAgentsNotif = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/notify_agent/?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};
export const UpdateAgentStatus = async body => {
  return agent_auth_fetch.patch(`${BaseURL_TWO}/agents/notify_agent/`, body);
};

export const UpdateSingleAgentNotif = async id => {
  const storeName = store_name();

  return agent_auth_fetch.patch(`${BaseURL_TWO}/agents/notify_agent/${parseInt(id)}`, {
    store_name: storeName,
  });
};

export const deleteAgentsBankDetail = async id => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .delete(`${BaseURL_TWO}/agents/settings/${parseInt(id)}?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const updateAgentSettingsInfo = async body => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .patch(`${BaseURL_TWO}/agents/settings/?store_name=${storeName}`, body)
    .then(res => (response = res));
  return response;
};
export const withDrawForAgent = async body => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/agents/withdrawals/`, body)
    .then(res => (response = res));
  return response;
};

export const AgentListings = async param => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/agent_dashboard${param}`)
    .then(res => (response = res));
  return response;
};

export const AgentSingleListing = async param => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/investment/project/${param}?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetch_user_payment_breakdown_fractional = async (equity_id, user_id) => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/agents/equity_breakdown/${equity_id}/?user=${user_id}&store_name=${storeName}`
    )
    .then(res => (response = res));
  return response;
};

export const fetch_user_payment_breakdown_fractional_payments = async user_id => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/agents/equity_breakdown/?user=${user_id}&store_name=${storeName}&type=FRACTIONAL`
    )
    .then(res => (response = res));
  return response;
};

export const fetch_user_payment_breakdown_autopay = async (equity_id, user_id) => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/agents/equity_breakdown/${equity_id}/?user=${user_id}&paymentStatus=PAID&store_name=${storeName}`
    )
    .then(res => (response = res));
  return response;
};

export const fetch_user_payment_breakdown_upcoming_payments = async (equity_id, user_id) => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_ONE}/transaction/agent_upcoming?user=${user_id}&equity=${equity_id}`)
    .then(res => (response = res));
  return response;
};

export const fetch_user_payment_breakdown_past_payments = async equity_id => {
  let response = [];

  await agent_auth_fetch
    .post(`${BaseURL_ONE}/transaction/equity/${parseInt(equity_id)}/`, {})
    .then(res => (response = res));
  return response;
};

export const fetch_commision_payment_receipt = async equity_id => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/get-commissions-by-equity/${parseInt(equity_id)}/`, {})
    .then(res => (response = res));
  return response;
};

export const fetchListingTransactions = async (id, filter, sort) => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/agents/listing-customers/${id}/?store_name=${storeName}${
        filter == '4'
          ? '&defaulting=true'
          : filter == '3'
          ? '&outstanding=false'
          : filter == '2'
          ? '&outstanding=true'
          : ''
      } ${sort ? `&${sort}` : ''} `
    )
    .then(res => (response = res));
  return response;
};

export const Fractional = async param => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/fraction_details/${param}`)
    .then(res => (response = res));
  return response;
};

export const fetchTerms = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/terms?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const fetchAgentTerms = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/store/terms?store_name=${storeName}&type=agent`)
    .then(res => (response = res));
  return response;
};

export const fetchAgentPrivacyPolicy = async () => {
  const storeName = store_name();

  return await agent_auth_fetch.get(
    `${BaseURL_TWO}/store/terms?store_name=${storeName}&type=agentprivacypolicy`
  );
};

export const agentListingTxns = async projectId => {
  let response = [];
  await agent_auth_fetch
    .get(`${BaseURL_ONE}/transaction/project/${projectId}`)
    .then(res => (response = res));
  return response;
};
export const fetchInspectionHistoryForAgents = async param => {
  let response = [];

  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/agents/inspection-history/${param.id}/?store_name=${storeName}${param.addedParam}
      `
    )
    .then(res => (response = res));
  return response;
};

export const fetchAllListingBundles = async projectId => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${parseInt(projectId)}`)
    .then(res => (response = res));
  return response;
};

export const fetchAllListingBundleid = async projectId => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/investment/project-bundles/?project_id=${parseInt(projectId)}`)
    .then(res => (response = res));
  return response;
};

export const fetchAllCommissions = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/transactions?type=commission&store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

// agents/commission-request/<str:store>/

export const fetchRecentCommissions = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/commission-request/${storeName}/`)
    .then(res => (response = res));
  return response;
};

export const fetchAccountInfo = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/account?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const getAccountGraphDetails = async val => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(
      `${BaseURL_TWO}/agents/account/graph?store_name=${storeName}&${
        val == '4'
          ? `months=${12}`
          : val == '3'
          ? `weeks=${4}`
          : val == '2'
          ? `days=${7}`
          : val == '1'
          ? `days=${1}`
          : `days=${7}`
      }`
    )
    .then(res => (response = res));
  return response;
};

export const fetchBanks = async () => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/withdrawals/?banks=true`)
    .then(res => (response = res));
  return response;
};

//post
// /v2/agent/withdrawals

export const addBankDetails = async ({bank_code: bankCode, account_number: accNum}) => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/agents/withdrawals/`, {
      add_account: true,
      store_name: storeName,
      account_number: accNum,
      bank_code: bankCode,
    })
    .then(res => (response = res));
  return response;
};

export const agentSignUp = async form => {
  let response = [];
  const storeName = store_name();

  let data = {...form, store_name: storeName};
  await agent_auth_fetch.post(`${BaseURL_ONE}/user/agent`, data).then(res => (response = res));
  return response;
};

export const requestCommission = async form => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .post(`${BaseURL_TWO}/agents/commission-request/${storeName}/`, form)
    .then(res => (response = res));
  return response;
};

export const fetchOutrightContract = async unitId => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/developers/project-documents?unit=${unitId}&purpose=outright`)
    .then(res => (response = res));
  return response;
};

export const accountTransactions = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/transactions?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const totalOutstanding = async () => {
  let response = [];
  const storeName = store_name();

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/listing-customers/?store_name=${storeName}`)
    .then(res => (response = res));
  return response;
};

export const unitTransactions = async bundleId => {
  let response = [];

  await agent_auth_fetch
    .get(`${BaseURL_TWO}/agents/unit-equities/${bundleId}/`)
    .then(res => (response = res));
  return response;
};

export const getAgentAllContactPersons = async projectId => {
  return agent_auth_fetch.get(`${BaseURL_TWO}/developers/contact-persons?project=${projectId}`);
};
