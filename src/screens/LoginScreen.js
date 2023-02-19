import React from 'react';
import {View, Text, Button} from 'react-native';
import {setUser} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';

const LoginScreen = () => {
  const isLogin = useSelector(state => state.user.data.isLogin);

  const dispatch = useDispatch();
  const loginUser = () => {
    if (!isLogin) {
      console.log('login user');
      dispatch(setUser({username: 'ducnguyen'}));
    }
  };
  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Cherelick" onPress={() => loginUser()} />
    </View>
  );
};

export default LoginScreen;
