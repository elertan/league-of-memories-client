import LeagueCDN from "../../api/LeagueCDN";
import ActionNames from "../actionNames/champion";
import KnownAction, { IGetAction, IGetSuccessAction } from "../actions/champions";
import IDispatchFunc from "../IDispatchFunc";

export interface IActionCreators {
  get: () => Promise<void>;
}

export default (dispatch: IDispatchFunc<KnownAction>) => ({
  get: async () => {
    dispatch({
      type: ActionNames.Get,
    } as IGetAction);
    const champions = await LeagueCDN.getChampions();
    dispatch({
      type: ActionNames.GetSuccess,
      champions,
    } as IGetSuccessAction);
  },
} as IActionCreators);
