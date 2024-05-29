import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Dialog as RPDialog, Portal, Text } from "react-native-paper";

export interface DialogProps {
  isVisible: boolean;
  setIsVisible?: (isVisible: boolean) => void;

  title?: string;
  description: string;
  isCancelable?: boolean;
  cancelLabel?: string;
  actionLabel?: string;
  onCancel?: () => void;
  onAction?: () => void;
}

const Dialog = (props: DialogProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const showDialog = () => props.setIsVisible(true);

  const hideDialog = () => props.setIsVisible(false);

  useEffect(() => {
    setIsVisible(props.isVisible);
  }, [props.isVisible]);

  // const {} =useDialogController()

  const render = () => {
    return (
      // <View>
      //   <Button onPress={showDialog}>Show Dialog</Button>
      //   <Portal>
      <RPDialog visible={isVisible} onDismiss={hideDialog}>
        {props.title ? <RPDialog.Title>{props.title}</RPDialog.Title> : null}
        <RPDialog.Content>
          <Text variant="bodyMedium">{props.description}</Text>
        </RPDialog.Content>
        <RPDialog.Actions>
          <Button onPress={hideDialog}>
            {props.cancelLabel ? props.cancelLabel : "Cancel"}
          </Button>
          <Button onPress={hideDialog}>
            {props.actionLabel ? props.actionLabel : "OK"}
          </Button>
        </RPDialog.Actions>
      </RPDialog>
      // </Portal>
      // </View>
    );
  };

  return render();
};

export default Dialog;
