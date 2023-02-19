import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {BottomTabNavigator, AuthStackNavigator} from './src/navigations';
import {store} from './src/redux/store';
import {Provider, useSelector} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();

function AppScreen() {
  const isLogin = useSelector(state => state.user.data.isLogin);

  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      {/* <BottomTabNavigator /> */}
      {isLogin ? <BottomTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppScreen />
      </QueryClientProvider>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
