import { Modal } from "../../components/ModalManager";
import { ModalCreatorFunc } from "../actionCreators/modal";
import ActionNames from "../actionNames/modal";

export interface IOpenModalAction {
  type: ActionNames.OpenModal;
  modal: Modal;
}

export interface ICloseModalAction {
  type: ActionNames.CloseModal;
  modalId: string;
}

type KnownAction =
  IOpenModalAction |
  ICloseModalAction;

export default KnownAction;
