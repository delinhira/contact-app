import { action } from "typesafe-actions";
import * as types from "./contacts.actionTypes";
import { Contact } from "./contacts.types";

export const toggleIsLoading = (isLoading?: boolean) =>
  action(types.TOGGLE_IS_LOADING, { isLoading });

export const toggleIsEditing = (isEditing?: boolean) =>
  action(types.TOGGLE_IS_EDITING, { isEditing });

export const setContacts = (contacts: Contact[]) =>
  action(types.SET_CONTACTS, { contacts });

export const setSelectedContactId = (selectedContactId: string | null) =>
  action(types.SET_SELECTED_CONTACT_ID, {
    selectedContactId,
  });

export const toggleIsDeleteModalVisible = (isVisible?: boolean) =>
  action(types.TOGGLE_IS_DELETE_MODAL_VISIBLE, { isVisible });
