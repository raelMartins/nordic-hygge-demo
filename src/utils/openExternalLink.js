import Router from 'next/router';

const openExternalUrl = link => {
  Router.push(link);
};

export default openExternalUrl;
