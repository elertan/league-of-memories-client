import * as React from 'react';
import TextField from '../UI/TextField';
import Button from '../UI/Button';
import colors from '../../colors';
import Checkbox from '../UI/Checkbox';

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

class LoginPage extends React.Component<{}, {}> {
  public render() {
    return (
      <div style={styles.container}>
        <div style={styles.emptySpace} />
        <div style={styles.loginContainer}>
          <p style={styles.headerText}>SIGN IN</p>
          <div style={styles.formContainer}>
            <div style={styles.usernameContainer}>
              <p style={{marginBottom: 5}}>Username</p>
              <TextField
                value="elertan"
              />
            </div>
            <div style={styles.passwordContainer}>
              <p style={{marginBottom: 5}}>Password</p>
              <TextField
                password
              />
            </div>
            <div style={styles.rememberMeContainer}>
              <Checkbox />
              <p style={{marginLeft: 5}}>Remember Me</p>
            </div>
            <div style={styles.signInContainer}>
              <Button style={styles.signInButton}>
                <p style={styles.signInButtonText}>SIGN IN</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
