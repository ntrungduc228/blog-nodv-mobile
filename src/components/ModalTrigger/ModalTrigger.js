import {View, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {Modal, Portal, Text, Button, Provider} from 'react-native-paper';

export const ModalTrigger = ({button = 'press', children}) => {
  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        {button}
      </TouchableOpacity>
      <Portal>
        <Modal visible={visible} onDismiss={handleClose} onClose={handleClose}>
          <View className="absolute m-auto left-3 right-3 max-h-[400]">
            {children}
          </View>
        </Modal>
      </Portal>
    </View>
  );
};
