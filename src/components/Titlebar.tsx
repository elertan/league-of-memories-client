import { ipcRenderer } from 'electron';
import * as React from "react";
import colors from '../colors';

import NavBar from './Titlebar/NavBar';
import { IPCEvents } from '../ipc';

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    width: "100%",
    background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0))',
  } as React.CSSProperties,
  logoContainer: {
    paddingLeft: 15,
    paddingRight: 25,
  } as React.CSSProperties,
  logo: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: 'LeagueFont',
    textShadow: '2px 2px 2px #000',
  } as React.CSSProperties,
  navBarContainer: {
    marginTop: 16,
  } as React.CSSProperties,
  titlebarActionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 15,
  } as React.CSSProperties,
  minimizeButton: {
    marginRight: 15,
    position: 'relative',
    top: 3,
  } as React.CSSProperties,
  maximizeButton: {
    marginRight: 15,
  } as React.CSSProperties,
  actionButton_Hover: {
    color: colors.leagueSuperLight,
  } as React.CSSProperties,
};

interface IProps {
  routeName: string;
}

interface IState {
  minimizeButtonHovered: boolean;
  maximizeButtonHovered: boolean;
  closeButtonHovered: boolean;
}

class Titlebar extends React.Component<IProps, IState> {
  public state = {
    minimizeButtonHovered: false,
    maximizeButtonHovered: false,
    closeButtonHovered: false,
  };

  public render() {
    return (
      <div style={styles.container}>
        {/* Logo */}
        <div className="drag-region" style={styles.logoContainer}>
          <p style={styles.logo}>SkinKK</p>
        </div>
        {/* NavBar */}
        <div style={styles.navBarContainer}>
          <NavBar routeName={this.props.routeName} />
        </div>
        {/* Empty Drag Space */}
        <div className="drag-region" style={{flex: 1}} />
        {/* Titlebar Actions */}
        <div style={styles.titlebarActionsContainer}>
            <i
              className="fas fa-minus"
              style={this.getMinimizeButtonStyle()}
              onClick={() => ipcRenderer.send(IPCEvents.titlebar_minimize)}
              onMouseEnter={() => this.setState({minimizeButtonHovered: true})}
              onMouseLeave={() => this.setState({minimizeButtonHovered: false})}
            />
            <i
              className="far fa-window-maximize"
              style={this.getMaximizeButtonStyle()}
              onClick={() => ipcRenderer.send(IPCEvents.titlebar_maximize)}
              onMouseEnter={() => this.setState({maximizeButtonHovered: true})}
              onMouseLeave={() => this.setState({maximizeButtonHovered: false})}
            />
            <i
              className="fas fa-window-close"
              style={this.getCloseButtonStyle()}
              onClick={() => ipcRenderer.send(IPCEvents.titlebar_close)}
              onMouseEnter={() => this.setState({closeButtonHovered: true})}
              onMouseLeave={() => this.setState({closeButtonHovered: false})}
            />
        </div>
      </div>
    );
  }

  private getMinimizeButtonStyle = () => {
    if (this.state.minimizeButtonHovered) {
      return Object.assign({}, styles.minimizeButton, styles.actionButton_Hover);
    }
    return styles.minimizeButton;
  }

  private getMaximizeButtonStyle = () => {
    if (this.state.maximizeButtonHovered) {
      return Object.assign({}, styles.maximizeButton, styles.actionButton_Hover);
    }
    return styles.maximizeButton;
  }

  private getCloseButtonStyle = () => {
    if (this.state.closeButtonHovered) {
      return styles.actionButton_Hover;
    }
    return undefined;
  }
}

export default Titlebar;
