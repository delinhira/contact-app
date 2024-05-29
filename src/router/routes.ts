import { ParamListBase } from "@react-navigation/native";

export enum ROUTE_NAME {
  HOME = "home",
  NEW_CONTACT = "new-contact",
  EDIT_CONTACT = "edit-contact",
  CONTACT_FORM = "contact-form",
  CONTACT_DETAIL = "contact-detail",
}

export interface ROUTE_PARAMS extends ParamListBase {
  [ROUTE_NAME.HOME]: {};
  [ROUTE_NAME.NEW_CONTACT]: {};
  [ROUTE_NAME.EDIT_CONTACT]: { contactId: string };
  [ROUTE_NAME.CONTACT_FORM]: { contactId?: string };
  [ROUTE_NAME.CONTACT_DETAIL]: {};
}
