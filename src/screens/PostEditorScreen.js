import {Button, Dialog, Portal} from 'react-native-paper';
import {Editor, useCreatePost, useUpdatePost} from '../features/post';
import {Text, TouchableOpacity, View} from 'react-native';
import {Topic, TopicInput} from '../features/topic';
import {extractHtmlToArrayPlaintext, generateReadingTime} from '../utils';
import {useRef, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const initialPost = {
  title: '',
  description: '',
  content: '',
  topics: [],
  timeRead: 0,
};

export const postEditorMode = {
  CREATE: 'create',
  EDIT: 'edit',
};

export const PostEditorScreen = ({route}) => {
  const {mode, post = initialPost} = route.params;
  const {mutate: createPost} = useCreatePost();
  const {mutate: updatePost} = useUpdatePost();
  const {content, topics} = post;

  const handlePublish = topics => {
    const contentHtml = editorRef.current.getContent();
    const arrayPlaintext = extractHtmlToArrayPlaintext(contentHtml);
    const newPost = {
      title: arrayPlaintext[0] || ' ',
      description: arrayPlaintext[1] || ' ',
      content: contentHtml,
      topics,
      timeRead: generateReadingTime(arrayPlaintext.join(' ')),
    };

    if (mode === postEditorMode.CREATE) {
      createPost(newPost);
    } else if (mode === postEditorMode.EDIT) {
      updatePost({
        id: post.id,
        ...newPost,
      });
    }
  };

  const editorRef = useRef(null);

  return (
    <View className="h-full bg-white">
      <Header onPublish={handlePublish} defaultTopics={topics} mode={mode} />
      <View className="flex-1">
        <Editor ref={editorRef} initialContentHTML={content} />
      </View>
    </View>
  );
};

const Header = ({
  mode = postEditorMode.CREATE,
  onPublish,
  defaultTopics = [],
}) => {
  const navigation = useNavigation();
  const [isShowPublishForm, setIsShowPublishForm] = useState();
  const [isShowAddTopic, setIsShowAddTopic] = useState();
  const showPublishForm = () => {
    setIsShowPublishForm(true);
  };
  const hidePublishForm = () => setIsShowPublishForm(false);
  const handleShowAddTopic = () => setIsShowAddTopic(true);
  const handleHideAddTopic = () => setIsShowAddTopic(false);
  const [topics, setTopics] = useState(defaultTopics || []);
  const handleAddTopic = () => {
    const topicsInput = inputTopicRef.current.getTopics();
    setTopics(topicsInput);
    handleHideAddTopic();
  };
  const handlePublish = () => {
    onPublish(topics);
  };
  const inputTopicRef = useRef(null);

  return (
    <>
      <View className="h-14 px-4 items-center flex w-full flex-row justify-between">
        <TouchableOpacity>
          <AntDesign
            name="close"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showPublishForm}>
          <Text className="text-emerald-700 text-xl">
            {mode === postEditorMode.CREATE ? 'Publish' : 'Update'}
          </Text>
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog
          className="rounded-lg bg-white mx-3"
          visible={isShowPublishForm}
          onDismiss={hidePublishForm}>
          {!isShowAddTopic ? (
            <>
              <View className="h-14 flex-row items-center justify-between px-4">
                <Text className="text-2xl font-bold text-slate-700">
                  Ready to publish?
                </Text>
              </View>
              <Dialog.Content className="min-h-[140px]">
                <TouchableOpacity onPress={handleShowAddTopic}>
                  <Text
                    variant="bodyMedium"
                    className="text-emerald-700 text-lg">
                    {topics.length > 0 ? 'Edit' : 'Add'} topics...
                  </Text>
                </TouchableOpacity>
                {topics.length > 0 && (
                  <View className="flex-row flex-wrap items-center gap-2 mt-2">
                    {topics.map((topic, index) => (
                      <View key={index}>
                        <Topic topic={topic} />
                      </View>
                    ))}
                  </View>
                )}
              </Dialog.Content>
              <Dialog.Actions className="border-t-[1px] border-slate-200">
                <Button onPress={hidePublishForm} textColor="#334155">
                  Not yet
                </Button>
                <Button onPress={handlePublish} textColor="#10b981">
                  Publish
                </Button>
              </Dialog.Actions>
            </>
          ) : (
            <>
              <View className="h-14 flex-row items-center justify-between px-4">
                <Text className="text-2xl font-bold text-slate-700">
                  Add up to five topics
                </Text>
                <TouchableOpacity onPress={handleAddTopic}>
                  <Text className="text-emerald-700 text-lg">Done</Text>
                </TouchableOpacity>
              </View>
              <Dialog.Content className="min-h-[140px] items-start -mx-2">
                <TopicInput ref={inputTopicRef} defaultTopics={topics} />
              </Dialog.Content>
            </>
          )}
        </Dialog>
      </Portal>
    </>
  );
};