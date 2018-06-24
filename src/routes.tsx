import * as React from 'react';
import {
  Route,
  Switch,
} from 'react-router';

import BrowsePage from './components/Pages/BrowsePage';
import BrowseDetailPage from './components/Pages/BrowsePage/DetailPage';
import HomePage from './components/Pages/HomePage';
import SettingsPage from './components/Pages/SettingsPage';
import LoginPage from './components/Pages/LoginPage';

export default (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/browse" component={BrowsePage} />
    <Route exact path="/browse/:key" component={BrowseDetailPage} />
    <Route exact path="/browse/:key/:num" component={BrowseDetailPage} />
    <Route exact path="/settings" component={SettingsPage} />
  </Switch>
);
