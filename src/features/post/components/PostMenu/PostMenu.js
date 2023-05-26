import {Button, Dialog, Menu, Portal, Text} from 'react-native-paper';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {postEditorMode} from '../../../../screens';
import {reportPost} from '../../../../api/postApi';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {usePost} from '../../context/PostContext';
import {useState} from 'react';

export const PostMenu = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);

  const {post, hidePost, deletePost, publishPost, unPublishPost} = usePost();
  const {isAuthor, id: postId} = post;

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
  const showDialog = () => setIsShowDeleteDialog(true);
  const hideDialog = () => setIsShowDeleteDialog(false);
  const {mutate: report} = useMutation(reportPost, {
    onSuccess: () => {
      // show succes message
      Toast.show({
        type: 'success',
        text1: 'Reported post',
        visibilityTime: 5000,
        position: 'bottom',
        bottomOffset: 70,
      });
    },
  });

  return (
    <View>
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
          <TouchableOpacity onPress={openMenu}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        }>
        {isAuthor ? (
          <>
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate(
                  'PostEditor',
                  {
                    mode: postEditorMode.EDIT,
                    postId: postId,
                  },
                  {replace: true},
                );
              }}
              title="Edit"
            />
            {post.isPublish ? (
              <Menu.Item onPress={unPublishPost} title="Unpublish" />
            ) : (
              <Menu.Item onPress={publishPost} title="Publish" />
            )}
            <Menu.Item
              onPress={() => {
                closeMenu();
                showDialog();
              }}
              title="Delete"
            />
          </>
        ) : (
          <>
            <Menu.Item onPress={hidePost} title="Hide post" />
            <Menu.Item
              onPress={() => {
                closeMenu();
                report({id: postId, content: 'SPAM'});
              }}
              title="Report post"
            />
          </>
        )}
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
    </View>
  );
};
