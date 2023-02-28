import {getPostsTrending} from '../../../api/postApi';
import {useQuery} from 'react-query';

export const useGetPostsTrending = () => {
  return useQuery('postsTrending', () => getPostsTrending());
};
