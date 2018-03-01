

import Rest from 'grommet/utils/Rest';
import store from './store';
import history from './RouteHistory';
import { init } from './actions/session';

let localStorage = window.localStorage;
let eventualPath;

function initialize () {
  // init from localStorage
  if (localStorage.token) {
    Rest.setHeaders({
      'Accept': 'application/json',
      'Auth': localStorage.token,
      'X-API-Version': 200
    });
  }
  store.dispatch(init(localStorage.userName, localStorage.token, localStorage.role));

  store.subscribe(sessionWatcher);
}

function sessionWatcher () {
  const {route, session, status} = store.getState();
  if (route) {

    if (route.pathname === '/login') {
      if (session.token) {
        localStorage.userName = session.userName;
        localStorage.token = session.token;
        localStorage.role = session.role;
        history.push(eventualPath || '/status');
      }

    } else if (! session.token &&
      route.pathname !== '/login') {
      localStorage.removeItem('userName');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      eventualPath = route.pathname;
      history.push('/login');

    } else if (session.needPasswordReset &&
      route.pathname !== '/reset-password') {
      history.push('/reset-password');

    } else if (route.pathname === '/reset-password') {
      if (! session.needPasswordReset) {
        history.push(eventualPath || '/status');
      }

    } else if (status.busy &&
      route.pathname !== '/status') {
      eventualPath = route.pathname;
      history.push('/status');

    } else if (route.pathname === '/status') {
      if ('ready' === status.state && eventualPath) {
        history.push(eventualPath);
      } else if ('settingUp' === status.state ||
        'restoring' === status.state ||
        'updating' === status.state) {
        eventualPath = session.home;
      }

    } else if ('initialized' === status.state &&
      route.pathname !== '/settings/edit' &&
      route.pathname !== '/restore') {
      history.push('/settings/edit');

    } else if (route.pathname === '/') {
      history.replace(session.home);
    }

    // If this is the first time setup, remain on status when ready
    if ('initialized' === status.state) {
      eventualPath = null;
    }
  }
};

module.exports = {
  init: initialize
};
