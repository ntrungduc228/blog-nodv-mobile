import {useCallback, useState} from 'react';

import Notification from '../features/notification/Notification';
import {ScrollView} from 'react-native-gesture-handler';
import {Spinner} from '../components';
import {View} from 'react-native';
import {getNotifications} from '../api/notificationApi';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from 'react-query';

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

  if (isLoading) {
    return (
      <View className="justify-center items-center h-screen">
        <Spinner />
      </View>
    );
  }

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
