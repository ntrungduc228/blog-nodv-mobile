import React from 'react';
import {View, Text, Button, Linking} from 'react-native';
import {setUser} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {GOOGLE_LOGIN_URL} from '../config/socialLink';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';
import SocialLogin from '../features/auth/SocialLogin';

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

  const loginByGoogle = async () => {
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
    await GoogleSignin.signOut()
      .then(alo => console.log('aloalo ', alo))
      .catch(err => console.log('error: ', err));
  };

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
    <View className="mt-[40]">
      <Text>LoginScreen</Text>
      <SocialLogin />
    </View>
  );
};

export default LoginScreen;
