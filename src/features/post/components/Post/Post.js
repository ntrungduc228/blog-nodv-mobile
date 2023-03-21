import {BookmarkIcon, BookmarkPlusIcon} from '../../../../components/icons';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Avatar} from 'react-native-paper';
import {IconWrapper} from '../../../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PostMenu} from '../PostMenu/PostMenu.js';
import Styles from './Styles.js';
import {format} from 'date-fns';
import routesScreen from '../../../../navigations/routesScreen.js';
import {useNavigation} from '@react-navigation/native';
import {usePost} from '../../context/PostContext';

export function Post() {
  const navigation = useNavigation();
  const {updateBookmark, post, unHidePost} = usePost();
  const handleNavigateToPostDetail = () => {
    navigation.navigate(routesScreen.PostDetail, {
      postId: post.id,
    });
  };

  if (post.isHide) {
    return (
      <View className="flex-row justify-between px-6 items-center py-4 border-b-2  border-gray-100">
        <View className="flex-row items-center gap-2">
          <MaterialCommunityIcons
            name="inbox-remove-outline"
            size={24}
            color="black"
          />
          <Text>Post is hide</Text>
        </View>
        <TouchableOpacity onPress={unHidePost}>
          <View className="h-8 px-4 border items-center justify-center rounded-md  border-gray-400">
            <Text className="text-green-700">Unhide</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={Styles.body} className="bg-white">
      <View style={Styles.bodyTop}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routesScreen.Profile, {
              email: post.user?.email,
            })
          }
          className="flex-1 flex-row items-center">
          {post.user?.avatar ? (
            <Avatar.Image
              source={{
                uri: post.user.avatar,
                method: 'POST',
                headers: {
                  Pragma: 'no-cache',
                },
                body: 'Your Body goes here',
              }}
              size={20}
            />
          ) : (
            <Avatar.Text
              label={post.user.username[0]}
              size={20}
              color="white"
              style={{backgroundColor: '#1E90FF'}}
            />
          )}
          <Text style={Styles.userName}>{post.user.username}</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.post}>
        <View style={Styles.post}>
          <View style={Styles.titlePost} className="justify-between pr-6">
            <Text
              onPress={handleNavigateToPostDetail}
              style={Styles.contentPost}>
              {post.title}
            </Text>
            <TouchableOpacity onPress={handleNavigateToPostDetail}>
              {post?.thumbnail ? (
                <Image
                  source={{
                    uri: post.thumbnail,
                    method: 'POST',
                    headers: {
                      Pragma: 'no-cache',
                    },
                    body: 'Your Body goes here',
                  }}
                  className="w-[80px] h-[60px] rounded"
                />
              ) : (
                <View className="w-[80px] h-[60px] bg-blue-400 rounded justify-center items-center font-bold">
                  <Text className="font-extrabold text-white">Nodv</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center mt-2">
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
            <View className="flex-row justify-end items-center flex-1 mr-6 gap-4">
              <IconWrapper size={24} onPress={updateBookmark}>
                {post.isBookmarked ? (
                  <BookmarkIcon className="text-black" />
                ) : (
                  <BookmarkPlusIcon className="text-gray-500" />
                )}
              </IconWrapper>
              <View>
                <PostMenu postId={post.id} />
              </View>
            </View>
          </View>
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
  );
}
