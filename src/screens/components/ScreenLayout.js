import {Text, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

export const ScreenLayout = ({children, title}) => {
  return (
    <SafeAreaView className="pt-14 px-4">
      <View className="h-14 justify-center">
        <Text className="text-2xl font-bold text-black">{title}</Text>
      </View>
      <View>{children}</View>
    </SafeAreaView>
  );
};
