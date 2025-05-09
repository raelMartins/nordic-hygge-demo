import {useState, useEffect} from 'react';
import {getSession} from '../sessionmanagers';

const useGetSession = keyOrKeys => {
  const [sessionData, setSessionData] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      if (Array.isArray(keyOrKeys)) {
        const sessions = {};

        for (const key of keyOrKeys) {
          const data = await getSession(key);
          sessions[key] = data;
        }

        setSessionData(sessions);
        setFetching(false);
      } else {
        const data = await getSession(keyOrKeys);
        setSessionData(data);
        setFetching(false);
      }
    };

    fetchSessions();
  }, []);

  return {
    sessionData,
    fetching,
  };
};

export default useGetSession;
