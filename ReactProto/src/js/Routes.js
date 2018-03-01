


import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import Status from './components/Status';
import SettingsEdit from './components/settings/SettingsEdit';
import Dashboard from './components/dashboard/Dashboard';

// import TBD from 'grommet/components/TBD';

export let routes = [
  { path: '/', component: P,
    childRoutes: [
      { path: 'login', component: Login },
      { path: 'reset-password', component: ResetPassword },
      { path: 'status', component: Status },
      { path: 'dashboard', component: Dashboard },     
      { path: 'settings/edit', component: SettingsEdit },
      { path: 'settings/update', component: Software }
    ]
  }
];
