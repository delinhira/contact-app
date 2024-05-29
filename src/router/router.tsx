import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTE_NAME } from "./routes";
import HomeScreen from "../screen/home/HomeScreen";
import ContactDetailScreen from "../screen/contactDetail/ContactDetailScreen";
import ContactDetailFormScreen from "../screen/contactDetail/ContactDetailFormScreen";

const AppStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTE_NAME.HOME}
        component={HomeScreen}
        options={() => ({ headerShown: false })}
      />
      <Stack.Screen
        name={ROUTE_NAME.CONTACT_DETAIL}
        component={ContactDetailScreen}
        options={() => ({ headerShown: false })}
      />
      <Stack.Screen
        name={ROUTE_NAME.NEW_CONTACT}
        component={ContactDetailFormScreen}
        options={() => ({ headerShown: false })}
      />
      <Stack.Screen
        name={ROUTE_NAME.EDIT_CONTACT}
        component={ContactDetailFormScreen}
        options={() => ({ headerShown: false })}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
