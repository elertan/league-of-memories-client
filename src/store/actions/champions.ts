import Champion from "../../models/Champion";
import ActionNames from "../actionNames/champion";

export interface IGetAction {
  type: ActionNames.Get;
}

export interface IGetSuccessAction {
  type: ActionNames.GetSuccess;
  champions: Champion[];
}

type KnownAction =
  IGetAction |
  IGetSuccessAction;

export default KnownAction;
