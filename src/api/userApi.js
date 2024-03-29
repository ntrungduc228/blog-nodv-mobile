import axiosClient, {axiosClientPrivate} from './axiosClient';

import {generateParamsString} from '../utils/generateParamsString';

const url = '/users';
const userApi = {
  getAllUsers: () => axiosClientPrivate.get(url),
  getUserProfile: email => axiosClient.get(`${url}/${email}`),
  searchUser: (q, page = 0, limit = 10) =>
    axiosClientPrivate.get(`${url}/search?q=${q}&page=${page}&limit=${limit}`),
  updateUserProfile: data => axiosClientPrivate.put(url, data),
  followUser: id => axiosClientPrivate.patch(`${url}/follow/${id}`, {}),
  unFollowUser: id => axiosClientPrivate.patch(`${url}/unFollow/${id}`),
  addTopics: topics => axiosClientPrivate.patch(`${url}/topics`, {topics}),
  followTopic: id => axiosClientPrivate.patch(`${url}/topics/${id}`),
  getOwnTopics: () => axiosClientPrivate.get(`${url}/topics`),
  getAllUnFollow: (page = 0, limit = 3) =>
    axiosClientPrivate.get(url + '/getAllUnFollow'),
  updateCountNotifications: ({userId, isIncrease}) => {
    return axiosClientPrivate.patch(
      `${url}/${userId}${isIncrease ? '?isIncrease=' + isIncrease : ''}`,
    );
  },
  getAllUsersFollower: id => axiosClient.get(`${url}/${id}/follower`),
  getAllUsersFollowing: id => axiosClient.get(`${url}/${id}/following`),
  getUsersNotFollow: limit =>
    axiosClientPrivate.get(url + `/getUsersNotFollowed?limit=${limit}`),
  getMoreUsersNotFlow: limit =>
    axiosClientPrivate.get(url + `/getUsersNotFollowed?limit=${limit}`),
  getFollowers: (userId, {page = 0, limit = 5}) => {
    const params = {
      page,
      limit,
    };
    const paramsString = generateParamsString(params);
    return axiosClientPrivate.get(`${url}/${userId}/followers?${paramsString}`);
  },

  getFollowing: (userId, {page = 0, limit = 5}) => {
    const params = {
      page,
      limit,
    };
    const paramsString = generateParamsString(params);
    return axiosClientPrivate.get(`${url}/${userId}/following?${paramsString}`);
  },
};
export const {
  getAllUsers,
  getUserProfile,
  searchUser,
  updateUserProfile,
  followUser,
  getAllUnFollow,
  unFollowUser,
  addTopics,
  followTopic,
  getOwnTopics,
  updateCountNotifications,
  getAllUsersFollower,
  getAllUsersFollowing,
  getMoreUsersNotFlow,
  getUsersNotFollow,
  getFollowers,
  getFollowing,
} = userApi;
