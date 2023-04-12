import axiosClient, {axiosClientPrivate} from './axiosClient';

const url = '/comments';
const commentApi = {
  getComment: postId => axiosClient.get(`posts/${postId}${url}`),
  createComment: comment => axiosClientPrivate.post(`${url}`, comment),
  likeComment: id => axiosClientPrivate.patch(`${url}/${id}/like`),
  unlikeComment: id => axiosClientPrivate.patch(`${url}/${id}/unlike`),
  deleteComment: id => axiosClientPrivate.delete(`${url}/${id}`),
  updateCommentApi: comment =>
    axiosClientPrivate.patch(`${url}/${comment.id}`, comment),
  reportComment: (id, contentReport) =>
    axiosClientPrivate.post(
      `reporting/report/${id}?contentReport=${contentReport}&type=COMMENT`,
    ),
};
export const {
  getComment,
  createComment,
  likeComment,
  unlikeComment,
  deleteComment,
  updateCommentApi,
  reportComment,
} = commentApi;
export default commentApi;
