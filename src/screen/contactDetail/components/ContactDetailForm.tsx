import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import {
  UseContactFormProps,
  useContactForm,
} from "../../../hooks/useContactForm";
import ActivityIndicatorModal from "../../../components/ActivityIndicatorModal";

const ContactDetailForm = (props: UseContactFormProps) => {
  const { isLoading } = useSelector((state: RootState) => state.contacts);
  const { form, handlePressBack, handleAgeInput, updateForm, submitForm } =
    useContactForm(props);

  const render = () => {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar} elevated>
          <Appbar.BackAction onPress={handlePressBack} />
          <Appbar.Content
            style={styles.appBarTitle}
            title={props.contact ? "Edit Contact" : "New Contact"}
          />
          <Appbar.Action icon="floppy" onPress={submitForm} />
        </Appbar.Header>
        <View style={styles.form}>
          <TextInput
            label="Photo URL"
            value={form?.photo}
            onChangeText={(text) => updateForm({ photo: text })}
          />
          <TextInput
            label="First name"
            value={form?.firstName}
            onChangeText={(text) => updateForm({ firstName: text })}
            maxLength={30}
          />
          <TextInput
            label="Last name"
            value={form?.lastName}
            onChangeText={(text) => updateForm({ lastName: text })}
            maxLength={30}
          />
          <TextInput
            label="age"
            value={String(form?.age ?? "")}
            onChangeText={handleAgeInput}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>

        {isLoading ? <ActivityIndicatorModal /> : null}
      </View>
    );
  };

  return render();
};

export default ContactDetailForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    gap: 8,
    padding: 16,
  },

  appBar: {
    justifyContent: "space-between",
  },
  appBarTitle: {
    marginLeft: 16,
    paddingLeft: 16,
  },
  appBarActions: {
    flexDirection: "row",
  },
});
