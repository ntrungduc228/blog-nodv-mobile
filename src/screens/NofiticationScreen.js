import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, Button} from 'react-native-paper';

import Notification from '../features/notification/Notification';

function NotificationScreen() {
  const notifications = [
    {
      type: 'REPLYCOMMENT',
      sender: {
        username: 'Đức Nguyễnn',
      },
      isRead: false,
      createdDate: new Date(),
    },
    {
      type: 'LIKECOMMENT',
      sender: {
        username: 'Đức Nguyễn',
      },
      isRead: true,
      createdDate: new Date(),
    },
    {
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
          return <Notification notification={notification} />;
        })}
      </View>
    </ScrollView>
  );
}

export default NotificationScreen;
