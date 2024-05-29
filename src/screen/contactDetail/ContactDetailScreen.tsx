import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useNavigation } from "@react-navigation/native";
import { toggleIsDeleteModalVisible } from "../../store/contacts/contacts.action";
import DeleteContactModal from "./components/DeleteContactModal";
import ActivityIndicatorModal from "../../components/ActivityIndicatorModal";
import { useContactMutation } from "../../hooks/useContactMutation";
import { ROUTE_NAME, ROUTE_PARAMS } from "../../router/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Contact } from "../../store/contacts/contacts.types";
import photoPlaceholder from "../../assets/images/photo-placeholder.png";

const ContactDetailScreen = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ROUTE_PARAMS, ROUTE_NAME.EDIT_CONTACT>
    >();
  const dispatch = useDispatch();
  const { selectedContactId, isLoading } = useSelector(
    (state: RootState) => state.contacts
  );
  const { fetchContactById } = useContactMutation();
  const [contact, setContact] = useState<Contact>(null);
  const [isReady, setIsReady] = useState(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);

  console.log(contact);

  const handlePressEdit = () => {
    navigation.navigate(ROUTE_NAME.EDIT_CONTACT, {
      contactId: selectedContactId,
    });
  };

  const handleFetchContact = async () => {
    const contactDetail = await fetchContactById(selectedContactId);
    setContact(contactDetail);
  };

  useEffect(() => {
    if (selectedContactId) {
      handleFetchContact();
    }

    return () => {
      setContact(null);
    };
  }, [selectedContactId]);

  const renderHeaderContent = () => {
    return (
      <>
        <Appbar.BackAction onPress={navigation.goBack} disabled={!isReady} />
        <View style={styles.appBarActions}>
          <Appbar.Action
            icon="pencil"
            disabled={!isReady}
            onPress={handlePressEdit}
          />
          <Appbar.Action
            icon="delete"
            disabled={!isReady}
            onPress={() => dispatch(toggleIsDeleteModalVisible(true))}
          />
        </View>
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        <Image
          style={styles.image}
          source={
            !contact?.photo || contact?.photo === "N/A" || isImageError
              ? photoPlaceholder
              : { uri: contact?.photo }
          }
          onLoadEnd={() => setIsReady(true)}
          onError={() => {
            console.log(">>>error");
            setIsImageError(true);
          }}
          defaultSource={photoPlaceholder}
        />
        {contact ? (
          <>
            <Text
              variant="headlineLarge"
              style={styles.title}
              numberOfLines={1}
            >
              {`${contact?.firstName} ${contact?.lastName}`}
            </Text>
            <Text variant="bodyMedium">{contact?.age} years old</Text>
          </>
        ) : null}
      </>
    );
  };

  const render = () => {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appBar} elevated>
          {renderHeaderContent()}
        </Appbar.Header>
        <View style={styles.content}>{renderContent()}</View>

        <DeleteContactModal />
        {!isReady || isLoading ? <ActivityIndicatorModal /> : null}
      </View>
    );
  };

  return render();
};

export default ContactDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: 8,
    padding: 16,
    alignItems: "center",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontWeight: "600",
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
