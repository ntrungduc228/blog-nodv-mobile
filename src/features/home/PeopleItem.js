import {StyleSheet, Text, View, Image} from 'react-native';
import {useState} from 'react';
import {Chip} from 'react-native-paper';
import {followUser, unFollowUser} from '../../api/userApi';

function PeopleItem({people, status}) {
  const [statusFollow, setStatusFollow] = useState(status);
  const handleFollowUser = async people => {
    console.log(people);
    setStatusFollow(!statusFollow);
    if (statusFollow === true) {
      await unFollowUser(people.id);
    } else {
      await followUser(people.id);
    }
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
        style={statusFollow ? Styles.chipFollowing : ''}
        textStyle={{
          color: statusFollow ? '#1A8917' : '#fff',
        }}
        mode={'outlined'}
        onPress={() => handleFollowUser(people)}
        className={`rounded-full  h-8 ${
          statusFollow ? ' bg-slate-500' : 'bg-green-600'
        }`}>
        {statusFollow ? 'Following' : 'Follow'}
      </Chip>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chipFollowing: {
    borderColor: '#1A8917',
    backgroundColor: '#fff',
    color: '#1A8917',
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
    paddingTop: 30,
    justifyContent: 'space-between',
    paddingRight: 25,
    borderBottomColor: '#ebeaea',
    borderBottomWidth: 1,
    paddingBottom: 25,
  },
  textTopic: {
    width: '90%',
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
