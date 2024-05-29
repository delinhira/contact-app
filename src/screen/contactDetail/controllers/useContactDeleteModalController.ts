import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { toggleIsDeleteModalVisible } from "../../../store/contacts/contacts.action";

export const useContactDeleteModalController = () => {
  const dispatch = useDispatch();
  const { isDeleteModalVisible } = useSelector(
    (state: RootState) => state.contacts
  );

  const toggle = () => {
    dispatch(toggleIsDeleteModalVisible(!isDeleteModalVisible));
  };

  return {};
};
