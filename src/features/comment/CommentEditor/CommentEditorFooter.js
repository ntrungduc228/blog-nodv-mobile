import {View} from 'react-native';
import {Button} from 'react-native-paper';

const CommentEditorFooter = ({onCancel, onSubmit, disabled, isEdit}) => {
  return (
    <View className="pt-5 flex-row justify-end gap-2 px-4">
      <Button textColor="#000" size="small" className="btn" onPress={onCancel}>
        Cancel
      </Button>
      <Button
        onPress={onSubmit}
        variant="contained"
        buttonColor="#4caf50"
        textColor="#fff"
        size="small"
        className="btn"
        disabled={disabled}>
        {isEdit ? 'Update' : 'Comment'}
      </Button>
    </View>
  );
};

export default CommentEditorFooter;
