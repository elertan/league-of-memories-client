import Champion from "../../models/Champion";

export interface IGetSuccessState {
  getSuccess?: Champion[];
}

type State =
  IGetSuccessState;

export default State;
