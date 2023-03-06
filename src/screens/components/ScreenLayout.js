import {Text, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

export const ScreenLayout = ({children, title}) => {
  return (
    <SafeAreaView className="pt-14 bg-white flex-1">
      <View className="h-14 justify-center px-6">
        <Text className="text-2xl font-bold text-black">{title}</Text>
      </View>
      <View>{children}</View>
    </SafeAreaView>
  );
};
