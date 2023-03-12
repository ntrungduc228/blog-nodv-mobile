import {useNavigation} from '@react-navigation/native';
import {formatRelative} from 'date-fns';
import {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from 'react-query';
import {setNotificationRead} from '../../api/notificationApi.js';
import {NotificationType} from '../../config/dataType.js';
import routesScreen from '../../navigations/routesScreen.js';

function Notification({notification}) {
  // const {data = {}, isLoading, refetch} = useQuery('comment', getComment, {});

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []),
  // );
  useEffect(() => {}, [notification.isRed]);
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
  const setNotificationReadMutation = useMutation(setNotificationRead);
  const navigation = useNavigation();
  const handleClick = () => {
    !notification.isRead
      ? setNotificationReadMutation.mutate(notification.id)
      : '';
    const result = notification.link.match(/\/(\w+)$/)[1];
    notification.link.includes('posts')
      ? navigation.navigate(routesScreen.PostDetail, {id: result})
      : navigation.navigate(routesScreen.Profile, {email: result});
  };
  return (
    <>
      <TouchableOpacity onPress={handleClick}>
        <View
          className={`flex-row justify-between items-center w-screen border-l-[3px] bg-white ${
            notification.isRead
              ? `border-transparent`
              : `border-green-500 bg-slate-100`
          } h-24`}>
          <View className="flex-row justify-between items-center">
            <Avatar.Image
              size={50}
              source={{
                uri:
                  notification?.sender?.avatar ||
                  'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
              }}
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
                  &nbsp; &nbsp;
                  {type.icon}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View className="border-b-2 border-slate-200" />
    </>
  );
}

export default Notification;
