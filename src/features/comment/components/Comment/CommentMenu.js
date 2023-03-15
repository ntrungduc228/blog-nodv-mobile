import {useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Dialog, Menu, Portal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from 'react-query';
import {deleteComment} from '../../../../api/commentApi';

const CommentMenu = ({setIsEdit, isUser, commentId}) => {
  const [isDelete, setIsDelete] = useState(false);
  const deleteCommentById = useMutation(deleteComment);
  const handleDeleteComment = () => {
    deleteCommentById.mutate(commentId);
  };
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <>
      {isDelete ? (
        <View>
          <Portal>
            <Dialog
              className="bg-white rounded-lg"
              visible={isDelete}
              onDismiss={() => {}}>
              <Dialog.Title>Delete comment</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  Are you sure you want to delete this comment? this action
                  cannot be undone.
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setIsDelete(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onPress={handleDeleteComment}
                  textColor="green"
                  size="small"
                  className="btn">
                  Delete
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      ) : (
        <View>
          {isUser ? (
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
                className="py-1"
                leadingIcon="pencil-outline"
                onPress={() => {
                  setIsEdit();
                  closeMenu();
                }}
                title="Edit"
              />
              <Menu.Item
                className="py-1"
                leadingIcon="trash-can-outline"
                onPress={() => {
                  setIsDelete(true);
                  closeMenu();
                }}
                title="Delete"
              />
            </Menu>
          ) : (
            <Menu.Item
              className="py-1"
              leadingIcon="flag-variant-outline"
              onPress={() => {}}
              title="Report"
            />
          )}
        </View>
      )}
    </>
  );
};

export default CommentMenu;
