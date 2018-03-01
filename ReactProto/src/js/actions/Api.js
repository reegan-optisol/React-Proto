

import Rest from 'grommet/utils/Rest';
import RestWatch from './RestWatch';



export function setHeaders (headers) {
  Rest.setHeaders(headers);
}

export function configure (options) {
  pageSize = options.pageSize || pageSize;
  pollingInterval = options.pollingInterval || pollingInterval;
  simulateRestCalls = options.simulateRestCalls || simulateRestCalls;
  urlPrefix = options.urlPrefix || urlPrefix;
}

export function postLogin (userName, password, handler) {
  const params = {
    userName: userName,
    password: password,
    authLoginDomain: 'LOCAL'
  };
  Rest.post(urlPrefix + '/rest/login-sessions', params).end(handler);
}

export function postResetPassword (userName, password, handler) {
  const params = {
    userName: userName,
    password: password
  };
  Rest.post(urlPrefix + '/rest/reset-password', params).end(handler);
}

export function postLogout (handler) {
  Rest.del(urlPrefix + '/rest/login-sessions').end(handler);
}


export function headCheck (url, handler) {
  Rest.head(url).end(handler);
}

const watches = {};

function failure (err) {
  // Just log for now
  console.log('Api failure', err);
}


