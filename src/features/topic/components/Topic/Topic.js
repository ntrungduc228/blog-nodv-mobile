import {Chip} from 'react-native-paper';

export const Topic = ({topic, onPress, mode = 'flat'}) => {
  const {name} = topic;
  return (
    <Chip
      mode={mode}
      onPress={onPress}
      textStyle={{
        fontWeight: 'normal',
      }}
      className="rounded-full bg-gray-100">
      {name}
    </Chip>
  );
};
