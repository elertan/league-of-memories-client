import ApiError from "../../api/ApiError";
import User from "../../models/User";

export interface ISetBackgroundImageState {
  backgroundImage?: string;
}

export interface ILoginSuccessState {
  loginSuccess?: User;
}

export interface ILoginFailState {
  loginFail?: ApiError;
}

export interface IState {
  user?: any;
}

type GlobalState =
  ISetBackgroundImageState &
  ILoginSuccessState &
  ILoginFailState &
  IState;

export default GlobalState;
