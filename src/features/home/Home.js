import {Text, TouchableOpacity, View} from 'react-native';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Badge} from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import {PostListFetch} from '../post/index.js';
import Styles from './Styles.js';
import {getPosts} from '../../api/postApi.js';
import {setUser} from '../../redux/slices/userSlice.js';
import {updateCountNotifications} from '../../api/userApi.js';
import {useMutation} from 'react-query';

function Home({navigation}) {
  const currentUser = useSelector(state => state.user.data.info);
  const socket = useSelector(state => state.socket.data);
  const dispatch = useDispatch();

  //vi
  const handleReceiveCountNotificationSocket = useCallback(
    payload => {
      const data = JSON.parse(payload.body);
      console.log(data);
      dispatch(setUser(data));
    },
    [dispatch],
  );

  useEffect(() => {
    const topic = `/topic/notifications/${currentUser?.id}/countNotifications`;
    if (socket) {
      socket.subscribe(topic, handleReceiveCountNotificationSocket);
    }
    return () => {
      if (socket) {
        socket.unsubscribe(topic);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, currentUser]);
  const updateUserCountNotification = useMutation(updateCountNotifications, {
    onSuccess: data => {
      dispatch(setUser(data));
    },
  });

  const handleClickNotification = useCallback(
    user => {
      const data = {
        userId: user?.id,
        isIncrease: false,
      };
      updateUserCountNotification.mutate(data);
    },
    [updateUserCountNotification],
  );
  //kt
  return (
    <View style={Styles.container}>
      <View style={Styles.containerSite}>
        <Text style={Styles.textSite}>Home</Text>
        {/* vi */}
        <TouchableOpacity onPress={() => handleClickNotification(currentUser)}>
          {currentUser?.notificationsCount > 0 ? (
            <Badge className="bg-green-500 absolute -top-1 z-30" size={16}>
              {currentUser?.notificationsCount}
            </Badge>
          ) : (
            ''
          )}

          <IconFeather
            name="bell"
            size={25}
            color="#A09898"
            solid="#A09898"
            onPress={() => navigation.navigate('Notifications')}
          />
        </TouchableOpacity>
      </View>
      {/*  */}
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#ebeaea',
        }}
      />
      <PostListFetch queryKey="home" queryFn={getPosts} />
    </View>
  );
}

export default Home;
