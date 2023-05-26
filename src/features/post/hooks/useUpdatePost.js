import {useMutation, useQueryClient} from 'react-query';

import {updatePost} from '../../../api/postApi';
import {useNavigation} from '@react-navigation/native';

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(data => updatePost(data), {
    onSuccess: (_, variable) => {
      navigation.navigate('PostDetail', {postId: variable.id}, {replace: true});
      queryClient.invalidateQueries(['post', variable.id]);
    },
    onError: error => {
      console.log('error from useUpdatePost', error);
    },
  });
};
