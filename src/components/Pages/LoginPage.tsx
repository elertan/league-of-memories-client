import * as React from 'react';
import TextField from '../UI/TextField';
import Button from '../UI/Button';
import colors from '../../colors';
import Checkbox from '../UI/Checkbox';
import Spinner from '../UI/Spinner';
import LocalStorage from '../../LocalStorage';
import { connect } from 'react-redux';
import { IAppState, ModalStore } from '../../store';
import IDispatchFunc from '../../store/IDispatchFunc';
import { Action } from 'redux';
import { Modal } from '../ModalManager';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    bottom: 40,
    height: '120%',
  } as React.CSSProperties,
  emptySpace: {
    flex: 1
  } as React.CSSProperties,
  loginContainer: {
    borderLeft: '1px solid #222',
    width: 225,
    backgroundColor: 'rgb(9, 18, 28)',
    height: '120%',
    padding: 15,
    paddingTop: 100,
    fontSize: 12,
  } as React.CSSProperties,
  headerText: {
    fontFamily: 'LeagueFont',
    fontSize: 21,
  } as React.CSSProperties,
  formContainer: {
    color: '#BBB',
    fontSize: 12,
    marginTop: 35
  },
  usernameContainer: {
    marginBottom: 20
  },
  passwordContainer: {
    marginBottom: 20
  },
  rememberMeContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  } as React.CSSProperties,
  signInContainer: {
    marginTop: 50
  },
  signInButton: {
    width: '100%',
    border: `2px solid ${colors.blue}`
  } as React.CSSProperties,
  signInButtonText: {
    width: '100%',
    padding: 3,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    fontFamily: 'LeagueFont'
  } as React.CSSProperties,
};

interface IReduxStore {
  modalStore: ModalStore.State;
}

interface IReduxStoreActions {
  modalStoreActions: ModalStore.IActionCreators;
}

interface IProps extends IReduxStore, IReduxStoreActions {}

interface IState {
  rememberMe: boolean;
  username: string;
  password: string;
  disableLoginMusic: boolean;
  busy: boolean;
}

class LoginPage extends React.Component<IProps, IState> {
  private player: HTMLVideoElement;

  public state = {
    rememberMe: true,
    username: LocalStorage.instance.data!.username,
    password: '',
    disableLoginMusic: LocalStorage.instance.data!.loginMusicDisabled,
    busy: false
  };

  public render() {
    return (
      <div style={styles.container}>
        <div style={styles.emptySpace}>
          <video autoPlay loop style={{
            minWidth: '100%',
            minHeight: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            WebkitTransform: 'translateX(calc(-50% - 340px)) translateY(-50%)',
            width: 'auto',
            height: 'auto',
            overflow: 'hidden'
          }}
          ref={(ref) => {
            if (!ref) return;

            this.player = ref;
            this.player.volume = 0.2;
            this.player.muted = this.state.disableLoginMusic;
          }}>
            <source src="./assets/video/login.mp4" />
          </video>
          <div style={{
            position: 'absolute',
            bottom: 110,
            left: 20,
            display: 'flex',
            flexDirection: 'row',
            fontSize: 12,
            color: '#AAA',
            alignItems: 'center',
            textShadow: '2px 2px 2px #000',
          }}>
            <Checkbox
              checked={this.state.disableLoginMusic}
              onChanged={(disableLoginMusic) => { 
                this.setState({disableLoginMusic});
                LocalStorage.instance.manipulateAndSave(data => {
                  data.loginMusicDisabled = disableLoginMusic;
                  return data;
                });
                this.player.muted = disableLoginMusic;
              }}
            />
            <p style={{marginLeft: 5}}>Disable Login Music</p>
          </div>
        </div>
        <div style={styles.loginContainer}>
          <p style={styles.headerText}>SIGN IN</p>
          <div style={styles.formContainer}>
            <div style={styles.usernameContainer}>
              <p style={{marginBottom: 5}}>Username</p>
              <TextField
                disabled={this.state.busy}
                value={this.state.username}
                onChange={(username) => this.setState({username})}
              />
            </div>
            <div style={styles.passwordContainer}>
              <p style={{marginBottom: 5}}>Password</p>
              <TextField
                disabled={this.state.busy}
                value={this.state.password}
                onChange={(password) => this.setState({password})}
                password
              />
            </div>
            <div style={styles.rememberMeContainer}>
              <Checkbox
                checked={this.state.rememberMe}
                onChanged={(rememberMe) => this.setState({rememberMe})}
                disabled={this.state.busy}
              />
              <p style={{marginLeft: 5}}>Remember Me</p>
            </div>
            <div style={styles.signInContainer}>
              <Button
                style={styles.signInButton}
                onClick={this.handleLogin}
                disabled={this.state.busy}
              >
                <p style={styles.signInButtonText}>SIGN IN</p>
              </Button>
            </div>
            {this.state.busy &&
            <Spinner />
            }
          </div>
        </div>
        {/* <audio
          ref={(el) => { 
            if (!el) return;

            this.audio = el; 
            el.volume = 0.2; 
          }}
          autoPlay
          loop
        >
          <source src="./assets/audio/login.mp3" />
        </audio> */}
      </div>
    );
  }

  private handleLogin = () => {
    this.setState({busy: true});
    setTimeout(() => {
      this.props.modalStoreActions.openModal((close) => ({
        title: 'Login failed',
        body: 'Your username or password is incorrect.',
        footer: <div>
          <Button onClick={close}><p>OK</p></Button>
        </div>
      } as Modal));
      this.setState({busy: false});
    }, 1500);
  }
}

export default connect(
  (state: IAppState) => ({
    modalStore: state.modal
  } as IReduxStore),
  (dispatch: IDispatchFunc<Action>) => ({
    modalStoreActions: ModalStore.actionCreators(dispatch)
  } as IReduxStoreActions)
)(LoginPage);
