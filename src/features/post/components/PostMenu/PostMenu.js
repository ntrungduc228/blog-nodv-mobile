import {Button, Dialog, Menu, Portal, Text} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {postEditorMode} from '../../../../screens';
import {useDeletePost} from '../../hooks';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

export const PostMenu = ({postId}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();
  const {mutate: deletePost} = useDeletePost({
    onSuccess: () => {
      navigation.goBack();
    },
  });
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
  const showDialog = () => setIsShowDeleteDialog(true);
  const hideDialog = () => setIsShowDeleteDialog(false);

  return (
    <>
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
          <TouchableOpacity onPress={openMenu} className="ml-2">
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
        <Menu.Item
          onPress={() => {
            closeMenu();
            showDialog();
          }}
          title="Delete"
        />
      </Menu>
      <Portal>
        <Dialog
          visible={isShowDeleteDialog}
          onDismiss={hideDialog}
          className="rounded-lg bg-white">
          <Dialog.Title>Delete post</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete this post? this action cannot be
              undone.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button
              textColor="green"
              onPress={() => {
                deletePost(postId);
                hideDialog();
              }}>
              Delete
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
