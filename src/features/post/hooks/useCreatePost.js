import {createPost} from '../../../api/postApi';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';

export const useCreatePost = (
  options = {
    onSuccess: null,
    onError: null,
  },
) => {
  const {onSuccess, onError} = options;
  const navigate = useNavigation();
  return useMutation(createPost, {
    onSuccess: data => {
      onSuccess && onSuccess(data);
      navigate.navigate('PostDetail', {postId: data.id});
    },
    onError: error => {
      onError && onError(error);
      console.log('error from useCreatePost', error);
    },
  });
};
