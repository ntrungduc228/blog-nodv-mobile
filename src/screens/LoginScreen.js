import React from 'react';
import {View, Text, Button} from 'react-native';
import {setUser} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GITHUB_LOGIN_URL, GOOGLE_LOGIN_URL} from '../config/socialLink';
import axiosClient from '../api/axiosClient';

const LoginScreen = () => {
  const isLogin = useSelector(state => state.user.data.isLogin);

  const dispatch = useDispatch();
  const loginUser = () => {
    if (!isLogin) {
      console.log('login user');
      dispatch(setUser({username: 'ducnguyen'}));
    }
  };

  const loginByGoogle = async () => {
    let res = await axiosClient.get(GITHUB_LOGIN_URL);
    console.log('resss ', res.data);
  };

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Cherelick" onPress={loginUser} />
      <View className="mt-3">
        <Button title="Login by Google" onPress={() => loginByGoogle()} />
      </View>
    </View>
  );
};

export default LoginScreen;
