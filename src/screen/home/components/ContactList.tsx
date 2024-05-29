import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";
import { Divider, List } from "react-native-paper";
import { ROUTE_NAME, ROUTE_PARAMS } from "../../../router/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getContactName } from "../../../utils/contactUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  setContacts,
  setSelectedContactId,
} from "../../../store/contacts/contacts.action";
import { RootState } from "../../../store/rootReducer";
import { getAllContact } from "../../../services/contacts.service";
import { Contact } from "../../../store/contacts/contacts.types";
import photoPlaceholder from "../../../assets/images/photo-placeholder.png";

const ContactList = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<ROUTE_PARAMS, ROUTE_NAME.CONTACT_DETAIL>
    >();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.contacts);
  const [isImageError, setIsImageError] = useState<Record<number, boolean>>({});

  const handlePress = (contact: Contact) => {
    dispatch(setSelectedContactId(contact.id));
    navigation.navigate(ROUTE_NAME.CONTACT_DETAIL);
  };

  const fetchContacts = async () => {
    try {
      const res = await getAllContact();
      dispatch(setContacts(res));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchContacts();
    setIsImageError({});
  }, []);

  const renderItem = (item: ListRenderItemInfo<Contact>) => {
    const contactName = getContactName(item.item);

    return (
      <List.Item
        key={item.index}
        title={contactName}
        onPress={() => handlePress(item.item)}
        left={() => {
          const photo = item.item.photo;
          return (
            <Image
              style={styles.image}
              source={
                !photo || photo === "N/A" || isImageError[item.index]
                  ? photoPlaceholder
                  : { uri: photo }
              }
              defaultSource={photoPlaceholder}
              onError={() => {
                setIsImageError((prevState) => ({
                  ...prevState,
                  [item.index]: true,
                }));
              }}
            />
          );
        }}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divider />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ContactList;

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginLeft: 16,
  },
});
