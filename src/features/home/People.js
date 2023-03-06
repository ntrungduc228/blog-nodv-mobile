import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesomer from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useEffect, useMemo, useState} from 'react';
import {axiosClientPrivate} from '../../api/axiosClient';
import {ScrollView} from 'react-native-gesture-handler';
import {Chip} from 'react-native-paper';
import {
  addTopics,
  followTopic,
  getAllUsersFollowing,
  getOwnTopics,
  getUserProfile,
} from '../../api/userApi';
import {useSelector} from 'react-redux';
import TopicItem from './TopicItem';
import PeopleItem from './PeopleItem';
import {Spinner} from '../../component/Spinner';

function People({navigation}) {
  const currentUser = useSelector(state => state.user.data.info);
  const [isFollowTopic, setIsFollowTopic] = useState([]);
  const [peopleFollowing, setPeopleFollowing] = useState([]);
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const followTopic = await getOwnTopics();
      setIsFollowTopic(followTopic);
      //   console.log(isFollowTopic);
      const peopleFollowing = await getAllUsersFollowing(currentUser.id);
      setPeopleFollowing(peopleFollowing);
      // console.log(peopleFollowing);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  const handleClickPeople = async () => {
    const peopleFollowing = await getAllUsersFollowing();
    setPeopleFollowing(peopleFollowing);
  };
  const peopleRender = () => {
    return peopleFollowing.map((topic, index) => {
      return <PeopleItem key={index} people={topic} status={true} />;
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
            navigation.navigate('Customize your interests');
          }}>
          {' '}
          Following
        </IconAntDesign>
      </View>
      <ScrollView>
        {peopleFollowing.length > 0 ? (
          peopleRender()
        ) : (
          <View>
            <Text>You are not following any people</Text>
          </View>
        )}
      </ScrollView>
      {isLoading ? <Spinner /> : <></>}
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
  },
  textHeader: {
    paddingLeft: 18,
    fontSize: 14,
    color: '#8A8383',
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
export default People;
