import {Text, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

export const ScreenLayout = ({children}) => {
  return (
    <SafeAreaView className="pt-14 bg-white flex-1">{children}</SafeAreaView>
  );
};

const Header = ({children, style}) => {
  return (
    <View className={'h-14  flex-row px-6 items-center ' + style}>
      {children}
    </View>
  );
};

const Title = ({children}) => {
  return <Text className="text-2xl font-bold text-black">{children}</Text>;
};

const Body = ({children}) => {
  return <View className="bg-white">{children}</View>;
};

ScreenLayout.Header = Header;
ScreenLayout.Title = Title;
ScreenLayout.Body = Body;
