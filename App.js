import {AuthStackNavigator, MainStackNavigator} from './src/navigations';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {logout, setAccessToken, setUser} from './src/redux/slices/userSlice';
import {useCallback, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SocketClient} from './src/websocket';
import {getAuthInfo} from './src/api/authApi';
import {getBookmarkByUserId} from './src/api/bookmarkApi';
import {setBookmark} from './src/redux/slices/bookmarkSlice';
import {store} from './src/redux/store';
import useSocialAuth from './src/hooks/useSocialAuth';
import {setProfile} from './src/redux/slices/profileSlice';

// import SocketClient from './src/websocket/SocketClient';

const queryClient = new QueryClient();

function AppScreen() {
  const {isLogin} = useSelector(state => state.user.data);
  const bookmark = useSelector(state => state.bookmark);
  const dispatch = useDispatch();

  const {handleLogoutBySocial} = useSocialAuth();

  useEffect(() => {
    checkIsLogin();
  }, [isLogin, checkIsLogin]);

  const checkIsLogin = useCallback(async () => {
    const user = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(user);

    if (!userInfo?.hasOwnProperty('accessToken')) {
      handleLogoutBySocial();
      // dispatch(logout());
      return;
    }
    dispatch(setAccessToken(userInfo));
  }, [handleLogoutBySocial, dispatch]);

  useQuery('user', getAuthInfo, {
    enabled: isLogin,
    onSuccess: data => {
      if (!data?.topics || !data?.topics.length) {
        // if user has no topics, redirect to topic page
        // navigate(appRoutes.TOPIC_PICK);
      }
      dispatch(setUser(data));
      dispatch(setProfile(data));
    },
  });
  useQuery(['bookmark', isLogin], getBookmarkByUserId, {
    enabled: isLogin,
    onSuccess: data => {
      // fix tam - chua hay vi useQuery van goi api
      if (!bookmark.postIds.length) {
        dispatch(setBookmark(data));
      }
    },
  });

  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      {isLogin ? <MainStackNavigator /> : <AuthStackNavigator />}
      {isLogin && <SocketClient />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <AppScreen />
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
}
