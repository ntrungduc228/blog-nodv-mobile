import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

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
  const handleReceiveCountNotificationSocket = useCallback(
    payload => {
      const data = JSON.parse(payload.body);
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
  return (
    <TouchableOpacity
      onPress={() => handleClickNotification(currentUser)}
      className="w-10 h-10 flex justify-center items-center">
      <Badge
        visible={currentUser?.notificationsCount > 0}
        className="absolute top-1 bg-green-600 right-1 z-30"
        size={16}>
        {currentUser?.notificationsCount}
      </Badge>

      <IconWrapper
        onPress={() => navigation.navigate('Notifications')}
        size={20}>
        <BellIcon className="text-black" />
      </IconWrapper>
    </TouchableOpacity>
  );
};
