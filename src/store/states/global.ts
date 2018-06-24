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

type GlobalState =
  ISetBackgroundImageState &
  ILoginSuccessState &
  ILoginFailState;

export default GlobalState;
