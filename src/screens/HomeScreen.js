import Home from '../features/home/Home';
import People from '../features/home/People';
import Topic from '../features/home/Topic';
import TopicYouFollow from '../features/home/TopicYouFollow';
import {createStackNavigator} from '@react-navigation/stack';

const HomeStack = createStackNavigator();
function HomeScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Main"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="Customize your interests"
        component={Topic}
        options={{
          // title:""
          headerShown: false,
          // tabBarIcon: 'home',
        }}
      />
      <HomeStack.Screen
        name="Topic you follow"
        component={TopicYouFollow}
        options={{
          // title:""
          headerShown: false,
          // tabBarIcon: 'home',
        }}
      />
      <HomeStack.Screen
        name="People"
        component={People}
        options={{
          // title:""
          headerShown: false,
          // tabBarIcon: 'home',
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
