import {StyleSheet, Text, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {getOwnTopics} from '../../api/userApi';
import TopicItem from './TopicItem';
import {PostLoading} from '../post';

function TopicYouFollow({navigation}) {
  const [isFollowTopic, setIsFollowTopic] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const followingTopic = await getOwnTopics();
      setIsFollowTopic(followingTopic);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const topicListRender = () => {
    return isFollowTopic.map((topic, index) => {
      return <TopicItem key={index} topic={topic} />;
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
          Topic you follow
        </IconAntDesign>
      </View>
      <ScrollView>
        {isFollowTopic.length > 0
          ? topicListRender()
          : !isLoading && (
              <View>
                <Text className="text-center text-lg">
                  You are not following any topics
                </Text>
              </View>
            )}
      </ScrollView>
      {isLoading ? <>{loadingRender()}</> : <></>}
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
  chipFollowing: {
    borderColor: '#1A8917',
    backgroundColor: '#fff',
    color: '#1A8917',
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
export default TopicYouFollow;
