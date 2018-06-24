import User from '../../models/User';
import ActionNames from '../actionNames/global';
import IApiFailAction from '../IApiFailAction';

export interface ISetBackgroundImageAction {
  type: ActionNames.SetBackgroundImage;
  backgroundImage?: string;
}

export interface ILoginAction {
  type: ActionNames.Login;
}

export interface ILoginSuccessAction {
  type: ActionNames.LoginSuccess;
  user: User;
}

export interface ILoginFailAction extends IApiFailAction {
  type: ActionNames.LoginFail;
}

type KnownAction =
  ISetBackgroundImageAction |

  ILoginAction |
  ILoginSuccessAction |
  ILoginFailAction;

export default KnownAction;
