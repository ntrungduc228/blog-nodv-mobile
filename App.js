import {NavigationContainer} from '@react-navigation/native';
import {
  BottomTabNavigator,
  AuthStackNavigator,
  MainStackNavigator,
} from './src/navigations';
import {Provider, useSelector, useDispatch} from 'react-redux';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import {Provider as PaperProvider} from 'react-native-paper';
import axiosClient from './src/api/axiosClient';
import {setUser, logout} from './src/redux/slices/userSlice';
import {getAuthInfo} from './src/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {store} from './src/redux/store';
import {useEffect, useMemo, useCallback} from 'react';

// import SocketClient from './src/websocket/SocketClient';

const queryClient = new QueryClient();

function AppScreen() {
  const {isLogin} = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  console.log('islogin ', isLogin);

  useEffect(() => {
    checkIsLogin();
  }, [isLogin, checkIsLogin]);

  const checkIsLogin = useCallback(async () => {
    const user = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(user);
    if (!userInfo) {
      dispatch(logout());
    }
  }, [dispatch]);

  useQuery('user', getAuthInfo, {
    // enabled: checkIsLogin,
    enabled: isLogin,
    onSuccess: data => {
      if (!data?.topics || !data?.topics.length) {
        // if user has no topics, redirect to topic page
        // navigate(appRoutes.TOPIC_PICK);
        console.log('get user info', data);
      }
      dispatch(setUser(data));
    },
  });

  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      {/* <BottomTabNavigator /> */}
      {isLogin ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

export default function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AppScreen />
          </QueryClientProvider>
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
}
