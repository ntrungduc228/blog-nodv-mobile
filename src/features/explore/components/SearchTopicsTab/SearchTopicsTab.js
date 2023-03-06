import {Text, View} from 'react-native';

import React from 'react';
import {Topic} from '../../../topic';
import {searchTopics} from '../../../../api/topicApi';
import {useQuery} from 'react-query';
import {useSearchScreen} from '../../../../screens';

export const SearchTopicsTab = () => {
  const {searchValue} = useSearchScreen();
  const {data: topics, isSuccess} = useQuery(
    ['topics', searchValue],
    () => searchTopics(searchValue),
    {
      enabled: searchValue.length > 0,
      staleTime: 1000 * 60 * 60,
    },
  );
  return (
    <View className="bg-white h-full p-6 pr-2">
      {isSuccess && topics?.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No topic found</Text>
        </View>
      )}
      <View className="flex-row flex-wrap gap-1">
        {topics?.map(topic => (
          <View key={topic.id}>
            <Topic topic={topic} />
          </View>
        ))}
      </View>
    </View>
  );
};
