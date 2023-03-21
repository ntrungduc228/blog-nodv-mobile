import {axiosClientPrivate} from './axiosClient';
import {generateParamsString} from '../utils/generateParamsString';

const url = '/bookmarks';

const bookmarkApi = {
  getBookmarkByUserId: () => axiosClientPrivate.get(`${url}/user`),
  getPostIdsBookmark: () => axiosClientPrivate.get(`${url}/list`),
  updatePostToBookmark: postId => axiosClientPrivate.patch(`${url}/${postId}`),
  getBookmark: ({page = 0, limit = 5}) => {
    const params = {
      page,
      limit,
    };
    const paramsString = generateParamsString(params);
    return axiosClientPrivate.get(`${url}?${paramsString}`);
  },
};

export const {
  getBookmarkByUserId,
  updatePostToBookmark,
  getPostIdsBookmark,
  getBookmark,
} = bookmarkApi;

export default bookmarkApi;
