import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { AnyAction } from 'redux';
import LeagueCDN from '../../api/LeagueCDN';
import Champion from '../../models/Champion';
import { ChampionsStore, IAppState } from '../../store';
import IDispatchFunc from '../../store/IDispatchFunc';
import ChampionGrid from '../League/ChampionGrid';
import Spinner from '../UI/Spinner';

interface IStoreProps {
  championsStore: ChampionsStore.State;
}

interface IStoreActions {
  championsStoreActions: ChampionsStore.IActionCreators;
  push: (route: string) => void;
}

interface IProps extends IStoreProps, IStoreActions {}
// tslint:disable-next-line:no-empty-interface
interface IState {}

const styles = {
  container: {
    height: 'calc(100vh - 40px)',
    overflowY: 'auto',
  } as React.CSSProperties,
};

class BrowsePage extends React.Component<IProps, IState> {
  public state = {
  };

  public componentDidMount() {
    if (!this.props.championsStore.getSuccess) {
      this.props.championsStoreActions.get();
    }
  }

  public render() {
    return (
      <div style={styles.container}>
        {!this.props.championsStore.getSuccess &&
        <Spinner />
        }
        <ChampionGrid
          champions={this.props.championsStore.getSuccess || []}
          onChampionClick={(champion: Champion) => this.props.push(`/browse/${champion.key}`)}
        />
      </div>
    );
  }
}

export default connect(
  (state: IAppState) => ({
    championsStore: state.champions,
  } as IStoreProps),
  (dispatch: IDispatchFunc<AnyAction>) => ({
    championsStoreActions: ChampionsStore.actionCreators(dispatch),
    push: (route: string) => dispatch(push(route)),
  } as IStoreActions),
)(BrowsePage);
