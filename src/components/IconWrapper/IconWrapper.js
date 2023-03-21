import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';

export const IconWrapper = ({size = 24, children, onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View
        style={{
          width: size,
          height: size,
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};
