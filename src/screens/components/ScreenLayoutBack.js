import {Text, View} from 'react-native';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export const ScreenLayoutBack = ({children}) => {
  return <View className="bg-white h-full">{children}</View>;
};
const Header = ({title}) => {
  const navigation = useNavigation();
  return (
    <View className="h-14 w-full flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity className="mx-5" onPress={() => navigation.goBack()}>
          <IconFontAwesome5 name="arrow-left" size={20} regular />
        </TouchableOpacity>
        <Text className="font-medium text-xl text-black">{title}</Text>
      </View>
    </View>
  );
};

const Body = ({children}) => {
  return <View className="flex-1 mt-4">{children}</View>;
};

ScreenLayoutBack.Header = Header;

ScreenLayoutBack.Body = Body;
