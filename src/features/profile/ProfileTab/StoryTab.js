import {PostListFetch} from '../../post';
import {SafeAreaView} from 'react-native';
import {getPosts} from '../../../api/postApi';
import {useSelector} from 'react-redux';

export const StoryTab = () => {
  const profile = useSelector(state => state?.profile?.data);
  return (
    <SafeAreaView className="bg-white h-full">
      <PostListFetch
        queryKey="profileHome"
        filter={{user: profile?.id}}
        queryFn={getPosts}
      />
    </SafeAreaView>
  );
};
