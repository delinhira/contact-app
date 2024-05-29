import { ActionType, createReducer } from "typesafe-actions";
import * as actions from "./contacts.action";
import * as types from "./contacts.actionTypes";
import { ContactsState } from "./contacts.types";

export type ContactAction = ActionType<typeof actions>;

const initialState: ContactsState = {
  isLoading: false,
  isEditing: false,
  data: [],
  selectedContactId: null,

  isDeleteModalVisible: false,
  alertDialogConfig: {
    isVisible: false,
    description: "",
  },
};

const contactsReducer = createReducer<ContactsState, ContactAction>(
  initialState
)
  .handleType(types.TOGGLE_IS_LOADING, (state, action) => ({
    ...state,
    isLoading: action.payload.isLoading ?? !state.isLoading,
  }))
  .handleType(types.TOGGLE_IS_EDITING, (state, action) => ({
    ...state,
    isEditing: action.payload.isEditing ?? !state.isEditing,
  }))
  .handleType(types.SET_CONTACTS, (state, action) => ({
    ...state,
    data: action.payload.contacts,
  }))
  .handleType(types.SET_SELECTED_CONTACT_ID, (state, action) => ({
    ...state,
    selectedContactId: action.payload.selectedContactId,
  }))
  .handleType(types.TOGGLE_IS_DELETE_MODAL_VISIBLE, (state, action) => ({
    ...state,
    isDeleteModalVisible:
      action.payload.isVisible ?? !state.isDeleteModalVisible,
  }));

export default contactsReducer;
