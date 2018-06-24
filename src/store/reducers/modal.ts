import { Action, Reducer } from 'redux';
import { Modal } from '../../components/ModalManager';
import ActionNames from '../actionNames/modal';
import KnownAction from '../actions/modal';
import State, { IModalState } from '../states/modal';

const initialState: State = {
  modals: [],
};

const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionNames.OpenModal: {
      return Object.assign({}, state, {
        modals: [...state.modals, action.modal],
      } as IModalState);
    }
  }
  switch (action.type) {
    case ActionNames.CloseModal: {
      return Object.assign({}, state, {
        modals: [...state.modals.filter((m: Modal) => m.id !== action.modalId)],
      } as IModalState);
    }
  }
  return state || initialState;
};

export default reducer;
