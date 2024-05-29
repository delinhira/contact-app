import React from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import ContactList from "./components/ContactList";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTE_NAME, ROUTE_PARAMS } from "../../router/routes";
import Dialog from "../../components/dialog/Dialog";

const HomeScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ROUTE_PARAMS, ROUTE_NAME.NEW_CONTACT>
    >();
  const { isLoading, alertDialogConfig } = useSelector(
    (state: RootState) => state.contacts
  );

  const handlePressNew = () => {
    navigation.navigate(ROUTE_NAME.NEW_CONTACT);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    return <ContactList />;
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content title="Contacts" />
        <Appbar.Action icon="plus" onPress={handlePressNew} />
      </Appbar.Header>
      {renderContent()}
      <Dialog {...alertDialogConfig} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
});
