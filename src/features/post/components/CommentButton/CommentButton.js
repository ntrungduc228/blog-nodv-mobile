import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Chip} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {routesScreen} from '../../../../navigations';

export const CommentButton = ({post}) => {
  const navigation = useNavigation();
  return (
    <Chip
      onPress={() =>
        navigation.navigate(routesScreen.Comment, {
          post: post,
        })
      }
      className="bg-white">
      <FontAwesome name="comment-o" size={18} color="gray" />
    </Chip>
  );
};
