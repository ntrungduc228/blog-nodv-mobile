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
  followUser,
  getUserProfile,
  unFollowUser,
} from '../../api/userApi';
import {useSelector} from 'react-redux';

function PeopleItem({people, status}) {
  const currentUser = useSelector(state => state.user.data.info);
  const [lstTopic, setLstTopic] = useState(currentUser.topics || []);
  const [isTopic, setIsTopic] = useState(false);
  const [statusFollow, setStatusFollow] = useState(status);
  const handleFollowUser = async people => {
    console.log(people);
    setStatusFollow(!statusFollow);
    if (statusFollow === true) {
      await unFollowUser(people.id);
    } else {
      await followUser(people.id);
    }
    console.log(lstTopic);
    // await followTopic(topic.id);
    // console.log(topic);
  };

  return (
    <View style={Styles.topics}>
      <Image
        source={{
          uri: people.avatar
            ? people.avatar
            : 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png',
          method: 'POST',
          headers: {
            Pragma: 'no-cache',
          },
          body: 'Your Body goes here',
        }}
        style={Styles.imageProfile}
      />
      <View style={Styles.infoUser}>
        <Text style={Styles.textTopic}>{people.username}</Text>
        <Text>{people.bio}</Text>
      </View>
      <Chip
        textStyle={{
          color: '#fff',
        }}
        onPress={() => handleFollowUser(people)}
        className={`rounded-full  h-8 ${
          statusFollow ? ' bg-slate-500' : 'bg-emerald-600'
        }`}>
        {statusFollow ? 'Following' : 'Follow'}
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
  imageProfile: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 15,
  },
  infoUser: {
    flex: 1,
    flexDirection: 'column',
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
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 25,
  },
  textTopic: {
    width: '70%',
    fontSize: 16,
    fontWeight: '700',
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
export default PeopleItem;
