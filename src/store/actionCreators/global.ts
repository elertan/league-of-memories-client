import User from '../../models/User';
import ActionNames from '../actionNames/global';
import KnownAction, {
  ILoginAction,
  ILoginFailAction,
  ILoginSuccessAction,
  ISetBackgroundImageAction,
} from '../actions/global';
import IDispatchFunc from '../IDispatchFunc';

export interface IActionCreators {
  /**
   * Sets the backgroundImage property on the App component, make sure you use CSS Syntax.
   * e.g. url(path/to/my/image.ext)
   * Set it to undefined to undo the set background
   */
  setBackgroundImage: (backgroundImage?: string) => void;
  login: (username: string, password: string) => Promise<void>;
}

export default (dispatch: IDispatchFunc<KnownAction>) => ({
  setBackgroundImage: (backgroundImage?: string) => dispatch({
    type: ActionNames.SetBackgroundImage,
    backgroundImage,
   } as ISetBackgroundImageAction),
  login: async (username: string, password: string) => {
    dispatch({
      type: ActionNames.Login,
    } as ILoginAction);
    const user = new User();
    user.firstname = "Test";
    user.lastname = "Test";
    user.username = "elertan";

    // TODO: Add login logic

    dispatch({
      type: ActionNames.LoginSuccess,
      user,
    } as ILoginSuccessAction);
  },
} as IActionCreators);
