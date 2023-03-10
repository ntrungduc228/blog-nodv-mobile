import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {getNotifications} from '../api/notificationApi';
import {Avatar, Button} from 'react-native-paper';
import {Text, View} from 'react-native';

import Notification from '../features/notification/Notification';
import {useState} from 'react';

function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  useQuery('notifications', () => getNotifications(), {
    onSuccess: data => {
      setNotifications(data);
    },
    onError: err => {
      console.log('err re', err);
    },
  });
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
