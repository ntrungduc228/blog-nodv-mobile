import {View, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from 'react';
import {Portal, Text, Button, Provider, Modal} from 'react-native-paper';

export const ModalTrigger = ({
  button = 'press',
  children,
  visible,
  setVisible,
}) => {
  // const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };

  const handleOpen = () => {};
  return (
    <View className="absolute m-auto left-3 right-3 max-h-[400]">
      <TouchableOpacity onPress={handleOpen}>{button}</TouchableOpacity>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          onClose={() => setVisible(false)}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View>{children}</View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};
