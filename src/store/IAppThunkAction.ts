import { IAppState } from "../store";
import IDispatchFunc from "./IDispatchFunc";

type AppThunkAction<TAction> = (dispatch: IDispatchFunc<TAction>, getState: () => IAppState) => void;
