import {View, TouchableOpacity, ScrollView} from 'react-native';
import {useState} from 'react';
import {Portal, Text, Button, Provider, Modal} from 'react-native-paper';

export const ModalTrigger = ({
  button = 'press',
  children,
  visible,
  setVisible,
}) => {
  const handleOpen = () => {
    setVisible(true);
  };
  return (
    <>
      <View className="">
        <TouchableOpacity onPress={handleOpen}>{button}</TouchableOpacity>
      </View>
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
    </>
  );
};
