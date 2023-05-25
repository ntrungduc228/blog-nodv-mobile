import axiosClient, {axiosClientPrivate} from './axiosClient';

import Config from 'react-native-config';
import axios from 'axios';
import {generateParamsString} from '../utils/generateParamsString';

const url = '/posts';

const postApi = {
  // getPosts: ({page = 0, limit = 5, topic, title}) =>
  //   axiosClientPrivate.get(url, {
  //     params: {
  //       page,
  //       limit,
  //       topic,
  //       title,
  //     },
  //   }),
  getPosts: ({
    page = 0,
    limit = 10,
    topic = null,
    title = null,
    user = null,
    sort = null,
    direction = null,
    isFollowing = null,
  }) => {
    const params = {
      page,
      limit,
      topic,
      user,
      title,
      isFollowing,
      sort,
      direction,
    };
    const paramsString = generateParamsString(params);
    return axiosClient.get(`${url}?${paramsString}`);
  },

  getPostsTrending: (limit = 6) =>
    axiosClientPrivate.get(`${url}/trending?limit=${limit}`),

  getPostById: id => axiosClientPrivate.get(`${url}/${id}`),
  getPostsByUserId: id => axiosClientPrivate.get(`${url}/user/${id}`),
  getPostsByFollowing: ({page = 0, limit = 5}) => {
    const params = {
      page,
      limit,
    };
    const paramsString = generateParamsString(params);
    return axiosClientPrivate.get(`${url}/following?${paramsString}`);
  },

  getOwnedPosts: isPublish =>
    axiosClientPrivate.get(
      `${url}/me${isPublish ? '?isPublish=' + isPublish : ''}`,
    ),

  createPost: post => axiosClientPrivate.post(url, post),

  updatePost: post => {
    return axiosClientPrivate.put(`${url}/${post.id}`, post);
  },

  deletePost: id => axiosClientPrivate.delete(`${url}/${id}`),

  publishPost: id => axiosClientPrivate.patch(`${url}/${id}/publish`, null),

  unPublishPost: id =>
    axiosClientPrivate.patch(`${url}/${id}/unpublished`, null),

  likePost: id => axiosClientPrivate.patch(`${url}/${id}/like`, null),

  unLikePost: id => axiosClientPrivate.patch(`${url}/${id}/unlike`, null),

  hidePost: id => axiosClientPrivate.patch(`/blackLists/${id}`, null),
  unHidePost: id => axiosClientPrivate.delete(`/blackLists/${id}`, null),

  getListPostHided: () => axiosClientPrivate.get('/blackLists/list'),

  getPostsRecommend: async id => {
    const response = await axios.get(
      `${Config.REACT_APP_SERVER_RECOMMEND_URL}/api/posts/${id}/recommend`,
    );
    return response.data;
  },
  bookmarkPost: id => axiosClientPrivate.patch(`${url}/${id}/bookmark`, null),
  reportPost: ({id, content}) =>
    axiosClientPrivate.post(`${url}/${id}/report`, {
      objectId: id,
      content: [content],
    }),
};

export const {
  getPosts,
  createPost,
  getPostById,
  getOwnedPosts,
  deletePost,
  publishPost,
  unPublishPost,
  likePost,
  unLikePost,
  updatePost,
  getPostsTrending,
  getPostsByUserId,
  hidePost,
  unHidePost,
  getListPostHided,
  getPostsRecommend,
  getPostsByFollowing,
  reportPost,
} = postApi;

export default postApi;
