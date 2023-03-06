import {formatRelative} from 'date-fns';
import {useEffect, useMemo, useState} from 'react';
import {Text, View, StyleSheet, Image, Alert, ScrollView} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NotificationType} from '../../config/dataType.js';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesomer from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Styles from './Styles.js';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';
import Post from './Post.js';
import {FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Topic from './Topic.js';
import {getOwnTopics} from '../../api/userApi.js';
import {getPosts} from '../../api/postApi.js';
import {Spinner} from '../../component/Spinner/Spinner';
// import {TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const currentUser = useSelector(state => state.user.data);
  const [blackList, setBlackList] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicSlug, setTopicSlug] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  // console.log(topics);
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
      setIsLoading(false);
    }
    // setIsLoading(true);
    fetchData();
  }, [limit, posts]);

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 150;
    if (isCloseToBottom) {
      setLimit(limit + 5);
      console.log(limit);
    }
  };

  const handleChangeTopic = async topic => {
    console.log('click');
    setTopicSlug(topic.slug);
  };

  const handleChangeAllTopic = async () => {
    setTopicSlug('');
  };

  const handleChangeFollowTopic = async () => {
    setTopicSlug('');
  };

  const handleUpdate = async () => {
    setUpdate(true);
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
            onPress={() =>
              navigation.push('PostDetail', {
                id: post.id,
              })
            }>
            <Post key={index} post={post} />
          </TouchableOpacity>
        )
      );
    });
  };

  const topicListRender = () => {
    return topics.map((topic, index) => {
      return (
        <TouchableOpacity onPress={() => handleChangeTopic(topic)}>
          <Text style={Styles.textHeader}>{topic.name}</Text>
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
          <View>
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
          <TouchableOpacity
            className="mr-2"
            onPress={() => handleChangeAllTopic()}>
            <View style={Styles.borderBottom}>
              <Text style={[Styles.textHeader, Styles.textHighline]}>
                For you
              </Text>
            </View>
          </TouchableOpacity>

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

export default Home;
