import { DialogProps } from "../../components/dialog/Dialog";

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  photo: string;
}

export interface ContactsState {
  isLoading: boolean;
  isEditing: boolean;
  data: Contact[];
  selectedContactId: string | null;

  isDeleteModalVisible: boolean;
  alertDialogConfig: DialogProps;
}
