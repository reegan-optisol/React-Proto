

import '../scss/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { getCurrentLocale, getLocaleData } from 'grommet/utils/Locale';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import { configure as apiConfigure } from './actions/Api';
import { routes } from './Routes';
////import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

import store from './store';
import history from './RouteHistory';
import Session from './Session';
import { routeChanged } from './actions/route';

const ROUTE_PREFIX = '/';
history.prefix(ROUTE_PREFIX);
apiConfigure({ urlPrefix: ROUTE_PREFIX });

let createStoreHistory = () => {
  return {
    listen: (callback) => {   
      let notify = () => {
        const route = store.getState().route;
        if (route) {
          callback(route);
        }
      };
      const unsubscribe = store.subscribe(notify);

      return unsubscribe;
    },
    createHref: history.createHref,
    push: history.push
  };
};

let locale = getCurrentLocale();
addLocaleData(en);

let messages;
try {
  // rtl driven by hardcoding languages for now
  if ('he' === locale || 'ar' === locale.slice(0, 2)) {
    document.documentElement.classList.add("rtl");
  } else {
    document.documentElement.classList.remove("rtl");
  }
  messages = require('../messages/' + locale);
} catch (e) {
  messages = require('../messages/en-US');
}
var localeData = getLocaleData(messages, locale);

let element = document.getElementById('content');

ReactDOM.render((
  <div>
    <Provider store={store}>
      <IntlProvider locale={localeData.locale} messages={localeData.messages}>
        <Router routes={routes} history={createStoreHistory()} />
      </IntlProvider>
    </Provider>
    {/*}
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
    {*/}
  </div>
), element);

document.body.classList.remove('loading');

Session.init();

// listen for history changes and initiate routeChanged actions for them
history.listen(function (location) {
  store.dispatch(routeChanged(location));
});
