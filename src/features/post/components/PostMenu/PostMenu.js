import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Menu} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {postEditorMode} from '../../../../screens';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export const PostMenu = ({postId}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();

  return (
    <Menu
      keyboardShouldPersistTaps="always"
      anchorPosition="bottom"
      visible={visible}
      contentStyle={{
        backgroundColor: '#fff',
        width: 200,
      }}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity onPress={openMenu} className="mt-2 ml-2">
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      }>
      <Menu.Item
        onPress={() => {
          closeMenu();
          navigation.navigate('PostEditor', {
            mode: postEditorMode.EDIT,
            postId: postId,
          });
        }}
        title="Edit"
      />
      <Menu.Item onPress={() => {}} title="Delete" />
      <Menu.Item onPress={() => {}} title="Follow this author" />
      <Menu.Item onPress={() => {}} title="Block author" />
      <Menu.Item onPress={() => {}} title="Report" />
    </Menu>
  );
};
