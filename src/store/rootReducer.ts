import { combineReducers } from "redux";
import contactsReducer from "./contacts/contacts.reducer";

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
