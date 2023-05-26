import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import {Badge} from 'react-native-paper';
import {BellIcon} from '../../../../components/icons';
import {IconWrapper} from '../../../../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setUser} from '../../../../redux/slices/userSlice';
import {updateCountNotifications} from '../../../../api/userApi';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

export const NotificationBell = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.data.info);
  const socket = useSelector(state => state.socket.data);
  const navigation = useNavigation();
  const handleReceiveCountNotificationSocket = payload => {
    console.log('vo dat time');
    const data = JSON.parse(payload.body);
    dispatch(setUser(data));
  };
  useEffect(() => {
    const topic = `/topic/notifications/${currentUser?.id}/countNotifications`;
    if (socket) {
      socket.subscribe(topic, handleReceiveCountNotificationSocket);
    }
    return () => {
      if (socket) {
        console.log('bor socket');
        socket.unsubscribe(topic);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);
  const updateUserCountNotification = useMutation(updateCountNotifications, {
    onSuccess: data => {
      // console.log('click', data);
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
      console.log('clcick');
    },
    [updateUserCountNotification],
  );
  const handleClick = () => {
    console.log('clcik chic');
    handleClickNotification(currentUser);

    navigation.navigate('Notifications');

    // navigation.navigate('Notifications');
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      className="w-10 h-10 flex justify-center items-center">
      <View className="w-10 h-10 flex justify-center items-center">
        <Badge
          visible={currentUser?.notificationsCount > 0}
          className="absolute top-1 bg-green-600 right-1 z-30"
          size={16}>
          {currentUser?.notificationsCount}
        </Badge>
        <IconWrapper
          // onPress={() => navigation.navigate('Notifications')}
          size={20}>
          <BellIcon className="text-black" />
        </IconWrapper>
      </View>
    </TouchableOpacity>
  );
};
