import {Text, View, Button} from 'react-native';
import {logout} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import axiosClient from '../api/axiosClient';
// import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {FAB} from 'react-native-paper';

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
      <Text className="text-2xl dark:text-white text-orange-500">
        Home!fsdf
      </Text>
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
      <View className="my-3">
        <Button
          className="bg-emerald-500"
          title="Comment"
          onPress={() => navigation.push('Comments')}
        />
      </View>
      <FAB
        icon="plus"
        className="bg-emerald-500 rounded-full absolute bottom-2 right-2"
        onPress={() => navigation.push('PostEditor')}
      />

      {/* <Text>{data ? JSON.stringify(data) : 'fucking no data'}</Text> */}
    </View>
  );
}

export default HomeScreen;
