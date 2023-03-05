import React from 'react';
import {View, Text, Button, Linking} from 'react-native';
import {setUser} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
// import SocialLogin from '../features/auth/SocialLogin';
import {SocialLogin} from '../features/auth';

const AuthScreen = () => {
  const isLogin = useSelector(state => state.user.data.isLogin);

  const dispatch = useDispatch();

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log('user data ', data);

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(
    //   data.accessToken,
    // );

    // // Sign-in the user with the credential
    // const userSignin = auth().signInWithCredential(facebookCredential);
    // console.log('User signed in', userSignin);

    Profile.getCurrentProfile()
      .then(currentProfile => {
        console.log('currentProfile', currentProfile);
      })
      .catch(err => console.log('err ', err));
  }

  return (
    <View className="h-full bg-white">
      <Text className="mt-[60] text-center font-bold text-black text-2xl">
        Blog NODV
      </Text>
      <View className="mt-12 mb-12">
        <Text className="text-center text-black text-[40px]">Join Blog</Text>
      </View>
      <SocialLogin />
    </View>
  );
};

export default AuthScreen;
