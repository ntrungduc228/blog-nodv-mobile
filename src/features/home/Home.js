import {ScrollView, Text, View, Button} from 'react-native';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';
import {useCallback, useEffect, useState} from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import Post from './Post.js';
import Styles from './Styles.js';
import Topic from './Topic.js';
import {useDispatch, useSelector} from 'react-redux';
import {Badge} from 'react-native-paper';
import {setUser} from '../../redux/slices/userSlice.js';
import {updateCountNotifications} from '../../api/userApi.js';
import {useMutation} from 'react-query';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const currentUser = useSelector(state => state.user.data.info);
  const [blackList, setBlackList] = useState([]);
  const [topics, setTopics] = useState([]);

  const socket = useSelector(state => state.socket.data);
  const dispatch = useDispatch();
  // console.log(blackList)
  // console.log(currentUser)
  // console.log(topics)
  useEffect(() => {
    async function fetchData() {
      const postList = await axiosClient.get(
        `/posts?page=${page}&limit=${limit}&topic=&title=`,
      );
      setPosts(postList);
      const blackList = await axiosClientPrivate.get(`blackLists/list`);
      setBlackList(blackList);
      const topicLists = await axiosClientPrivate.get(`/topics`);
      setTopics(topicLists);
    }
    fetchData();
  }, [limit, page, posts]);

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom) {
      setLimit(limit + 5);
    }
  };
  const topicList = () => {
    return topicList.map(topic => {
      return <Text style={Styles.textHeader}>{}</Text>;
    });
  };

  const postList = () => {
    return posts?.map((post, index) => {
      return !blackList.includes(post.id) && <Post key={index} post={post} />;
    });
  };

  const topicListRender = () => {
    return topics.map((topic, index) => {
      return <Text style={Styles.textHeader}>{topic.name}</Text>;
    });
  };

  const topic = () => {
    console.log('onPress');
    return <Topic />;
  };

  //vi
  const handleReceiveCountNotificationSocket = useCallback(
    payload => {
      const data = JSON.parse(payload.body);
      console.log(data);
      dispatch(setUser(data));
    },
    [dispatch],
  );

  useEffect(() => {
    const topic = `/topic/notifications/${currentUser?.id}/countNotifications`;
    if (socket) {
      socket.subscribe(topic, handleReceiveCountNotificationSocket);
    }
    return () => {
      if (socket) {
        socket.unsubscribe(topic);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, currentUser]);
  const updateUserCountNotification = useMutation(updateCountNotifications, {
    onSuccess: data => {
      dispatch(setUser(data));
    },
  });

  const handleClickNotification = useCallback(
    user => {
      const data = {
        userId: user?.id,
        isIncrease: false,
      };
      updateUserCountNotification.mutate(data);
    },
    [updateUserCountNotification],
  );
  //kt
  return (
    <ScrollView onScroll={handleScroll}>
      {/* // <ScrollView> */}

      <View style={Styles.container}>
        <View style={Styles.containerSite}>
          <Text style={Styles.textSite}>Home</Text>
          {/* vi */}
          <TouchableOpacity
            onPress={() => handleClickNotification(currentUser)}>
            {currentUser?.notificationsCount > 0 ? (
              <Badge className="bg-green-500 absolute -top-1 z-30" size={16}>
                {currentUser?.notificationsCount}
              </Badge>
            ) : (
              ''
            )}

            <IconFeather
              name="bell"
              size={25}
              color="#A09898"
              solid="#A09898"
              onPress={() => navigation.navigate('Notifications')}
            />
          </TouchableOpacity>
        </View>
        {/*  */}

        <View style={Styles.header}>
          <IconFeather
            name="plus"
            size={25}
            color="#A09898"
            solid="#A09898"
            onPress={() => {
              navigation.navigate('Customize your interests');
            }}
          />
          <Text style={[Styles.textHeader, Styles.textHighline]}>For you</Text>
          <Text style={Styles.textHeader}>Following</Text>
          {/* {topicListRender()} */}
          {/* <View style={Styles.header}>{topicListRender()}</View> */}
          {/* <Text style={Styles.textHeader}>UX</Text>
                    <Text style={Styles.textHeader}>React</Text>
                    <Text style={Styles.textHeader}>JavaScript</Text> */}
        </View>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#8A8383',
          }}
        />
        <View
          style={{
            width: '15%',
            height: 1,
            backgroundColor: '#000',
            marginLeft: 46,
          }}
        />
        {posts.length ? (
          <View>{postList()}</View>
        ) : (
          <View>
            <Text>No posts available</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
export default Home;
