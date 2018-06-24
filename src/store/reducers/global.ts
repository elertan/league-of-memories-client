import { Action, Reducer } from 'redux';
import ActionNames from '../actionNames/global';
import KnownAction from '../actions/global';
import State, {
  ILoginFailState,
  ILoginSuccessState,
  ISetBackgroundImageState,
} from '../states/global';

const initialState: State = {};

const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionNames.SetBackgroundImage: {
      return Object.assign({}, state, {
        backgroundImage: action.backgroundImage,
      } as ISetBackgroundImageState);
    }
    case ActionNames.LoginSuccess: {
      return Object.assign({}, state, {
        loginSuccess: action.user,
      } as ILoginSuccessState);
    }
    case ActionNames.LoginFail: {
      return Object.assign({}, state, {
        loginFail: action.error,
      } as ILoginFailState);
    }
  }

  return state || initialState;
};

export default reducer;
