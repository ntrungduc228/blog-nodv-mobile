import {Button, Text, View} from 'react-native';

import {PostCreateTrigger} from '../features/post';
import axiosClient from '../api/axiosClient';
// import {useState, useEffect} from 'react';
import {useQuery} from 'react-query';
import {FAB} from 'react-native-paper';
import useSocialAuth from '../hooks/useSocialAuth';
import Home from '../features/home/Home';
import {createStackNavigator} from '@react-navigation/stack';
import Topic from '../features/home/Topic';

const HomeStack = createStackNavigator();
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
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          options={{
            // title:""
            headerShown: false,
            // tabBarIcon: 'home',
          }}
        />
        {/* <Home /> */}
        <HomeStack.Screen
          name="Customize your interests"
          component={Topic}
          options={{
            // title:""
            headerShown: false,
            // tabBarIcon: 'home',
          }}
        />
      </HomeStack.Navigator>

      {/* <FAB
        icon="plus"
        className="bg-emerald-500 rounded-full absolute bottom-2 right-2"
        onPress={() => navigation.push('PostEditor')}
      /> */}
    </>
  );
}

export default HomeScreen;
