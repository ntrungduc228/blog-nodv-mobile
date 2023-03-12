import {useState} from 'react';
import {Text, View} from 'react-native';
import {Button, Dialog, Menu, Portal} from 'react-native-paper';
import {useMutation} from 'react-query';
import {deleteComment} from '../../../../api/commentApi';

const CommentMenu = ({setIsEdit, setIsOpenMenu, isUser, commentId}) => {
  const [isDelete, setIsDelete] = useState(false);
  const deleteCommentById = useMutation(deleteComment);
  const handleDeleteComment = () => {
    deleteCommentById.mutate(commentId);
    setIsOpenMenu(false);
  };
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
                    setIsOpenMenu(false);
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
        <View className="absolute right-0 top-[24px] bg-white shadow-xl shadow-slate-400 z-[1000]">
          {isUser ? (
            <>
              <Menu.Item
                className="py-1"
                leadingIcon="pencil-outline"
                onPress={setIsEdit}
                title="Edit"
              />
              <Menu.Item
                className="py-1"
                leadingIcon="trash-can-outline"
                onPress={() => setIsDelete(true)}
                title="Delete"
              />
            </>
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
