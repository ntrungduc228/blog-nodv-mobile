import {getPostById} from '../../../api/postApi';

const {useQuery} = require('react-query');

export const useGetPost = postId => {
  return useQuery(['post', postId], () => getPostById(postId), {
    onError: error => {
      console.log('🚀 ~ file: useGetPost.js:16 ~ useGetPost ~ error:', error);
    },
    enabled: !!postId,
  });
};
