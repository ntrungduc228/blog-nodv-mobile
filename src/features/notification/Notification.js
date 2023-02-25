import {formatRelative} from 'date-fns';
import {useMemo} from 'react';
import {Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NotificationType} from '../../config/dataType.js';

function Notification({notification}) {
  const type = useMemo(() => {
    let res = {message: '', icon: ''};
    switch (notification.type) {
      case NotificationType.FOLLOW:
        res.message = 'started following you';
        res.icon = <FontAwesome name="user-plus" size={16} color="black" />;
        break;
      case NotificationType.LIKE:
        res.message = 'clapped for your post';
        res.icon = (
          <MaterialCommunityIcons name="hand-clap" size={16} color="black" />
        );
        break;
      case NotificationType.COMMENT:
        res.message = 'comment on your post';
        res.icon = <FontAwesome name="comments" size={16} color="black" />;
        break;
      case NotificationType.REPLYCOMMENT:
        res.message = 'replied to your comment on a post';
        res.icon = <FontAwesome name="comments" size={16} color="black" />;
        break;
      case NotificationType.LIKECOMMENT:
        res.message = 'clapped for your comment';
        res.icon = (
          <MaterialCommunityIcons name="hand-clap" size={16} color="black" />
        );
        break;

      default:
        res = 'notification';
        break;
    }
    return res;
  }, [notification.type]);

  const displayTime = useMemo(() => {
    return formatRelative(new Date(notification.createdDate), new Date());
  }, [notification.createdDate]);

  return (
    <>
      <View
        className={`flex-row justify-between items-center p-4 w-screen border-l-[3px] bg-white ${
          notification.isRead
            ? `border-transparent`
            : `border-green-500 bg-slate-100`
        }`}>
        <View className="flex-row justify-between items-center">
          <Avatar.Image
            size={50}
            source={require('../../assets/imgs/avatar.png')}
          />
          <View className="ml-3 flex-1">
            <View className="flex-row flex-wrap">
              <Text>
                <Text className="text-base font-medium text-black">
                  {notification.sender.username}{' '}
                </Text>
                <Text className="text-base">{type.message}</Text>
              </Text>

              <Text className="text-xs capitalize">
                {displayTime}
                &nbsp;
                {type.icon}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="border-b-2 border-slate-200" />
    </>
  );
}

export default Notification;
