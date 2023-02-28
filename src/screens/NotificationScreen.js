import {Avatar, Button} from 'react-native-paper';
import {Text, View} from 'react-native';

import Notification from '../features/notification/Notification';
import {ScrollView} from 'react-native-gesture-handler';

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
