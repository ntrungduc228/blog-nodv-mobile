import {searchTopics} from '../../../api/topicApi';
import {useQuery} from 'react-query';
import {useState} from 'react';

export const useSearchTopics = () => {
  const [query, setQuery] = useState('');
  const {data, isLoading, isFetching} = useQuery(
    ['searchTopics', query],
    () => searchTopics(query),
    {
      enabled: query.length > 0,
    },
  );
  return {data, isLoading, isFetching, setQuery, query};
};
