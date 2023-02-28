import {Button, Text, View} from 'react-native';

import {PostCreateTrigger} from '../features/post';
import axiosClient from '../api/axiosClient';
import useSocialAuth from '../hooks/useSocialAuth';

function HomeScreen({navigation}) {
  const {handleLogoutBySocial} = useSocialAuth();

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
        onPress={handleLogoutBySocial}
      />

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
