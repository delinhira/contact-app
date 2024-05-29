import { useDispatch } from "react-redux";
import {
  setContacts,
  toggleIsDeleteModalVisible,
  toggleIsLoading,
} from "../store/contacts/contacts.action";
import * as services from "../services/contacts.service";
import { Contact } from "../store/contacts/contacts.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTE_NAME, ROUTE_PARAMS } from "../router/routes";

export const useContactMutation = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<ROUTE_PARAMS, ROUTE_NAME.HOME>>();

  const fetchContacts = async () => {
    try {
      dispatch(toggleIsLoading(true));
      const res = await services.getAllContact();
      dispatch(setContacts(res));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  const fetchContactById = async (contactId: string): Promise<Contact> => {
    try {
      dispatch(toggleIsLoading(true));
      const res = await services.getContactById(contactId);
      return res;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  const deleteContact = async (contactId: string) => {
    try {
      dispatch(toggleIsLoading(true));
      await services.deleteContactById(contactId);
      dispatch(toggleIsDeleteModalVisible(false));
      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  const editContact = async (
    contactId: string,
    updatedData: Partial<Contact>
  ) => {
    try {
      dispatch(toggleIsLoading(true));
      await services.updateContactById(contactId, updatedData);
      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  const createContact = async (contact: Contact) => {
    try {
      dispatch(toggleIsLoading(true));
      await services.createContact(contact);
      navigation.goBack();
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(toggleIsLoading(false));
    }
  };

  return {
    fetchContacts,
    fetchContactById,
    deleteContact,
    editContact,
    createContact,
  };
};
