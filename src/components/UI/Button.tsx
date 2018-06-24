import * as React from 'react';
import colors from '../../colors';

interface IProps {
  onClick?: () => void;
}

interface IState {
  hovered: boolean;
}

const styles = {
  button: {
    display: 'inline-block',
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    border: `2px solid ${colors.leagueLight}`,
    fontSize: 14,
    cursor: 'hand',
    color: colors.lightText,
    background: 'rgb(20,20,20)',
    fontFamily: 'LeagueFont',
  } as React.CSSProperties,
  button_hover: {
    background: 'rgb(30,30,30)',
    boxShadow: '0 0 15px rgba(255, 215, 129, 0.8)',
  } as React.CSSProperties,
};

class Button extends React.Component<IProps, IState> {
  public state = {
    hovered: false,
  };

  public render() {
    return (
      <div
        style={this.getButtonStyle()}
        onClickCapture={this.props.onClick}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
      >
        {this.props.children}
      </div>
    );
  }

  private getButtonStyle() {
    if (this.state.hovered) {
      return Object.assign({}, styles.button, styles.button_hover);
    }

    return styles.button;
  }
}

export default Button;
