import React from "react";
import { Modal, Text, Button, Card } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { toggleIsDeleteModalVisible } from "../../../store/contacts/contacts.action";
import { StyleSheet } from "react-native";
import { useContactMutation } from "../../../hooks/useContactMutation";

const DeleteContactModal = () => {
  const dispatch = useDispatch();
  const { isDeleteModalVisible, selectedContactId } = useSelector(
    (state: RootState) => state.contacts
  );
  const { deleteContact } = useContactMutation();

  const handleDelete = () => {
    deleteContact(selectedContactId);
  };

  return (
    <Modal visible={isDeleteModalVisible} dismissable={false}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleLarge">Delete Contact</Text>
          <Text variant="bodyMedium">
            Are you sure you want to delete this contact? This action can't be
            undone.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => dispatch(toggleIsDeleteModalVisible(false))}>
            Cancel
          </Button>
          <Button onPress={handleDelete}>Ok</Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
};

export default DeleteContactModal;

const styles = StyleSheet.create({
  card: {
    width: 320,
    maxWidth: "90%",
    alignSelf: "center",
  },
  cardContent: {
    gap: 16,
    marginBottom: 16,
  },
});
