import {FAB} from 'react-native-paper';
import {LogBox} from 'react-native';
import {postEditorMode} from '../../../../screens';
import {useNavigation} from '@react-navigation/native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const PostCreateTrigger = () => {
  const navigation = useNavigation();
  return (
    <FAB
      icon="plus"
      color="#fff"
      size="medium"
      className="bg-emerald-600 rounded-full absolute right-4 bottom-4"
      onPress={() =>
        navigation.push('PostEditor', {
          mode: postEditorMode.CREATE,
        })
      }
    />
  );
};
