import {StyleSheet, Text, View} from 'react-native';
import {
  followTopic,
  getOwnTopics,
  getUserProfile,
  getUsersNotFollow,
} from '../../api/userApi';
import {setUser, updateUser} from '../../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import {Chip} from 'react-native-paper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import PeopleItem from './PeopleItem';
import {PostLoading} from '../post';
import {ScrollView} from 'react-native-gesture-handler';
import {Spinner} from '../../components';
import {TouchableOpacity} from 'react-native';
import {getTopics} from '../../api/topicApi';
import {setTopic} from '../../redux/slices/topicSlice';
import {useNavigation} from '@react-navigation/native';

function Topic() {
  const navigation = useNavigation();
  const {isLogin} = useSelector(state => state.user.data);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.data.info);
  const [topics, setTopics] = useState([]);
  const filters = [
    {
      item: 'Topics',
    },
    {
      item: 'People',
    },
  ];
  const followingTopic = currentUser?.topics ? currentUser.topics : [];
  const [people, setPeople] = useState([]);
  const [status, setStatus] = useState('topic');
  const [isLoading, setIsLoading] = useState(true);
  const [filterItem, setFilterItem] = useState('Topics');
  useQuery(['topic', isLogin], getOwnTopics, {
    enabled: isLogin,
    onSuccess: data => {
      dispatch(setTopic(data));
    },
  });
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const topicLists = await getTopics();
      setTopics(topicLists);
      const user = await getUserProfile(currentUser.email);
      setUser(user);
      const peopleNotFollow = await getUsersNotFollow(20);
      setPeople(peopleNotFollow);
      setIsLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClickTopic = () => {
    setStatus('topic');
    setFilterItem('Topics');
  };
  const handleClickPeople = () => {
    setStatus('people');
    setFilterItem('People');
  };
  const topicListRender = () => {
    return topics.map((topic, index) => {
      return (
        !followingTopic.includes(topic.id) && (
          <TopicItem key={index} topic={topic} />
        )
      );
    });
  };
  const peopleRender = () => {
    return people.map((user, index) => {
      return <PeopleItem key={index} user={user} />;
    });
  };
  const loadingRender = () => {
    const elements = [];
    const times = 5;
    for (let i = 0; i < times; i++) {
      elements.push(<PostLoading />);
    }
    return elements;
  };

  const filterRender = () => {
    return filters.map((filter, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            filter.item === 'Topics' ? handleClickTopic() : handleClickPeople()
          }>
          <View style={[filterItem === filter.item && Styles.borderBottom]}>
            <Text
              style={[
                Styles.textHeader,
                filterItem === filter.item && Styles.textHighline,
              ]}>
              {filter.item}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={Styles.container}>
      <View className="h-14 px-6 flex flex-row items-center">
        <IconAntDesign
          name="arrowleft"
          size={20}
          color="#000"
          onPress={() => {
            navigation.navigate('Home');
          }}
        />
        <Text className="font-bold ml-6 text-lg text-gray-800">
          Customize your interests
        </Text>
      </View>

      <View style={Styles.header}>{filterRender()}</View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#ebeaea',
        }}
      />
      <TouchableOpacity
        onPress={() => {
          status === 'topic'
            ? navigation.navigate('Topic you follow')
            : navigation.navigate('People you follow');
        }}>
        <View style={Styles.seeAllBackground}>
          <Text style={Styles.seeAllText}>
            See all {status === 'topic' ? 'topics' : 'people'} you follow
          </Text>
        </View>
      </TouchableOpacity>
      {isLoading ? (
        <Spinner />
      ) : (
        <ScrollView>
          {status === 'topic' ? topicListRender() : peopleRender()}
        </ScrollView>
      )}
    </View>
  );
}

function TopicItem({topic, curUser}) {
  const currentUser = useSelector(state => state.user.data.info);
  const dispatch = useDispatch();
  const curTopic = [];
  const [lstTopic, setLstTopic] = useState(curTopic);
  const [isTopic, setIsTopic] = useState(
    currentUser.topics ? currentUser.topics.includes(topic.id) : false,
  );
  const queryClient = useQueryClient();
  const addTopicsMutation = useMutation(followTopic, {
    onSuccess: data => {
      dispatch(updateUser(data));
      queryClient.invalidateQueries('user-topic');
    },
  });

  const handleFollowTopic = async topicItem => {
    setIsTopic(!isTopic);
    setLstTopic([...lstTopic, topicItem.id]);
    await addTopicsMutation.mutate(topicItem.id);
  };

  return (
    <View>
      <View style={Styles.topics}>
        <Text style={Styles.textTopic}>{topic.name}</Text>
        <Chip
          style={isTopic ? Styles.chipFollowing : ''}
          textStyle={{
            color: isTopic ? 'black' : 'white',
          }}
          mode={'outlined'}
          onPress={() => handleFollowTopic(topic)}
          className={`rounded-full  h-8 ${
            isTopic ? ' bg-white text-black' : 'bg-green-600 !text-white'
          }`}>
          {isTopic ? 'Following' : 'Follow'}
        </Chip>
      </View>
      <View
        style={{
          width: '100%',
          height: 2.5,
          backgroundColor: '#F8F8F8',
          marginTop: 19,
        }}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  textHighline: {
    color: '#201A1B',
    paddingBottom: 10,
  },
  chipFollowing: {
    borderColor: '#1A8917',
    backgroundColor: '#fff',
    color: '#1A8917',
  },
  seeAllBackground: {
    // flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#f3f6f4',
  },
  textHeader: {
    marginHorizontal: 18,
    fontSize: 14,
    color: '#8A8383',
  },
  borderBottom: {
    borderBottomWidth: 1,
    marginTop: 5,
    borderBottomColor: '#000',
  },
  textAddTopic: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  topics: {
    flexDirection: 'row',
    paddingLeft: 25,
    paddingTop: 40,
    justifyContent: 'space-between',
    paddingRight: 25,
  },
  seeAllText: {
    marginTop: 30,
    color: '#000',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 30,
    paddingBottom: 30,
  },
  textTopic: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },

  bottom: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingTop: '130%',
  },
  imageBottom: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 60,
  },
  iconBootom: {
    paddingLeft: 60,
    marginTop: 5,
  },
  chip: {
    width: 120,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
export default Topic;
