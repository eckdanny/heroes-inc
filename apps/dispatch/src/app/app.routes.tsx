import React, { lazy } from 'react';

const Home = lazy(() => import('./modules/home/Home'));
const Intake = lazy(() => import('./modules/intake'));
const Directory = lazy(() => import('./modules/directory'));
const Dashboard = () => <div>Dashboard COMMING SOON...</div>;
const Dispatch = () => <div>Dispatch COMMING SOON...</div>;

export default [
  { path: '/', exact: true, name: 'Home', component: Home },
  { path: '/directory', name: 'Directory', component: Directory },
  { path: '/intake', name: 'Intake', component: Intake },
  { path: '/dispatch', name: 'Dispatch', component: Dispatch },
  { path: '/dashboad', name: 'Dashboard', component: Dashboard }
];
