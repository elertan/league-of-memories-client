import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';
import { Action } from 'redux';
import LeagueCDN from '../../../api/LeagueCDN';
import StyleHelper from '../../../helpers/StyleHelper';
import Champion from '../../../models/Champion';
import Skin from '../../../models/Skin';
import { ChampionsStore, GlobalStore, IAppState } from '../../../store';
import IDispatchFunc from '../../../store/IDispatchFunc';
import Button from '../../UI/Button';
import Spinner from '../../UI/Spinner';
import SkinSelector from './SkinSelector';

interface IRouteParams {
  key: string;
  num?: number;
}

interface IStoreProps {
  globalStore: GlobalStore.State;
  championsStore: ChampionsStore.State;
}

interface IStoreActions {
  globalStoreActions: GlobalStore.IActionCreators;
  championsStoreActions: ChampionsStore.IActionCreators;
  push: (route: string) => void;
}

interface IProps extends RouteComponentProps<IRouteParams>, IStoreProps, IStoreActions {}

interface IState {
  champion?: Champion;
  selectedSkin?: Skin;
}

const styles = {
  container: {
    height: 'calc(100vh - 50px)',
    justifyContent: 'space-between',
    flexDirection: 'column',
  } as React.CSSProperties,
  topRowContainer: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  } as React.CSSProperties,
  backButtonContainer: {
    position: 'relative',
    bottom: 30,
    zIndex: 999,
  } as React.CSSProperties,
  backButtonIcon: {
    fontSize: 21,
  } as React.CSSProperties,
  championName: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: 'LeagueFont',
  } as React.CSSProperties,
  skinSelectorContainer: {
    height: '100%',
    position: 'relative',
    bottom: 70,
  } as React.CSSProperties,
};

class DetailPage extends React.Component<IProps, IState> {
  public state = {
    champion: undefined as Champion,
    selectedSkin: undefined as Skin,
  };

  public componentDidMount() {
    const championKey = this.props.match.params.key;
    const champion = this.props.championsStore.getSuccess!.find((c: Champion) => c.key === championKey);
    const skin = champion.skins.find((s) => s.num === (Number(this.props.match.params.num || 0)));
    this.setState({
      champion,
      selectedSkin: skin,
    });
    // tslint:disable-next-line:max-line-length
    this.props.globalStoreActions.setBackgroundImage(StyleHelper.getAppBackgroundForImageUrl(LeagueCDN.getChampionSplashUrl(champion.key, skin.num)));
  }

  public render() {
    if (!this.state.champion) {
      return (<Spinner />);
    }

    return (
      <div style={styles.container}>
        <div style={styles.topRowContainer}>
          <h1 style={styles.championName}>{this.state.champion.name}</h1>
          <div style={styles.backButtonContainer}>
            <Button
              onClick={() => this.props.push('/browse')}
            >
              <i
                style={styles.backButtonIcon}
                className="fas fa-angle-left"
              />
            </Button>
          </div>
        </div>
        <div style={styles.skinSelectorContainer}>
          <SkinSelector
            champion={this.state.champion}
            selectedSkin={this.state.selectedSkin}
            onSkinChanged={(s: Skin) => {
              this.setState({ selectedSkin: s });
              // tslint:disable-next-line:max-line-length
              this.props.globalStoreActions.setBackgroundImage(StyleHelper.getAppBackgroundForImageUrl(LeagueCDN.getChampionSplashUrl(this.state.champion.key, s.num)));
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IAppState) => ({
    globalStore: state.global,
    championsStore: state.champions,
  } as IStoreProps),
  (dispatch: IDispatchFunc<Action>) => ({
    globalStoreActions: GlobalStore.actionCreators(dispatch),
    championsStoreActions: ChampionsStore.actionCreators(dispatch),
    push: (route: string) => dispatch(push(route)),
  } as IStoreActions),
)(DetailPage);
