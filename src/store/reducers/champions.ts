import { Action, Reducer } from "redux";
import ActionNames from "../actionNames/champion";
import KnownAction from "../actions/champions";
import State, { IGetSuccessState } from "../states/champions";

const initialState: State = {};

const reducer: Reducer<State> = (state: State, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionNames.GetSuccess: {
      return Object.assign({}, state, {
        getSuccess: action.champions,
      } as IGetSuccessState);
    }
  }

  return state || initialState;
};

export default reducer;
