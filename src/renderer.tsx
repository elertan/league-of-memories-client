import { createMemoryHistory, History } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AnyAction, Store } from "redux";
import App from "./components/App";
import LocalStorage from "./LocalStorage";
import configureStore, { IAppState } from './store';

// if (process.env.NODE_ENV === 'development') {
//   // tslint:disable-next-line:no-var-requires
//   const electronHot = require('electron-hot-loader');
//   electronHot.install();
//   electronHot.watchJsx(['dist/**/*.js']);
//   electronHot.watchCss(['assets/**/*.css']);
// }

// tslint:disable-next-line:no-shadowed-variable
const syncHistoryWithStore = (store: Store<IAppState, AnyAction>, history: History) => {
  const { routing } = store.getState() as any;
  if (routing && routing.location) {
    history.replace(routing.location);
  }
};

// Initialize the localstorage
LocalStorage.instance.initialize();

// tslint:disable-next-line:no-debugger
const initialState = {} as IAppState;
export const routerHistory = createMemoryHistory();
export const store = configureStore(initialState, routerHistory);
syncHistoryWithStore(store, routerHistory);

ReactDOM.render(
  <Provider store ={store}>
    <ConnectedRouter history={routerHistory}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
