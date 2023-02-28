import * as ImagePicker from 'react-native-image-picker';

import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import {ScrollView, View} from 'react-native';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import {Text} from 'react-native-paper';
import storage from '@react-native-firebase/storage';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};

export const Editor = forwardRef(({initialContentHTML = ''}, ref) => {
  const editorRef = useRef(null);
  const [content, setContent] = useState(initialContentHTML);

  const handleUploadImage = useCallback(async () => {
    const res = await ImagePicker.launchImageLibrary(options);
    if (res.didCancel) {
      return;
    }
    const url = await uploadImage(res.assets[0].uri);
    if (url) {
      editorRef.current.insertImage(url);
    }
  }, []);

  const uploadImage = async imageUri => {
    if (!imageUri) {
      return null;
    }
    try {
      const reference = storage().ref(
        'images/' + new Date().getTime() + '.jpg',
      );
      const response = await fetch(imageUri);
      const blob = await response.blob();

      await reference.put(blob);
      const url = await reference.getDownloadURL();
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getContent: () => content,
      };
    },
    [content],
  );

  return (
    <View className="h-full">
      <ScrollView>
        <RichEditor
          initialContentHTML={initialContentHTML}
          initialFocus={true}
          className="flex-1 px-2 text-xl"
          ref={editorRef}
          onChange={setContent}
          placeholder="Write something..."
        />
      </ScrollView>
      <RichToolbar
        onPressAddImage={handleUploadImage}
        className="items-center"
        selectedButtonStyle={{backgroundColor: 'white'}}
        actions={[
          actions.insertImage,
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.insertBulletsList,
          actions.insertOrderedList,
          actions.insertLink,
          actions.keyboard,
          actions.undo,
          actions.redo,
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          actions.heading5,
        ]}
        iconMap={{
          // eslint-disable-next-line react/no-unstable-nested-components
          [actions.heading1]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H1</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          [actions.heading2]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H2</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          [actions.heading3]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H3</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          [actions.heading4]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H4</Text>
          ),
          // eslint-disable-next-line react/no-unstable-nested-components
          [actions.heading5]: ({tintColor}) => (
            <Text style={[{color: tintColor}]}>H5</Text>
          ),
        }}
        editor={editorRef}
      />
    </View>
  );
});
