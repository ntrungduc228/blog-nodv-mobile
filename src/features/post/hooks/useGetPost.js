import {getPostById} from '../../../api/postApi';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';

export const useGetPost = postId => {
  const navigate = useNavigation();
  return useQuery(['post', postId], () => getPostById(postId), {
    onError: error => {
      navigate.navigate('NotFound');
    },
    enabled: !!postId,
  });
};
