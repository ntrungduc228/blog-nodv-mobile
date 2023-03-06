import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';
import {useEffect, useState} from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import Post from './Post.js';
import {Spinner} from '../../components';
import Styles from './Styles.js';
import Topic from './Topic.js';
import {getOwnTopics} from '../../api/userApi.js';
import {useSelector} from 'react-redux';

// import {TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const currentUser = useSelector(state => state.user.data);
  const [blackList, setBlackList] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicSlug, setTopicSlug] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState('For you');
  const [listScrollTopic, setListScrollTopic] = useState([]);
  const [action, setAction] = useState(false);
  const setStatusFilter = topicActive => {
    setActive(topicActive);
  };

  // console.log(posts);
  // console.log(isLoading);
  // console.log(currentUser)
  // console.log(topics)
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const postList = await axiosClient.get(
        `/posts?page=${page}&limit=${limit}&topic=${topicSlug}&title=`,
      );
      const blackList = await axiosClientPrivate.get(`blackLists/list`);
      const topicLists = await getOwnTopics();
      // console.log(topicList);
      setBlackList(blackList);
      setPosts(postList);
      setTopics(topicLists);
      setListScrollTopic([{name: 'For you'}, ...topicLists]);
      // console.log(listScrollTopic);
      setIsLoading(false);
    }
    // setIsLoading(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, topicSlug]);

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 30;
    if (isCloseToBottom) {
      setLimit(limit + 10);
      console.log(limit);
      setIsLoading(true);
    }
  };

  const handleChangeTopic = async topic => {
    setLimit(10);
    console.log(topic.name);
    setPosts([]);
    setIsLoading(true);
    setStatusFilter(topic.name);
    setTopicSlug(topic.slug);
  };

  const handleChangeAllTopic = async topic => {
    setLimit(10);
    setStatusFilter(topic.name);
    setTopicSlug('');
  };

  const handleChangeFollowTopic = async () => {
    setTopicSlug('');
  };

  const handleUpdate = async () => {
    // setUpdate(true);
  };

  const topicList = () => {
    return topicList.map((topic, index) => {
      return (
        <Text key={index} style={Styles.textHeader}>
          {}
        </Text>
      );
    });
  };

  const postList = () => {
    return posts.map((post, index) => {
      return (
        !blackList.includes(post.id) && (
          <TouchableOpacity
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
          style={Styles.wrapTopic}
          onPress={() =>
            topic.name === 'For you'
              ? handleChangeAllTopic(topic)
              : handleChangeTopic(topic)
          }>
          <ScrollBarTopicItem topic={topic} isActive={active} />
        </TouchableOpacity>
      );
    });
  };

  const topic = () => {
    console.log('onPress');
    return <Topic />;
  };

  return (
    <ScrollView onScroll={handleScroll}>
      <View style={Styles.container}>
        <View style={Styles.containerSite}>
          <Text style={Styles.textSite}>Home</Text>
          <IconFeather
            name="bell"
            size={35}
            color="#A09898"
            solid="#A09898"
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>

        <ScrollView horizontal={true} style={Styles.header}>
          <View style={Styles.wrapTopic}>
            <IconFeather
              name="plus"
              size={25}
              color="#A09898"
              solid="#A09898"
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
            backgroundColor: '#8A8383',
          }}
        />
        {/* <View
          style={{
            width: '15%',
            height: 1,
            backgroundColor: '#000',
            marginLeft: 46,
          }}
        /> */}
        {posts.length ? (
          <View>{postList()}</View>
        ) : (
          <View>
            <Text>No posts available</Text>
          </View>
        )}
      </View>
      {isLoading ? <Spinner /> : <></>}
    </ScrollView>
  );
}

function ScrollBarTopicItem({topic, isActive}) {
  // console.log(topic);
  const [active, setActive] = useState(isActive);

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
      {/* <TouchableOpacity
            style={Styles.wrapTopic}
            className="mr-2"
            onPress={() => handleChangeAllTopic()}>
            <View style={Styles.borderBottom}>
              <Text
                style={[
                  Styles.textHeader,
                  Styles.textHighline,
                  Styles.paddingBottom,
                ]}>
                For you
              </Text>
            </View>
          </TouchableOpacity> */}
    </View>
  );
}

export default Home;
