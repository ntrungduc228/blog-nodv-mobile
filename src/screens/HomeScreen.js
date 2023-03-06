import Home from '../features/home/Home';
import Topic from '../features/home/Topic';
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
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
