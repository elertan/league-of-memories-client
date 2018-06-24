import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import LocalStorage from '../../LocalStorage';
import { GlobalStore, IAppState, ModalStore } from '../../store';
import IDispatchFunc from '../../store/IDispatchFunc';
import eulaModalCreator from '../ModalCreators/eulaModal';
import { Modal } from '../ModalManager';
import Button from '../UI/Button';
import Slider from '../UI/Slider';
import Spinner from '../UI/Spinner';

interface IStoreProps {
  modalStore: ModalStore.State;
  globalStore: GlobalStore.State;
}

interface IStoreActionProps {
  modalStoreActions: ModalStore.IActionCreators;
  globalStoreActions: GlobalStore.IActionCreators;
}

interface IProps extends IStoreProps, IStoreActionProps {}
interface IState {
  opacity: number;
}

class SettingsPage extends React.Component<IProps, {}> {
  public state = {
    opacity: LocalStorage.instance.data!.backgroundOpacity,
  };

  public render() {
    // tslint:disable-next-line:no-console
    return (
      <div>
        <div style={{ height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button onClick={() => this.props.modalStoreActions.openModal(eulaModalCreator)}>Show EULA Modal</Button>
        </div>
        <div style={{
          padding: 20,
          display: 'flex',
          alignItems: 'center',
        }}>
          <p>Background Opacity: </p>
          <div style={{flex: 1, marginLeft: 20, marginRight: 20}}>
            <Slider
              min={1}
              max={9}
              value={this.state.opacity * 10}
              onChange={(value) => {
                const opacity = value === 0 ? value : value / 10;

                const imageCss = this.props.globalStore.backgroundImage!;
                this.props.globalStoreActions.setBackgroundImage(
                  imageCss
                    .replace(this.state.opacity.toString(), opacity.toString())
                    .replace(this.state.opacity.toString(), opacity.toString()),
                );
                LocalStorage.instance.manipulateAndSave((data) => {
                  data.backgroundOpacity = opacity;
                  return data;
                });
                this.setState({opacity});
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: IAppState) => ({
    modalStore: state.modal,
    globalStore: state.global,
  } as IStoreProps),
  (dispatch: IDispatchFunc<Action>) => ({
    modalStoreActions: ModalStore.actionCreators(dispatch),
    globalStoreActions: GlobalStore.actionCreators(dispatch),
  } as IStoreActionProps),
)(SettingsPage);
