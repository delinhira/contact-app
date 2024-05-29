import axios from "axios";
import { contactUrl } from "./constants";
import { Contact } from "../store/contacts/contacts.types";

const url = {
  getAll: contactUrl,
  getById: (id: string) => `${contactUrl}/${id}`,
};

export const getAllContact = async () => {
  const res = await axios.get(url.getAll);

  if (res.status !== 200 && res.status !== 201) {
    console.error("Failed");
  }

  return res.data.data;
};

export const createContact = async (contact: Contact) => {
  const res = await axios.post(url.getAll, contact);

  if (res.status !== 200 && res.status !== 201) {
    console.error("Failed");
  }

  return res.data;
};

export const getContactById = async (id: string) => {
  const res = await axios.get(url.getById(id));

  if (res.status !== 200 && res.status !== 201) {
    console.error("Failed");
  }

  return res.data.data;
};

export const updateContactById = async (
  id: string,
  updatedData: Partial<Contact>
) => {
  const res = await axios.put(url.getById(id), updatedData);

  if (res.status !== 200 && res.status !== 201) {
    console.error("Failed");
  }

  return res.data;
};

export const deleteContactById = async (id: string) => {
  const urll = url.getById(id);
  console.log({ id, urll });
  const res = await axios.delete(urll);

  console.log(res);

  if (res.status !== 200 && res.status !== 201) {
    console.error("Failed");
  }

  return res.data;
};
