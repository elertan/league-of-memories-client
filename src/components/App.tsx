import * as React from "react";
import colors from '../colors';

import { ipcRenderer } from "electron";
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { AnyAction } from "redux";
import LeagueCDN from "../api/LeagueCDN";
import StyleHelper from "../helpers/StyleHelper";
import { IPCEvents } from "../ipc";
import LocalStorage from "../LocalStorage";
import routes from '../routes';
import {
  GlobalStore, IAppState, ModalStore,
} from '../store';
import IDispatchFunc from "../store/IDispatchFunc";
import ohUhModalCreator from "./ModalCreators/uhOhModal";
import welcomeModalCreator from "./ModalCreators/welcomeModal";
import ModalManager, { Modal } from "./ModalManager";
import Titlebar from "./Titlebar";
import Spinner from "./UI/Spinner";

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    color: '#EEE',
    border: `1px solid ${colors.leagueLight}`,
    borderTop: `3px solid ${colors.leagueLight2}`,
    overflow: 'hidden',
  } as React.CSSProperties,
  preBackgroundContainer: {
    backgroundColor: '#000',
    width: '100vw',
    height: '100vh',
  } as React.CSSProperties,
  backgroundContainer: {
    // backgroundImage: 'url(./assets/img/background.png)',
    filter: 'blur(10px)',
    // We need the transform to remove the halo effect with blur(). (White glowing effect at the sides)
    transform: 'scale(1.1)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    bottom: '100vh',
  } as React.CSSProperties,
  contentContainer: {
    position: 'relative',
    bottom: '200vh',
  } as React.CSSProperties,
  routeContainer: {
    width: '100%',
    height: '100%',
  } as React.CSSProperties,
};

interface IStoreProps {
  modalStore: ModalStore.State;
  globalStore: GlobalStore.State;
}

interface IStoreActions {
  modalStoreActions: ModalStore.IActionCreators;
  globalStoreActions: GlobalStore.IActionCreators;
}

// tslint:disable-next-line:no-empty-interface
interface IProps extends RouteComponentProps<{}>, IStoreProps, IStoreActions {
}

interface IState {
  loading: boolean;
}

class App extends React.Component<IProps, IState> {
  public state = {
    loading: false,
  };

  public componentDidMount() {
    ipcRenderer.on(
      IPCEvents.App_startLocalServerFail,
      () => this.props.modalStoreActions.openModal(ohUhModalCreator(
        'The local server cannot be started.\n\
        \
        It might be related due to the fact that port 13370 is in use, \
        or you might have declined the Firewall Prompt, in which case you\'ll \
        need to manually enable it in your firewall settings.',
      )),
    );
    if (LocalStorage.instance.data!.isFirstLaunch) {
      // Show dialog to start local server
      this.props.modalStoreActions.openModal(welcomeModalCreator);
      LocalStorage.instance.manipulateAndSave((data) => {
        data.isFirstLaunch = false;
        return data;
      });
    }

    // tslint:disable-next-line:max-line-length
    this.props.globalStoreActions.setBackgroundImage(StyleHelper.getAppBackgroundForImageUrl(LeagueCDN.getDefaultBackgroundImage()));
  }

  public render() {
    if (this.state.loading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div style={styles.container}>
        <div style={styles.preBackgroundContainer}>
          <Spinner />
        </div>
        <div style={this.getBackgroundContainerStyle()} />
        <div style={styles.contentContainer}>
          <Titlebar routeName={this.props.location.pathname} />
          <div style={styles.routeContainer}>
            {routes}
          </div>
        </div>
        <ModalManager modals={this.props.modalStore.modals} />
      </div>
    );
  }

  private getBackgroundContainerStyle() {
    // This will optionally set the background for the entire application
    if (this.props.globalStore.backgroundImage) {
      return Object.assign(
        {},
        styles.backgroundContainer,
        { backgroundImage: this.props.globalStore.backgroundImage! } as React.CSSProperties,
      );
    }

    return styles.backgroundContainer;
  }
}

export default withRouter(connect(
  (state: IAppState) => ({
    globalStore: state.global,
    modalStore: state.modal,
  } as IStoreProps),
  (dispatch: IDispatchFunc<AnyAction>) => ({
    globalStoreActions: GlobalStore.actionCreators(dispatch),
    modalStoreActions: ModalStore.actionCreators(dispatch),
  } as IStoreActions),
)(App) as any);
