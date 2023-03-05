import {Chip} from 'react-native-paper';
import {View} from 'react-native/Libraries/Components/View/View';

export const Topic = ({topic, onPress, mode = 'flat'}) => {
  const {id, name, slug} = topic;
  return (
    <Chip mode={mode} onPress={onPress} className="rounded-full bg-slate-200">
      {name}
    </Chip>
  );
};
