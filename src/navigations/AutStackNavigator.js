import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import routes from './routesScreen';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={routes.Auth}
        component={AuthScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
