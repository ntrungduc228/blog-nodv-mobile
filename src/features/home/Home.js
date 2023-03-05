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
import axiosClient from '../../api/axiosClient.js';
import Post from './Post.js';
import {FlatList} from 'react-native';
function Home() {
  // const lists = listPost;
  // console.log('new'+lists)
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    async function fetchData() {
      // get list post
      const postList = await axiosClient.get(
        `/posts?page=${page}&limit=${limit}&topic=&title=`,
      );
      setPosts(postList);
      // setPosts(...posts, postList);
      //   console.log(posts)
      //get list topic
      // const topicList =  await axiosClient.get('/users/topics')
      // setTopics(topicList)
    }
    fetchData();
  }, [limit, page, posts]);

  const handleScroll = async event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    if (isCloseToBottom) {
      // Thực hiện hàm khi scroll đến cuối trang
      //   setPage(page+1);
      setLimit(limit + 5);
      console.log('Đã scroll đến cuối trang' + page);
      // const postList = await axiosClient.get(`/posts?page=${page}&limit=5&topic=&title=`)
      // setPosts(...posts, postList);
      //   useEffect(()=>{
      //     async function fetchData() {
      //       // get list post
      //       const postList = await axiosClient.get(`/posts?page=${page}&limit=5&topic=&title=`)
      //       setPosts(...posts, postList);
      //     //   console.log(posts)
      //       //get list topic
      //       // const topicList =  await axiosClient.get('/users/topics')
      //       // setTopics(topicList)
      //     }
      //     fetchData();
      //   },[posts])
    }
  };
  const topicList = () => {
    return topicList.map(topic => {
      return <Text style={Styles.textHeader}>{}</Text>;
    });
  };

  const postList = () => {
    return posts.map((post, index) => {
      return <Post key={index} post={post} />;
    });
  };

  return (
    <ScrollView onScroll={handleScroll}>
      {/* // <ScrollView> */}
      <View style={Styles.container}>
        <View style={Styles.containerSite}>
          <Text style={Styles.textSite}>Home</Text>
          <IconFeather name="bell" size={35} color="#A09898" solid="#A09898" />
        </View>

        <View style={Styles.header}>
          <Text style={[Styles.textHeader, Styles.textAddTopic]}>+</Text>
          <Text style={[Styles.textHeader, Styles.textHighline]}>For you</Text>
          <Text style={Styles.textHeader}>Following</Text>
          <Text style={Styles.textHeader}>UX</Text>
          <Text style={Styles.textHeader}>React</Text>
          <Text style={Styles.textHeader}>JavaScript</Text>
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
          // <View><Text>Text</Text></View>
          <View>
            <Text>No posts available</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
export default Home;
