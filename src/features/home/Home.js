import {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';

import {Badge} from 'react-native-paper';
import IconFeather from 'react-native-vector-icons/Feather';
import {useMutation} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {getOwnTopics, updateCountNotifications} from '../../api/userApi.js';
import {setUser} from '../../redux/slices/userSlice.js';
import {PostLoading} from '../post/index.js';
import Post from './Post.js';
import Styles from './Styles.js';

function Home({navigation}) {
  const LIMIT = 6;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  // const currentUser = useSelector(state => state.user.data.info);
  const curTopicFollow = useSelector(state => state.topic.topicFollow);
  const [blackList, setBlackList] = useState([]);
  const [topicSlug, setTopicSlug] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState('For you');
  const [listScrollTopic, setListScrollTopic] = useState(
    curTopicFollow ? curTopicFollow : [],
  );
  const [postLength, setPostLength] = useState(0);
  const setStatusFilter = topicActive => {
    setActive(topicActive);
  };

  const currentUser = useSelector(state => state.user.data.info);
  const socket = useSelector(state => state.socket.data);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    console.log('call all api');
    const updateTopic = navigation.addListener('focus', () => {
      fetchDataTopic();
    });
    return updateTopic;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    setIsLoading(true);
    fetchDataPostByTopic(0, topicSlug);
    fetchDataBlackList();
    // fetchDataTopic();
    setIsLoading(false);
  }

  async function fetchDataPost() {
    const postList = await axiosClient.get(
      `/posts?page=${page}&limit=${LIMIT}&topic=${topicSlug}&title=`,
    );
    setPosts([...posts, ...postList]);
    console.log('call api post onscroll');
  }

  async function fetchDataPostByTopic(curPage, curTopicSlug) {
    setPosts([]);
    const postList = await axiosClient.get(
      `/posts?page=${curPage}&limit=${LIMIT}&topic=${curTopicSlug}&title=`,
    );
    setPosts(postList);
    setPostLength(postList.length);
    console.log('call api post by topic');
  }

  async function fetchDataBlackList() {
    const blackListPost = await axiosClientPrivate.get(`blackLists/list`);
    setBlackList(blackListPost);
    console.log('call api blacklist');
  }

  async function fetchDataTopic() {
    const topicLists = await getOwnTopics();
    setListScrollTopic([{name: 'For you'}, ...topicLists]);
    console.log('call api topic');
  }

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
    if (isCloseToBottom) {
      setPage(page + 1);
      setIsLoading(true);
      await fetchDataPost();
      setIsLoading(false);
    }
  };

  const handleChangeTopic = async topic => {
    setPage(0);
    setPostLength(0);
    setIsLoading(true);
    setStatusFilter(topic.name);
    setTopicSlug(topic.slug);
    await fetchDataPostByTopic(0, topic.slug);
    setIsLoading(false);
  };

  const handleChangeAllTopic = async topic => {
    setPostLength(0);
    setIsLoading(true);
    setPage(0);
    setStatusFilter(topic.name);
    setTopicSlug('');
    await fetchDataPostByTopic(0, '');
    setIsLoading(false);
  };

  const postList = () => {
    return posts.map((post, index) => {
      return (
        !blackList.includes(post.id) && (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.push('PostDetail', {
                id: post.id,
              });
            }}>
            <Post key={index} post={post} />
          </TouchableOpacity>
        )
      );
    });
  };

  const topicListRender = () => {
    return listScrollTopic.map((topic, index) => {
      return (
        <TouchableOpacity
          key={index}
          style={Styles.wrapTopic}
          onPress={() =>
            topic.name === 'For you'
              ? handleChangeAllTopic(topic)
              : handleChangeTopic(topic)
          }>
          <ScrollBarTopicItem key={index} topic={topic} isActive={active} />
        </TouchableOpacity>
      );
    });
  };

  const loadingRender = () => {
    const elements = [];
    const times = postLength < 1 ? 5 : postLength < 5 ? 3 : 1;
    for (let i = 0; i < times; i++) {
      elements.push(<PostLoading key={i} />);
    }
    return elements;
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

        <ScrollView horizontal={true} style={Styles.header}>
          <View style={Styles.wrapTopic}>
            <IconFeather
              name="plus"
              size={25}
              color="rgba(117, 117, 117, 1)"
              solid="rgba(117, 117, 117, 1)"
              onPress={() => {
                navigation.navigate('Customize your interests');
              }}
            />
          </View>

          {topicListRender()}
        </ScrollView>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#ebeaea',
          }}
        />
        {posts.length ? (
          <View>{postList()}</View>
        ) : (
          !isLoading && (
            <View className="mt-20 justify-center flex-1 h-screen">
              <Text className="text-black text-lg text-center mx-10 flex-1 ">
                No posts available
              </Text>
            </View>
          )
        )}
      </View>
      {/* {isLoading ? <Spinner /> : <></>} */}
      {isLoading ? <>{loadingRender()}</> : <></>}
    </ScrollView>
  );
}

function ScrollBarTopicItem({topic, isActive}) {
  return (
    <View style={[isActive === topic.name && Styles.borderBottom]}>
      <Text
        style={
          isActive === topic.name
            ? [Styles.textHeader, Styles.textHighline, Styles.paddingBottom]
            : Styles.textHeader
        }>
        {topic.name}
      </Text>
    </View>
  );
}

export default Home;
