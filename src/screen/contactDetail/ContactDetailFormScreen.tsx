import React, { useEffect, useState } from "react";
import ContactDetailForm from "./components/ContactDetailForm";
import { useContactMutation } from "../../hooks/useContactMutation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ROUTE_NAME, ROUTE_PARAMS } from "../../router/routes";
import { Contact } from "../../store/contacts/contacts.types";

const ContactDetailFormScreen = () => {
  const route =
    useRoute<RouteProp<{ params: ROUTE_PARAMS[ROUTE_NAME.CONTACT_FORM] }>>();
  const navigation = useNavigation();
  const { fetchContactById, createContact, editContact } = useContactMutation();
  const [contact, setContact] = useState<Contact>(null);

  const handleFetchContact = async () => {
    const contactDetail = await fetchContactById(route.params?.contactId);
    setContact(contactDetail);
  };

  const handlePressBack = () => {
    navigation.goBack();
  };

  const handleSubmit = (form: Contact) => {
    if (route.params?.contactId) {
      let updatedForm = {};

      if (contact) {
        Object.entries(form).forEach(([key, value]) => {
          if (contact[key] !== value) {
            updatedForm[key] = value;
          }
        });
      }

      return editContact(route.params?.contactId, updatedForm);
    }

    createContact(form);
  };

  useEffect(() => {
    if (route.params?.contactId) {
      handleFetchContact();
    }
  }, [route.params?.contactId]);

  const render = () => {
    return (
      <ContactDetailForm
        contact={contact}
        onSubmit={handleSubmit}
        onPressBack={handlePressBack}
      />
    );
  };

  return render();
};

export default ContactDetailFormScreen;
