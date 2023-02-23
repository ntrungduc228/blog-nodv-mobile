import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigations/MainStackNavigator';
import {BottomTabNavigator, AuthStackNavigator} from './src/navigations';
import {store} from './src/redux/store';
import {Provider, useSelector} from 'react-redux';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {Provider as PaperProvider} from 'react-native-paper';
// import SocketClient from './src/websocket/SocketClient';
import axiosClient from './src/api/axiosClient';

const queryClient = new QueryClient();

function AppScreen() {
  const isLogin = useSelector(state => state.user.data.isLogin);

  // const {data} = useQuery({queryKey: ['test'], queryFn: () => callApi()});
  // console.log('data from useQuery', data);

  const callApi = async () => {
    let res = await axiosClient.get(
      // `https://jsonplaceholder.typicode.com/todos/1`,
      `/posts/639edd8db5fd877917ab4423`,
    );
    console.log('res ', res ? res : 'fucking no data');
    return res;
    // setData(res.data);
  };

  return (
    <NavigationContainer>
      {/* <MainStackNavigator /> */}
      {/* <BottomTabNavigator /> */}
      {isLogin ? (
        <View>
          <MainStackNavigator />
        </View>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <AppScreen />
        </QueryClientProvider>
      </PaperProvider>
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
