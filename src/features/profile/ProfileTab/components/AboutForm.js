import {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, Keyboard} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useMutation} from 'react-query';
import {updateUserProfile} from '../../../../api/userApi';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../../redux/slices/userSlice';

export const AboutForm = ({onPress, user}) => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);
  const dispatch = useDispatch();
  let classTextInput = !keyboardStatus ? 'h-[250]' : 'h-[70]';

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const updateUserBio = useMutation(updateUserProfile, {
    onSuccess: data => {
      dispatch(setUser(data));
      onPress();
      console.log('updated bio successfully');
    },
  });

  const handlePress = () => {
    updateUserBio.mutate({...user, bio: newBio});
  };

  return (
    // <ScrollView>
    <View className="flex-1 h-full outline outline-gray-700 outline-2">
      <TextInput
        className={`bg-white ${classTextInput}`}
        outlineColor="#fff"
        activeOutlineColor="#fff"
        mode="outlined"
        value={newBio}
        selectionColor="#333"
        onChangeText={text => setNewBio(text)}
        multiline={true}
        autoFocus={true}
      />
      <View className="flex flex-row justify-end pr-3 mb-10">
        <Button
          mode="outlined"
          textColor="#333"
          className="btn rounded-full border-stone-900 normal-case text-stone-900"
          onPress={onPress}>
          Cancel
        </Button>
        <Button
          mode="contained"
          textColor="#fff"
          className="btn ml-3 rounded-full bg-stone-900 normal-case"
          onPress={() => handlePress()}>
          Save
        </Button>
      </View>
    </View>
    // </ScrollView>
  );
};
