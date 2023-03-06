import {Image, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles';
import {axiosClientPrivate} from '../../api/axiosClient.js';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// import {useMutation} from '@apollo/react-hooks';
// import { useMutation, useQueryClient } from 'react-query';
function Post({post}) {
  const currentUser = useSelector(state => state.user.data);
  //  console.log(currentUser.info.id)
  const [isBookmark, setIsBookmark] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      const checkBookmark = await axiosClientPrivate.get(`bookmarks/list`);
      // console.log(checkBookmark)
      if (checkBookmark.includes(post.id)) {
        setIsBookmark(true);
      }
    }
    fetchData();
  }, [isBookmark, post.id]);
  const handleBookmark = async id => {
    setIsBookmark(!isBookmark);
    await axiosClientPrivate.patch(`/bookmarks/${id}`);
  };

  const handleHidePost = async id => {
    // console.log(id)
    await axiosClientPrivate.patch(`/blackLists/${id}`);
  };

  // const handleHidePost = useMutation(hidePost, {
  //     onSuccess: (data)
  // })

  return (
    <View style={Styles.body}>
      <View style={Styles.bodyTop}>
        <Image
          source={{
            uri: post.user.avatar
              ? post.user.avatar
              : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F540994973993086717%2F&psig=AOvVaw1Mrgp1Bdc9w_gq7PTOt3hx&ust=1677994074144000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDe5JfFwf0CFQAAAAAdAAAAABAE',
            method: 'POST',
            headers: {
              Pragma: 'no-cache',
            },
            body: 'Your Body goes here',
          }}
          style={Styles.imageProfile}
        />
        <Text style={Styles.userName}>{post.user.username}</Text>
      </View>
      <View style={Styles.post}>
        <View style={Styles.titlePost}>
          <Text
            onPress={() => {
              navigation.navigate('DetailPost', {id: post.id});
            }}
            style={Styles.contentPost}>
            {post.title}
          </Text>
          <Image
            source={{
              uri: post.thumbnail
                ? post.thumbnail
                : 'https://genk.mediacdn.vn/thumb_w/640/2014/3-d397c379c6dcaa6fdf0e6ef1d8ce4f47-1413790602424.png',
              method: 'POST',
              headers: {
                Pragma: 'no-cache',
              },
              body: 'Your Body goes here',
            }}
            style={Styles.imagePost}
          />
        </View>
        <View style={Styles.timePost}>
          <Text style={Styles.timeUpdatePost}>{post.createdDate}</Text>
          <Text
            style={{
              color: '#A09898',
              fontSize: 20,
              marginTop: -10,
              fontWeight: '700',
              paddingLeft: 5,
            }}>
            .
          </Text>
          <Text style={Styles.timeRead}>{post.timeRead} min read</Text>
        </View>
      </View>
      <View style={Styles.Icon}>
        <IconFontAwesome
          name={isBookmark ? 'bookmark' : 'bookmark-o'}
          size={24}
          solid="#A09898"
          onPress={() => handleBookmark(post.id)}
        />
        <IconAntDesign
          name="minuscircleo"
          size={24}
          color="#A09898"
          solid="#A09898"
          style={Styles.titleIcon}
          onPress={() => handleHidePost(post.id)}
        />
        <IconFeather
          name="more-vertical"
          size={24}
          color="#A09898"
          solid="#A09898"
          style={Styles.titleIcon}
        />
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#F0DFDF',
          marginTop: 19,
        }}
      />
    </View>
  );
}

export default Post;
