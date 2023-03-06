import {Chip} from 'react-native-paper';
import {routesScreen} from '../../../../navigations';
import {useNavigation} from '@react-navigation/native';

export const Topic = ({topic, onPress, mode = 'flat'}) => {
  const {name} = topic;
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(routesScreen.PostsTopic, {topic: topic});
    onPress && onPress();
  };

  return (
    <Chip
      mode={mode}
      onPress={handlePress}
      textStyle={{
        fontWeight: 'normal',
      }}
      className="rounded-full bg-gray-100">
      {name}
    </Chip>
  );
};
