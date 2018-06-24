import { Modal } from "../../components/ModalManager";
import ActionNames from "../actionNames/modal";
import KnownAction, { ICloseModalAction, IOpenModalAction } from "../actions/modal";
import IDispatchFunc from "../IDispatchFunc";

export type ModalCreatorFunc = (close: () => void) => Modal;

export interface IActionCreators {
  openModal: (modalCreator: ModalCreatorFunc) => void;
  closeModal: (modalId: string) => void;
}

const actionCreators = (dispatch: IDispatchFunc<KnownAction>) => ({
  openModal: (modalCreator: ModalCreatorFunc) => {
    const id = Math.random().toString(36);
    const closeFunc = () => dispatch({
      type: ActionNames.CloseModal,
      modalId: id,
    });
    const modal = modalCreator(closeFunc);
    modal.id = id;
    dispatch({
      type: ActionNames.OpenModal,
      modal,
    } as IOpenModalAction);
  },
  closeModal: (modalId: string) => dispatch({
    type: ActionNames.CloseModal,
    modalId,
  } as ICloseModalAction),
} as IActionCreators);

export default actionCreators;
