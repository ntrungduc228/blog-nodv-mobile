import {getBookmarkByUserId} from '../../../api/bookmarkApi';
import {useQuery} from 'react-query';

export const useGetBookmark = () => {
  return useQuery('bookmark', getBookmarkByUserId, {});
};
