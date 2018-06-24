import * as React from 'react';

import { ipcRenderer } from 'electron';
import { IPCEvents } from '../../ipc';
import { ModalCreatorFunc } from "../../store/actionCreators/modal";
import { Modal } from "../ModalManager";
import Button from '../UI/Button';

const styles = {
  title: {
    fontFamily: 'LeagueFont',
    fontSize: 21,
    textAlign: 'center',
  } as React.CSSProperties,
  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
  } as React.CSSProperties,
  buttonText: {
    fontSize: 14,
    fontFamily: 'LeagueFont',
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
  } as React.CSSProperties,
};

const welcomeModalCreator: ModalCreatorFunc = (close) => ({
  title: <p style={styles.title}>Welcome to SkinKK</p>,
  body:
  <div>
    <p style={{marginBottom: 10}}>
      Because this is your first launch,
      windows will prompt you for what network access you want to give SkinKK access to.
    </p>
    <p style={{marginBottom: 10}}>
      You can decline the prompt,
      as it isn't required for SkinKK to work. We are only using the loopback address on your computer.
    </p>
    <p style={{marginBottom: 10}}>If you have any features or suggestions, please join our Discord Server!</p>
  </div>,
  footer:
  <div style={styles.footerContainer}>
    <Button onClick={() => {
      ipcRenderer.send(IPCEvents.App_startLocalServer);
      close();
    }}>
      <p style={styles.buttonText}>I UNDERSTAND</p>
    </Button>
  </div>,
} as Modal);

export default welcomeModalCreator;
