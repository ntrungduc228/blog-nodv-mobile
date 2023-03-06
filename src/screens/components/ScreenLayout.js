import {ScrollView, Text, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

export const ScreenLayout = ({children, title}) => {
  return (
    <SafeAreaView>
      <ScrollView className="pt-14 bg-white">
        <View className="h-14 justify-center px-6">
          <Text className="text-2xl font-bold text-black">{title}</Text>
        </View>
        <View>{children}</View>
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};
