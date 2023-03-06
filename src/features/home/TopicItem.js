import {StyleSheet, Text, View} from 'react-native';

import {Chip} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useState} from 'react';

function TopicItem({topic}) {
  const currentUser = useSelector(state => state.user.data.info);
  const [isTopic, setIsTopic] = useState(
    currentUser.topics ? currentUser.topics.includes(topic.id) : false,
  );
  const handleFollowTopic = async topic => {
    setIsTopic(!isTopic);
    // await followTopic(topic.id)
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
export default TopicItem;
