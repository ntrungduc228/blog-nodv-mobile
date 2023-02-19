import {Text, View, Button} from 'react-native';
import {logout} from '../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import axiosClient from '../api/axiosClient';
// import {useState} from 'react';
import {useQuery} from 'react-query';

function HomeScreen() {
  const isLogin = useSelector(state => state.user.data.isLogin);
  // const [data, setData] = useState('');

  const dispatch = useDispatch();

  const logoutUser = () => {
    if (isLogin) {
      dispatch(logout());
    }
  };

  const {data} = useQuery({queryKey: ['test'], queryFn: () => callApi()});
  console.log('data from useQuery', data);

  const callApi = async () => {
    let res = await axiosClient.get(
      `https://jsonplaceholder.typicode.com/todos/1`,
    );
    console.log('res ', res.data);
    return res.data;
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

      <Text>{data ? JSON.stringify(data) : ''}</Text>
    </View>
  );
}

export default HomeScreen;
