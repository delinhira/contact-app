import { useState } from "react";

export const useDialogController = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return;
};
