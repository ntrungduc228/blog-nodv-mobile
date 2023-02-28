import {Provider, useSelector} from 'react-redux';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import {AuthStackNavigator} from './src/navigations';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import axiosClient from './src/api/axiosClient';
import {store} from './src/redux/store';

// import SocketClient from './src/websocket/SocketClient';

const queryClient = new QueryClient();

function AppScreen() {
  const isLogin = useSelector(state => state.user.data.isLogin);

  const {data} = useQuery({queryKey: ['test'], queryFn: () => callApi()});

  const callApi = async () => {
    let res = await axiosClient.get(
      // `https://jsonplaceholder.typicode.com/todos/1`,
      `/posts/639edd8db5fd877917ab4423`,
    );
    // console.log('res ', res ? res : 'fucking no data');
    return res;
    // setData(res.data);
  };

  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      {/* <BottomTabNavigator /> */}
      {isLogin ? <MainStackNavigator /> : <AuthStackNavigator />}
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
