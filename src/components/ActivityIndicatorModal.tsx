import React from "react";
import { Modal, Card, ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

const ActivityIndicatorModal = () => {
  return (
    <Modal visible dismissable={false}>
      <Card style={styles.card}>
        <Card.Content>
          <ActivityIndicator />
        </Card.Content>
      </Card>
    </Modal>
  );
};

export default ActivityIndicatorModal;

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
  },
});
