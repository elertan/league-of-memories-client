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
  bodyContainer: {
    display: 'flex',
  },
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
  image: {} as React.CSSProperties,
};

const ohUhModalCreator = (description: string, title: string = 'Uh Oh!'): ModalCreatorFunc => (close) => ({
  title: <p style={styles.title}>{title}</p>,
  body:
  <div style={styles.bodyContainer}>
    <img
      style={styles.image}
      src="./assets/img/uh-oh.png"
    />
    <p style={{whiteSpace: 'pre-wrap', flex: 1}}>{description}</p>
  </div>,
  footer:
  <div style={styles.footerContainer}>
    <Button onClick={close}>
      <p style={styles.buttonText}>OK</p>
    </Button>
  </div>,
} as Modal);

export default ohUhModalCreator;
