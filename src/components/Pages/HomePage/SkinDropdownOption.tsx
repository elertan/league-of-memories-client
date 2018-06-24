import * as React from 'react';
import LeagueCDN from '../../../api/LeagueCDN';
import Champion from "../../../models/Champion";
import Skin from "../../../models/Skin";
import colors from '../../../colors';
import { connect } from 'react-redux';
import { IAppState } from '../../../store';
import IDispatchFunc from '../../../store/IDispatchFunc';
import { Action } from 'redux';
import { push } from 'react-router-redux';

interface IStoreActions {
  push: (route: string) => void;
}

interface IProps extends IStoreActions {
  champion: Champion;
  skin: Skin;
}

interface IState {
  hovered: boolean;
}

const styles = {
  container: {
    height: 50,
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'LeagueFont',
    color: colors.lightText,
    paddingLeft: 15,
  } as React.CSSProperties,
};

class SkinDropdownOption extends React.Component<IProps, IState> {
  public state = {
    hovered: false,
  };

  public render() {
    return (
      <div
        style={this.getContainerStyle()}
        onMouseEnter={() => this.setState({hovered: true})}
        onMouseLeave={() => this.setState({hovered: false})}
        onClick={() => this.props.push(`/browse/${this.props.champion.key}/${this.props.skin.num}`)}
      >
        {this.props.skin.name}
      </div>
    );
  }

  private getContainerStyle = () => {
    if (this.state.hovered) {
      return Object.assign({}, styles.container, {
        // tslint:disable-next-line:max-line-length
        backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.15)), url(${LeagueCDN.getChampionSplashUrl(this.props.champion.key, this.props.skin.num)})`
      } as React.CSSProperties);
    }

    return Object.assign({}, styles.container, {
      // tslint:disable-next-line:max-line-length
      backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${LeagueCDN.getChampionSplashUrl(this.props.champion.key, this.props.skin.num)})`
    } as React.CSSProperties);
  }
}

export default connect(
  (state: IAppState) => ({}),
  (dispatch: IDispatchFunc<Action>) => ({
    push: (route: string) => dispatch(push(route)),
  } as IStoreActions),
)(SkinDropdownOption);
