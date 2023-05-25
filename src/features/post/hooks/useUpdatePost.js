import {updatePost} from '../../../api/postApi';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

export const useUpdatePost = () => {
  const navigation = useNavigation();
  return useMutation(data => updatePost(data), {
    onSuccess: (_, variable) => {
      navigation.navigate('PostDetail', {postId: variable.id});
    },
    onError: error => {
      console.log('error from useUpdatePost', error);
    },
  });
};
