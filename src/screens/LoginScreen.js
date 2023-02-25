import React from 'react';
import {View, Text, Button, Linking} from 'react-native';
import {setUser} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GITHUB_LOGIN_URL, GOOGLE_LOGIN_URL} from '../config/socialLink';
import axiosClient from '../api/axiosClient';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  GoogleSignin.configure({
    webClientId:
      '820939351695-m65vhduc0penk7daq7g98t80ucr7brav.apps.googleusercontent.com',
  });
  const isLogin = useSelector(state => state.user.data.isLogin);

  const dispatch = useDispatch();
  const loginUser = () => {
    if (!isLogin) {
      console.log('login user');
      dispatch(setUser({username: 'ducnguyen'}));
    }
  };

  console.log('GOOGLE_LOGIN_URL ', GOOGLE_LOGIN_URL);

  const loginByGoogle = async () => {
    // await GoogleSignin.revokeAccess();
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const account = await GoogleSignin.signIn();

    console.log('account info ', account);

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(
      account.idToken,
    );
    console.log('google credential ', googleCredential);

    // Sign-in the user with the credential
    // const userSignin = auth().signInWithCredential(googleCredential);

    // userSignin
    //   .then(user => {
    //     console.log('user sign in ', user);
    //   })
    //   .catch(err => {
    //     console.log('error: ', err);
    //   });
  };

  const logout = async () => {
    // auth()
    //   .signOut()
    //   .then(info => {
    //     console.log('user log out ', info);
    //   })
    //   .catch(err => {
    //     console.log('error: ', err);
    //   });
    await GoogleSignin.signOut()
      .then(alo => console.log('aloalo ', alo))
      .catch(err => console.log('error: ', err));
  };

  return (
    <View>
      <Text>LoginScreen</Text>
      <Button title="Cherelick" onPress={loginUser} />
      <View className="mt-3">
        <Button title="Login by Google" onPress={() => loginByGoogle()} />
      </View>

      <View className="mt-3">
        <Button title="Logout" onPress={() => logout()} />
      </View>
    </View>
  );
};

export default LoginScreen;
