import Home from '../features/home/Home';
import {createStackNavigator} from '@react-navigation/stack';
import Topic from '../features/home/Topic';
import TopicYouFollow from '../features/home/TopicYouFollow';
import People from '../features/home/People';

const HomeStack = createStackNavigator();
function HomeScreen({navigation}) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <HomeStack.Screen
        name="Customize your interests"
        component={Topic}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Topic you follow"
        component={TopicYouFollow}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="People you follow"
        component={People}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
