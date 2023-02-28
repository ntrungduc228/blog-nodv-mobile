import {Avatar, Button} from 'react-native-paper';
import {Text, View} from 'react-native';

import Notification from '../features/notification/Notification';
import {ScrollView} from 'react-native-gesture-handler';

function NotificationScreen() {
  const notifications = [
    {
      id: 1,
      type: 'REPLYCOMMENT',
      sender: {
        username: 'Đức Nguyễnn',
      },
      isRead: false,
      createdDate: new Date(),
    },
    {
      id: 2,
      type: 'LIKECOMMENT',
      sender: {
        username: 'Đức Nguyễn',
      },
      isRead: true,
      createdDate: new Date(),
    },
    {
      id: 3,
      type: 'COMMENT',
      sender: {
        username: 'Đức Nguyễnnn',
      },
      isRead: false,
      createdDate: new Date(),
    },
  ];
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
