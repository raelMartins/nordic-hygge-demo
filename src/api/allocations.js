import axios from '../utils/axiosInstance';
import {BaseURL_TWO} from '../constants/routes.js';

export const fetchUnitAllocations = async unit_id => {
  return await axios
    .get(`${BaseURL_TWO}/developers/allocations/?unit_id=${unit_id}`)
    .then(res => res);
};
export const fetchUnitAllocationImages = async unit_id => {
  return await axios
    .get(`${BaseURL_TWO}/developers/allocation-images?unit=${unit_id}`)
    .then(res => res);
};

export const addAllocationToEquity = async allocationPayload => {
  return await axios
    .post(`${BaseURL_TWO}/developers/allocate/`, allocationPayload)
    .then(res => res);
};
