import {getPostsRecommend} from '../../../api/postApi';
import {useQuery} from 'react-query';

export const useGetRecommendPostsByPostId = postId => {
  return useQuery(['recommendPosts', postId], () => {
    return getPostsRecommend(postId);
  });
};
