import {Text, View} from 'react-native';

import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const PostToolbar = ({children}) => {
  return (
    <View
      style={{
        position: 'absolute',
        transform: [{translateX: -80}],
      }}
      className="absolute px-4 left-1/2 flex-row items-center rounded-full h-10 bottom-10 bg-white shadow">
      {children}
    </View>
  );
};

const Divider = () => <View className="w-[1px] mx-4 bg-slate-300 h-[40%]" />;

const Item = ({icon, children, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center min-w-[40px]">
      {icon}
      <Text className="text-slate-400 ml-1">{children}</Text>
    </TouchableOpacity>
  );
};
export {Item as PostToolbarItem, Divider as PostToolbarDivider};

PostToolbar.Item = Item;
PostToolbar.Divider = Divider;

export default PostToolbar;
