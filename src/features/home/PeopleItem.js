import {StyleSheet, Text, View} from 'react-native';

import {Avatar} from 'react-native-paper';
import {FollowUserButton} from '../user';

function PeopleItem({user}) {
  return (
    <View style={Styles.topics}>
      {user?.avatar ? (
        <Avatar.Image
          size={40}
          source={{
            uri: user?.avatar,
          }}
        />
      ) : (
        <Avatar.Icon size={40} icon="account" />
      )}
      <View style={Styles.infoUser} className="ml-4">
        <Text style={Styles.textTopic}>{user.username}</Text>
        <Text>{user.bio}</Text>
      </View>
      <FollowUserButton followerId={user?.id} primary />
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
