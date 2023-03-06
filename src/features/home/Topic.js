import {StyleSheet, Text, View} from 'react-native';
import {
  followTopic,
  getUserProfile,
  getUsersNotFollow,
} from '../../api/userApi';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';

import {Chip} from 'react-native-paper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import PeopleItem from './PeopleItem';
import {ScrollView} from 'react-native-gesture-handler';
import {Spinner} from '../../components/Spinner';
import {TouchableOpacity} from 'react-native';
import {axiosClientPrivate} from '../../api/axiosClient';
import {updateUser} from '../../redux/slices/userSlice';
import {useMutation} from 'react-query';

// import TopicItem from './TopicItem';

function Topic({navigation}) {
  const currentUser = useSelector(state => state.user.data.info);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState();
  const [isTopic, setIsTopic] = useState(false);
  const filters = [
    {
      item: 'Topics',
    },
    {
      item: 'People',
    },
  ];
  // const [selectTopic, setSelectTopic] = useState(currentUser.topics || []);
  const [isFollowTopic, setIsFollowTopic] = useState(
    currentUser?.topics ? currentUser.topics : [],
  );
  const [people, setPeople] = useState([]);
  const [status, setStatus] = useState('topic');
  const [isLoading, setIsLoading] = useState(true);
  const [filterItem, setFilterItem] = useState('Topics');
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const topicLists = await axiosClientPrivate.get(`/topics`);
      setTopics(topicLists);
      const user = await getUserProfile(currentUser.email);
      setUser(user);
      const people = await getUsersNotFollow(20);
      // const people = await axiosClientPrivate.get(
      //   `/users/getUsersNotFollowed/20`,
      // );
      setPeople(people);
      setIsLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setStatusFilter = topicActive => {
    // setActive(topicActive);
  };
  const handleClickTopic = () => {
    setStatus('topic');
    setFilterItem('Topics');
  };
  const handleClickPeole = () => {
    setStatus('people');
    setFilterItem('People');
  };
  const topicListRender = () => {
    return topics.map((topic, index) => {
      return (
        !isFollowTopic.includes(topic.id) && (
          <TopicItem key={index} topic={topic} />
        )
      );
    });
  };
  const peopleRender = () => {
    return people.map((people, index) => {
      return <PeopleItem key={index} people={people} status={false} />;
    });
  };

  const filterRender = () => {
    return filters.map((filter, index) => {
      return (
        <TouchableOpacity
          onPress={() =>
            filter.item === 'Topics' ? handleClickTopic() : handleClickPeole()
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
      <View style={Styles.containerSite}>
        <IconAntDesign
          name="arrowleft"
          size={20}
          color="#000"
          onPress={() => {
            navigation.navigate('Home');
          }}>
          {' '}
          Customize your interests
        </IconAntDesign>
      </View>

      <View style={Styles.header}>
        {/* <TouchableOpacity onPress={() => handleClickTopic()}>
          <Text style={[Styles.textHeader, Styles.textHighline]}>Topics</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleClickPeole()}>
          <Text style={Styles.textHeader}>People</Text>
        </TouchableOpacity> */}
        {filterRender()}
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: '#8A8383',
        }}
      />
      {/* <View
        style={{
          width: '12%',
          height: 1,
          backgroundColor: '#000',
          marginLeft: 25,
        }}
      /> */}
      <TouchableOpacity
        onPress={() => {
          status === 'topic'
            ? navigation.navigate('Topic you follow')
            : navigation.navigate('People');
        }}>
        <View style={Styles.seeAllBackground}>
          <Text style={Styles.seeAllText}>
            See all {status === 'topic' ? 'topics' : 'people'} you follow
          </Text>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {status === 'topic' ? topicListRender() : peopleRender()}
      </ScrollView>
      {isLoading ? <Spinner /> : <></>}
    </View>
  );
}

function TopicItem({topic, curUser}) {
  // console.log('1' + curUser);
  const currentUser = useSelector(state => state.user.data.info);
  const dispatch = useDispatch();
  const curTopic = [];
  // const curTopic = curUser.topics ? curUser.topics : [];
  const [lstTopic, setLstTopic] = useState(curTopic);
  // console.log('before: ' + lstTopic);
  const [isTopic, setIsTopic] = useState(
    currentUser.topics ? currentUser.topics.includes(topic.id) : false,
  );

  const addTopicsMutation = useMutation(followTopic, {
    onSuccess: data => {
      dispatch(updateUser(data));
      // navigate(appRoutes.HOME);
    },
  });

  const handleFollowTopic = async topic => {
    setIsTopic(!isTopic);
    setLstTopic([...lstTopic, topic.id]);
    // console.log(lstTopic);
    // console.log('after: ' + lstTopic);
    // await followTopic(topic.id);
    // await addTopics(lstTopic);
    // dispatch(updateUser());
    addTopicsMutation.mutate(topic.id);
  };

  return (
    <View style={Styles.topics}>
      <Text style={Styles.textTopic}>{topic.name}</Text>
      <Chip
        textStyle={{
          color: '#fff',
        }}
        onPress={() => handleFollowTopic(topic)}
        className={`rounded-full  h-8 ${
          isTopic ? ' bg-slate-500' : 'bg-emerald-600'
        }`}>
        {isTopic ? 'Following' : 'Follow'}
      </Chip>
      {/* <Chip mode="outlined" onPress={()=> handleFollowTopic(topic)}/> */}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerSite: {
    paddingTop: 75,
    paddingVertical: 59,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  textHighline: {
    color: '#201A1B',
    paddingBottom: 10,
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
    fontWeight: '500',
    fontSize: 17,
    marginLeft: 30,
    paddingBottom: 30,
  },
  textTopic: {
    fontSize: 16,
    fontWeight: '500',
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
