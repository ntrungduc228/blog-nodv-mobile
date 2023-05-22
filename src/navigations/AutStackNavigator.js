import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import routes from './routesScreen';
import {
  LoginScreen,
  SignUpScreen,
  OTPScreen,
  ForgotPasswordScreen,
} from '../screens';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={routes.Login}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={routes.SignUp}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={routes.Auth}
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={routes.Verify}
        component={OTPScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={routes.PasswordReset}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
