import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useMemo, useState, useMutation, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './Styles';
import {Avatar} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NotificationType} from '../../config/dataType.js';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesomer from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import axiosClient from '../../api/axiosClient.js';
import {axiosClientPrivate} from '../../api/axiosClient.js';
import {useQueryClient} from 'react-query';
import {format} from 'date-fns';
import {PostMenu} from '../post/components/PostMenu/PostMenu';
// import {TouchableOpacity} from 'react-native-gesture-handler';

// import {useMutation} from '@apollo/react-hooks';
// import { useMutation, useQueryClient } from 'react-query';
function Post({post}) {
  const currentUser = useSelector(state => state.user.data.info);
  const checkPost = post.userId === currentUser.id;
  // console.log(checkPost);
  //  console.log(currentUser.info.id)
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const checkBookmark = await axiosClientPrivate.get(`bookmarks/list`);
      // console.log(checkBookmark)
      if (checkBookmark.includes(post.id)) setIsBookmark(true);
    }
    fetchData();
  }, [isBookmark]);
  const handleBookmark = async id => {
    await axiosClientPrivate.patch(`/bookmarks/${id}`);
    setIsBookmark(!isBookmark);
  };

  const handleHidePost = async id => {
    setIsHide(true);
    console.log(id);
    await axiosClientPrivate.patch(`/blackLists/${id}`);
  };

  // const handleHidePost = useMutation(hidePost, {
  //     onSuccess: (data)
  // })

  return (
    !isHide && (
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
            <Text style={Styles.contentPost}>{post.title}</Text>
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
            <Text style={Styles.timeUpdatePost}>
              {format(new Date(post.createdDate), 'MMM d')}
            </Text>
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
          <TouchableOpacity>
            <IconFontAwesomer
              name={isBookmark ? 'bookmark' : 'bookmark-o'}
              size={20}
              solid="#000"
              color="#000"
              onPress={() => handleBookmark(post.id)}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconAntDesign
              name="minuscircleo"
              size={20}
              color="#000"
              solid="#000"
              style={Styles.titleIcon}
              onPress={() => handleHidePost(post.id)}
            />
          </TouchableOpacity>
          {checkPost ? (
            <TouchableOpacity style={Styles.iconDot} className="mb-2 mr-2">
              <PostMenu postId={post.id} style={Styles.iconDot} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <IconFeather
                name="more-vertical"
                size={20}
                color="#000"
                solid="#000"
                style={Styles.titleIcon}
              />
            </TouchableOpacity>
          )}
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
    )
  );
}

export default Post;
