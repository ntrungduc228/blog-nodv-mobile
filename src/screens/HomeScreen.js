import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {PostCreateTrigger} from '../features/post';
import auth from '@react-native-firebase/auth';
import axiosClient from '../api/axiosClient';
import {logout} from '../redux/slices/userSlice';

GoogleSignin.configure({
  webClientId:
    '255721291089-vprprohj4eolh2ae93qdfegb1aa9cumv.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const res = await auth().signInWithCredential(googleCredential);
    console.log('res ', res);
  } catch (error) {
    console.log('error ', error);
  }
}
// import {useState, useEffect} from 'react';

function HomeScreen({navigation}) {
  const isLogin = useSelector(state => state.user.data.isLogin);
  // const [data, setData] = useState('');

  const dispatch = useDispatch();

  const logoutUser = () => {
    if (isLogin) {
      dispatch(logout());
    }
  };

  // const {data} = useQuery({queryKey: ['test'], queryFn: () => callApi()});
  // console.log('data from useQuery', data);

  const callApi = async () => {
    let res = await axiosClient.get(
      // `https://jsonplaceholder.typicode.com/todos/1`,
      `/posts/639edd8db5fd877917ab4423`,
    );
    console.log('res ', res ? res : 'fucking no data');
    return res;
    // setData(res.data);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text className="text-2xl dark:text-white text-orange-500">Home!</Text>
      <Button
        className="bg-amber-300 mt-3"
        title="Logout"
        onPress={logoutUser}
      />
      <View className="my-3">
        <Button className="bg-emerald-500" title="Call api" onPress={callApi} />
      </View>

      <View className="my-3">
        <Button
          className="bg-emerald-500"
          title="Notification"
          onPress={() => navigation.push('Notifications')}
        />
      </View>
      <PostCreateTrigger />
      <Button
        className="bg-emerald-500"
        title="Post detail"
        onPress={() =>
          navigation.push('PostDetail', {
            id: '63ac87238e2d5012247a505f',
          })
        }
      />
    </View>
  );
}

export default HomeScreen;
