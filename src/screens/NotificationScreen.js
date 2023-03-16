import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {getNotifications} from '../api/notificationApi';

import {useCallback, useState} from 'react';
import Notification from '../features/notification/Notification';
import {useFocusEffect} from '@react-navigation/native';

function NotificationScreen() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery('notifications', () => getNotifications(), {});

  // refetch() when screen is focused
  const notifications = data;
  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <ScrollView>
      <View>
        {notifications.map(notification => {
          return (
            <Notification key={notification.id} notification={notification} />
          );
        })}
      </View>
    </ScrollView>
  );
}

export default NotificationScreen;
