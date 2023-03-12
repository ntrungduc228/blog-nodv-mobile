import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {getNotifications} from '../api/notificationApi';

import {useState} from 'react';
import Notification from '../features/notification/Notification';

function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  useQuery('notifications', () => getNotifications(), {
    onSuccess: data => {
      setNotifications(data);
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
