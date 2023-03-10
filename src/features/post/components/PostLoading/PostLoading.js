import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {View} from 'react-native';

export const PostLoading = () => {
  return (
    <View className="mb-10">
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={20} height={20} borderRadius={50} />
          <SkeletonPlaceholder.Item marginLeft={10} height={18} width={100} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginTop={10}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item height={16} width={200} />
            <SkeletonPlaceholder.Item height={16} width={200} marginTop={5} />
            <SkeletonPlaceholder.Item height={16} width={180} marginTop={5} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item height={60} width={70} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </View>
  );
};
