import axios from '../utils/axiosInstance';
import {BaseURL_ONE, store_name} from '../constants/routes.js';
import {getSession} from '../utils/sessionmanagers';

export const fetchWatchlist = async () => {
  const storeName = store_name();
  const user = await getSession('loggedIn');

  return await axios.get(`${BaseURL_ONE}/investment/watchlist/${user?.id}?store_name=${storeName}`);
};

export const toggleWatchlistApi = async propertyId => {
  const storeName = store_name();
  return await axios.post(
    `${BaseURL_ONE}/investment/watchlist/${propertyId}?store_name=${storeName}`
  );
};
