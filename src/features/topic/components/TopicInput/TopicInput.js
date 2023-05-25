import {Chip, Searchbar} from 'react-native-paper';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {ToastAndroid, View} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {useSearchTopics} from '../../hooks';

export const TopicInput = forwardRef(({onChange, defaultTopics = []}, ref) => {
  const [topicsSelected, setTopicsSelected] = useState(defaultTopics);
  const {query, setQuery, data = []} = useSearchTopics();

  const handleAddTopic = topic => {
    if (topicsSelected.length >= 5) {
      ToastAndroid.show(
        'You can only select up to 5 topics',
        ToastAndroid.SHORT,
      );
      return;
    }
    setTopicsSelected([...topicsSelected, topic]);
  };
  const handleRemoveTopic = topic => {
    setTopicsSelected(topicsSelected.filter(t => t.id !== topic.id));
  };

  const topicsData = useMemo(() => {
    return data.filter(topic => {
      return !topicsSelected.find(t => t.id === topic.id);
    });
  }, [data, topicsSelected]);

  useEffect(() => {
    onChange && onChange(topicsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicsSelected]);

  useImperativeHandle(
    ref,
    () => {
      return {
        getTopics: () => topicsSelected,
      };
    },
    [topicsSelected],
  );

  return (
    <View className="w-full">
      <Searchbar
        className=" bg-slate-100"
        elevation={0}
        placeholder="Search"
        placeholderTextColor={'gray'}
        onChangeText={setQuery}
        value={query}
        style={{}}
      />
      <View className="flex flex-wrap flex-row mt-1 rounded py-1">
        {topicsSelected.map(topic => (
          <View key={topic.id} className="p-1">
            <Chip
              key={topic.id}
              mode="flat"
              className="rounded-full bg-emerald-700/10"
              selected
              onPress={() => handleRemoveTopic(topic)}>
              {topic.name}
            </Chip>
          </View>
        ))}
      </View>
      <ScrollView className=" max-h-40 mt-1">
        <View className="flex flex-wrap flex-row">
          {topicsData.map(topic => (
            <View key={topic.id} className="p-1">
              <Chip
                key={topic.id}
                topic={topic}
                className="rounded-full bg-slate-100"
                onPress={() => handleAddTopic(topic)}>
                {topic.name}
              </Chip>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
});
