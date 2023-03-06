import {axiosClientPrivate} from './axiosClient';

const url = '/bookmarks';

const bookmarkApi = {
  getBookmarkByUserId: () => axiosClientPrivate.get(`${url}/user`),
  getPostIdsBookmark: () => axiosClientPrivate.get(`${url}/list`),
  updatePostToBookmark: postId => axiosClientPrivate.patch(`${url}/${postId}`),
};

export const {getBookmarkByUserId, updatePostToBookmark, getPostIdsBookmark} =
  bookmarkApi;

export default bookmarkApi;
