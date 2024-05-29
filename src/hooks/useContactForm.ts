import { useEffect, useState } from "react";
import { Contact } from "../store/contacts/contacts.types";
import { Keyboard } from "react-native";

export interface UseContactFormProps {
  contact?: Contact;
  onSubmit: (form: Contact) => void;
  onPressBack?: () => void;
}

export const useContactForm = (props: UseContactFormProps) => {
  const [form, setForm] = useState<Contact | null>(props.contact);

  useEffect(() => {
    setForm(props.contact);

    return () => {
      setForm(null);
    };
  }, [props.contact]);

  const handlePressBack = () => {
    props.onPressBack();
  };

  const handleAgeInput = (ageString: string) => {
    const updatedAge = ageString.replace(/[^0-9]/g, "");
    const age = Number(updatedAge);
    updateForm({ age });
  };

  const updateForm = (updatedData: Partial<Contact>) => {
    setForm((prevForm) => ({
      ...prevForm,
      ...updatedData,
    }));
  };

  const submitForm = () => {
    Keyboard.dismiss();
    props.onSubmit(form);
  };

  return {
    form,
    handlePressBack,
    handleAgeInput,
    updateForm,
    submitForm,
  };
};
