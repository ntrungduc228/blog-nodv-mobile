import axiosClient, {axiosClientPrivate} from './axiosClient';

import axios from 'axios';

const url = '/posts';

const postApi = {
  getPosts: ({page = 0, limit = 5, topic, title}) =>
    axiosClientPrivate.get(url, {
      params: {
        page,
        limit,
        topic,
        title,
      },
    }),

  getPostsTrending: (limit = 6) =>
    axiosClientPrivate.get(`${url}/trending?limit=${limit}`),

  getPostById: id => axiosClientPrivate.get(`${url}/${id}`),
  getPostsByUserId: id => axiosClientPrivate.get(`${url}/user/${id}`),

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

  unpublishPost: id =>
    axiosClientPrivate.patch(`${url}/${id}/unpublished`, null),

  likePost: id => axiosClientPrivate.patch(`${url}/${id}/like`, null),

  unLikePost: id => axiosClientPrivate.patch(`${url}/${id}/unlike`, null),

  hidePost: id => axiosClientPrivate.patch(`/blackLists/${id}`, null),

  getListPostHided: () => axiosClientPrivate.get('/blackLists/list'),

  getPostsRecommend: async id => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_RECOMMEND_URL}/api/posts/${id}/recommend`,
    );
    return response.data;
  },
};

export const {
  getPosts,
  createPost,
  getPostById,
  getOwnedPosts,
  deletePost,
  publishPost,
  unpublishPost,
  likePost,
  unLikePost,
  updatePost,
  getPostsTrending,
  getPostsByUserId,
  hidePost,
  getListPostHided,
  getPostsRecommend,
} = postApi;

export default postApi;
