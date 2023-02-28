import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import {authByMobile} from '../api/authApi';
import {useDispatch} from 'react-redux';
import {setAccessToken, logout} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';

const useSocialAuth = () => {
  const [credential, setCredential] = useState(null);
  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId:
      '820939351695-m65vhduc0penk7daq7g98t80ucr7brav.apps.googleusercontent.com',
  });

  const handleAuthByMobile = useMutation(authByMobile, {
    onSuccess: data => {
      console.log('dsfsdf ', data);
      dispatch(
        setAccessToken({
          accessToken: data?.accessToken,
          provider: credential?.provider,
        }),
      );
    },
  });

  useEffect(() => {
    if (credential) {
      switch (credential?.provider) {
        case 'google': {
          handleAuthByMobile.mutate({
            provider: 'google',
            providerId: credential?.user.id,
            username: credential?.user.familyName,
            email: credential?.user.email,
            avatarUrl: credential?.user.photo,
          });
          setCredential(null);
          break;
        }
        case 'facebok': {
          handleAuthByMobile.mutate({
            provider: 'facebook',
            providerId: credential?.user.userID,
            username: credential?.user.name,
            email: credential?.user.email,
            avatarUrl: credential?.user.imageURL,
          });
          setCredential(null);
          break;
        }

        default: {
        }
      }
    }
  }, [credential, handleAuthByMobile]);

  const handleLogoutBySocial = async () => {
    console.log('hereeee');
    const userInfo = await AsyncStorage.getItem('user');
    const {provider} = userInfo ? JSON.parse(userInfo) : {};
    console.log('userinfo', JSON.parse(userInfo));

    if (provider) {
      try {
        switch (provider) {
          case 'google': {
            await GoogleSignin.signOut();
            break;
          }
          case 'facebok': {
            break;
          }

          default: {
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    dispatch(logout());
    setCredential(null);
  };

  const handleLoginByGoogle = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const account = await GoogleSignin.signIn();
      console.log('account', account.user);

      setCredential({user: account?.user, provider: 'google'});

      // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(
      //   account.idToken,
      // );
      // console.log('google credential ', googleCredential);

      // Sign-in the user with the credential
      // const userSignin = auth().signInWithCredential(googleCredential);

      // userSignin
      //   .then(user => {
      //     console.log('user sign in ', user);
      //   })
      //   .catch(err => {
      //     console.log('error: ', err);
      //   });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginByFacebook = async () => {
    try {
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

      Profile.getCurrentProfile().then(currentProfile => {
        console.log('currentProfile', currentProfile);
        setCredential({user: currentProfile, provider: 'facebook'});
      });
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return {
    handleLoginByGoogle,
    handleLoginByFacebook,
    credential,
    setCredential,
    handleAuthByMobile,
    handleLogoutBySocial,
  };
};

export default useSocialAuth;
