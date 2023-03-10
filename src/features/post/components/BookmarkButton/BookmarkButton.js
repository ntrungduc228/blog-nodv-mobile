import {cloneElement, useEffect, useState} from 'react';
import {
  updateBookmark,
  updatePostByIdToBookmark,
} from '../../../../redux/slices/bookmarkSlice';
import {useDispatch, useSelector} from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useBookmarkPost} from '../../hooks/useBookmarkPost';

export const BookmarkButton = ({postId, children}) => {
  const postBookmarkedIds = useSelector(state => state.bookmark.postIds);
  const [isBookmarked, setIsBookmarked] = useState(false);
  useEffect(() => {
    setIsBookmarked(postBookmarkedIds?.includes(postId));
  }, [postBookmarkedIds, postId]);
  const dispatch = useDispatch();

  const handleUpdateLocalBookmark = isLiked => {
    let newPostBookmarkedIds = [...postBookmarkedIds];
    if (isLiked) {
      newPostBookmarkedIds.push(postId);
    } else {
      newPostBookmarkedIds = newPostBookmarkedIds.filter(id => id !== postId);
    }
  };
  const {mutate: bookmarkPost} = useBookmarkPost({
    onSuccess: data => {
      setIsBookmarked(true);
      handleUpdateLocalBookmark(true);
      dispatch(updatePostByIdToBookmark(data));
    },
  });

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    bookmarkPost(postId);
  };

  return children ? (
    typeof children === 'function' ? (
      children({
        isBookmarked,
        handleBookmark,
      })
    ) : (
      cloneElement(children, {
        isBookmarked,
        onPress: handleBookmark,
      })
    )
  ) : (
    <TouchableOpacity onPress={handleBookmark}>
      <MaterialCommunityIcons
        name="bookmark-plus-outline"
        size={24}
        color={isBookmarked ? 'green' : '#000'}
      />
    </TouchableOpacity>
  );
};
