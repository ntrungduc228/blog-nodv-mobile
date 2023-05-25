import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import PeopleItem from './PeopleItem';
import {PostLoading} from '../post';
import {ScrollView} from 'react-native-gesture-handler';
import {getAllUsersFollowing} from '../../api/userApi';
import {useSelector} from 'react-redux';

function People({navigation}) {
  const currentUser = useSelector(state => state.user.data.info);
  const [peopleFollowing, setPeopleFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    const peopleIsFollowing = await getAllUsersFollowing(currentUser.id);
    setPeopleFollowing(peopleIsFollowing.content);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const peopleRender = () => {
    return peopleFollowing.map((people, index) => {
      return <PeopleItem key={index} user={people} status={true} />;
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
          Following
        </IconAntDesign>
      </View>
      <ScrollView>
        {peopleFollowing.length > 0
          ? peopleRender()
          : !isLoading && (
              <View>
                <Text className="text-center text-lg">
                  You are not following any people
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
    // paddingTop: 75,
    paddingVertical: 59,
    paddingHorizontal: 40,
    // height: 100,
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
  iconBottom: {
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
