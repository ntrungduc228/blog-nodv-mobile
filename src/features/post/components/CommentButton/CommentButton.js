import {CommentIcon} from '../../../../components/icons';
import {IconWrapper} from '../../../../components';
import React from 'react';
import {routesScreen} from '../../../../navigations';
import {useNavigation} from '@react-navigation/native';

export const CommentButton = ({post}) => {
  const navigation = useNavigation();
  return (
    <IconWrapper
      onPress={() =>
        navigation.navigate(routesScreen.Comment, {
          post: post,
        })
      }>
      <CommentIcon />
    </IconWrapper>
  );
};
