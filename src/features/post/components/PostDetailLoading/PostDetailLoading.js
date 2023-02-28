import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const PostDetailLoading = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item marginTop={20}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'80%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={18} width={'70%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'60%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={18} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
          <SkeletonPlaceholder.Item marginTop={10} width={'100%'} height={20} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
