import {ScrollView, Text, View, Button} from 'react-native';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';
import {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';
import {getOwnTopics} from '../../api/userApi.js';
import {Spinner} from '../../components/index.js';
import {setTopic} from '../../redux/slices/topicSlice.js';
import Post from './Post.js';
import Styles from './Styles.js';

function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(6);
  const currentUser = useSelector(state => state.user.data.info);
  const curTopicFollow = useSelector(state => state.topic.topicFollow);
  const [blackList, setBlackList] = useState([]);
  const [topicSlug, setTopicSlug] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState('For you');
  const [listScrollTopic, setListScrollTopic] = useState([]);
  console.log('topic: ', topicSlug !== '' ? topicSlug : 'none');
  console.log('line 25 page: ', page);
  const setStatusFilter = topicActive => {
    setActive(topicActive);
  };

  const {isLogin} = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  // const {dataTopic, loading, error} = useQuery(getOwnTopics, {});
  // console.log(dataTopic);
  useEffect(() => {
    setIsLoading(true);
    fetchData();
    console.log('call api done');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    setIsLoading(true);
    fetchDataPost();
    fetchDataBlackList();

    setIsLoading(false);
  }

  async function fetchDataPost() {
    const postList = await axiosClient.get(
      `/posts?page=${page}&limit=${limit}&topic=${topicSlug}&title=`,
    );
    setPosts([...posts, ...postList]);
    console.log('posts.length: ' + posts.length);
    console.log('call api done');
  }

  async function fetchDataPostByTopic(curPage, curTopicSlug) {
    setPosts([]);
    const postList = await axiosClient.get(
      `/posts?page=${curPage}&limit=${limit}&topic=${curTopicSlug}&title=`,
    );
    setPosts(postList);
  }

  async function fetchDataBlackList() {
    const blackListPost = await axiosClientPrivate.get(`blackLists/list`);
    setBlackList(blackListPost);
    console.log('call api done');
  }

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 10;
    if (isCloseToBottom) {
      // setLimit(limit + 10);
      setPage(page + 1);
      setIsLoading(true);
      await fetchDataPost();
      setIsLoading(false);
    }
  };

  const handleChangeTopic = async topic => {
    setPage(0);
    setIsLoading(true);
    setStatusFilter(topic.name);
    setTopicSlug(topic.slug);
    await fetchDataPostByTopic(0, topic.slug);
    setIsLoading(false);
  };

  const handleChangeAllTopic = async topic => {
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
    return curTopicFollow.map((topic, index) => {
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

  return (
    <ScrollView onScroll={handleScroll}>

      <View style={Styles.container}>
        <View style={Styles.containerSite}>
          <Text style={Styles.textSite}>Home</Text>
          <IconFeather
            name="bell"
            size={22}
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
