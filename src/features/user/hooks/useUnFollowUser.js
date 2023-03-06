import {unFollowUser} from '../../../api/userApi';
import {useMutation} from 'react-query';

export const useUnFollowUser = (option = {onSuccess: null, onError: null}) => {
  const {onSuccess = null, onError = null} = option;
  return useMutation(userId => unFollowUser(userId), {
    onSuccess: (data, variables) => {
      onSuccess && onSuccess(data, variables);
    },
    onError: (error, variables) => {
      onError && onError(error, variables);
    },
  });
};
