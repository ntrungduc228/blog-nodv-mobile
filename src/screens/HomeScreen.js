import {getPosts, getPostsByFollowing} from '../api/postApi';

import IconFeather from 'react-native-vector-icons/Feather';
import {NotificationBell} from '../features/notification/components';
import {PostListFetch} from '../features/post';
import {ScreenLayout} from './components';
import {Tab} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getOwnTopics} from '../api/userApi';
import {routesScreen} from '../navigations';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';

export function HomeScreen() {
  const {data: topics} = useQuery('user-topic', getOwnTopics);
  const navigation = useNavigation();

  const homeTabs = useMemo(() => {
    return [
      {
        key: 'home-main',
        title: 'For you',
        initialParams: {type: 'feed', value: 'default'},
        component: PostsTab,
      },
      {
        key: 'home-following',
        title: 'Following',
        initialParams: {type: 'feed', value: 'following'},
        component: PostsTab,
      },
      ...(topics?.map(topic => ({
        key: `home-topic-${topic.id}`,
        title: topic.name,
        initialParams: {type: 'topic', value: topic.slug},
        component: PostsTab,
      })) || []),
    ];
  }, [topics]);

  return (
    <ScreenLayout>
      <ScreenLayout.Header style="justify-between">
        <ScreenLayout.Title>Home</ScreenLayout.Title>
        <NotificationBell />
      </ScreenLayout.Header>
      <ScreenLayout.Body>
        <Tab
          tabItems={homeTabs}
          startButton={
            <TouchableOpacity
              className="w-12 pl-4 h-12 flex justify-center items-center"
              onPress={() => navigation.navigate(routesScreen.FollowGeneral)}>
              <IconFeather
                name="plus"
                size={20}
                color="rgba(117, 117, 117, 1)"
                solid="rgba(117, 117, 117, 1)"
              />
            </TouchableOpacity>
          }
        />
      </ScreenLayout.Body>
    </ScreenLayout>
  );
}

const PostsTab = ({route}) => {
  const {type, value} = route.params;

  const {filter, queryFn} = useMemo(() => {
    switch (type) {
      case 'feed':
        if (value === 'following') {
          return {
            filter: {},
            queryFn: getPostsByFollowing,
          };
        }
        return {
          filter: {},
          queryFn: getPosts,
        };
      case 'topic':
        return {
          filter: {topic: value},
          queryFn: getPosts,
        };
      default:
        return {
          filter: {},
          queryFn: getPosts,
        };
    }
  }, [type, value]);

  return (
    <PostListFetch
      filter={filter}
      queryKey={'home-' + type + '-' + value}
      isDeleteOnPublish={true}
      queryFn={queryFn}
    />
  );
};
