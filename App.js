import {AuthStackNavigator, MainStackNavigator} from './src/navigations';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {
  setAccessToken,
  setUser,
  updateUser,
} from './src/redux/slices/userSlice';
import {useCallback, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {SocketClient} from './src/websocket';
import {getAuthInfo} from './src/api/authApi';
import {getOwnTopics} from './src/api/userApi';
import {getPostIdsBookmark} from './src/api/bookmarkApi';
import {setTopic} from './src/redux/slices/topicSlice';
import {store} from './src/redux/store';
import useSocialAuth from './src/hooks/useSocialAuth';

// import SocketClient from './src/websocket/SocketClient';

const queryClient = new QueryClient();

function AppScreen() {
  const {isLogin} = useSelector(state => state.user.data);
  const bookmark = useSelector(state => state.bookmark);
  const topic = useSelector(state => state.topic);
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
      dispatch(updateUser({...data}));
    },
  });
  useQuery(['bookmark', isLogin], getPostIdsBookmark, {
    enabled: isLogin,
    onSuccess: data => {
      if (!bookmark.postIds.length) {
        dispatch(
          updateUser({
            bookmarkIds: data,
          }),
        );
      }
    },
  });
  useQuery(['topic', isLogin], getOwnTopics, {
    enabled: isLogin,
    onSuccess: data => {
      if (!topic.topicFollow.length) {
        dispatch(setTopic(data));
      }
    },
  });

  return (
    <NavigationContainer>
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
