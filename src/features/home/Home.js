import {ScrollView, Text, View, Button} from 'react-native';
import axiosClient, {axiosClientPrivate} from '../../api/axiosClient.js';
import {useEffect, useState} from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import Post from './Post.js';
import Styles from './Styles.js';
import Topic from './Topic.js';
import {useSelector} from 'react-redux';

function Home({navigation}) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const currentUser = useSelector(state => state.user.data);
  const [blackList, setBlackList] = useState([]);
  const [topics, setTopics] = useState([]);
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

  return (
    <ScrollView onScroll={handleScroll}>
      {/* // <ScrollView> */}

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
