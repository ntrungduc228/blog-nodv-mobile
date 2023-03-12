import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesomer from 'react-native-vector-icons/FontAwesome';
import {PostMenu} from '../post/components/PostMenu/PostMenu';
import Styles from './Styles.js';
import {axiosClientPrivate} from '../../api/axiosClient.js';
import {format} from 'date-fns';
import {routesScreen} from '../../navigations';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

function Post({post}) {
  const currentUser = useSelector(state => state.user.data.info);
  const checkPost = post.userId === currentUser.id;
  const navigation = useNavigation();
  const [isBookmark, setIsBookmark] = useState(false);
  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchData() {
    const checkBookmark = await axiosClientPrivate.get(`bookmarks/list`);
    if (checkBookmark.includes(post.id)) {
      setIsBookmark(true);
    }
  }
  const handleBookmark = async id => {
    await axiosClientPrivate.patch(`/bookmarks/${id}`);
    setIsBookmark(!isBookmark);
  };

  const handleHidePost = async id => {
    setIsHide(true);
    console.log(id);
    await axiosClientPrivate.patch(`/blackLists/${id}`);
  };

  return (
    !isHide && (
      <View style={Styles.body}>
        <View style={Styles.bodyTop}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routesScreen.Profile, {
                email: post.user?.email,
              })
            }
            className="flex-1 flex-row">
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
          </TouchableOpacity>
        </View>
        <View style={Styles.post}>
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
              <TouchableOpacity
                style={Styles.iconDot}
                className="mb-0.5 mr-0.5">
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
              height: 2.5,
              backgroundColor: '#F8F8F8',
              marginTop: 19,
            }}
          />
        </View>
      </View>
    )
  );
}

export default Post;
