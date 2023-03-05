import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather'
import IconFontAwesomer from 'react-native-vector-icons/FontAwesome'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import { useEffect, useMemo, useState } from 'react';
import { axiosClientPrivate } from '../../api/axiosClient';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import { addTopics, followTopic, getUserProfile } from '../../api/userApi';
import { useSelector } from 'react-redux';
import TopicItem from './TopicItem';



 function Topic({navigation}) {
  const [topics, setTopics] = useState([])
  const [isTopic, setIsTopic] = useState(false)
  const currentUserEmail = useSelector(state => state.user.data.info.email);
  const accessToken = useSelector(state => state.user.data.accessToken)
  // console.log(accessToken)
  async function fetchData(){
    const currentUser = await getUserProfile(currentUserEmail)
    // console.log(currentUser)
    const topicLists =  await axiosClientPrivate.get(`/topics`)
     setTopics(topicLists)
     addTopics()
  }
  fetchData();
  
  const topicListRender = ()=>{
    return topics.map((topic, index)=>{
        return(
          <TopicItem key={index} topic={topic} />

        )
    })
}

  return (
    <View style={Styles.container}>
      <View style={Styles.containerSite}>
      <IconAntDesign name="arrowleft" size={20} color="#000" onPress={()=>{navigation.navigate("Home")}}>      Customize your interests</IconAntDesign>
      </View>

      <View style={Styles.header}>
                
                    <Text style={[Styles.textHeader, Styles.textHighline]}>Topics</Text>
                    <Text style={Styles.textHeader}>People</Text>
                    <Text style={Styles.textHeader}>Publications</Text>
                
                </View>
                <View
                    style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: "#8A8383",
                    }}
                />
                <View
                    style={{
                        width: '12%',
                        height: 1,
                        backgroundColor: '#000',
                        marginLeft: 25,
                    }}
                />
      <ScrollView>

        {topicListRender()}
      </ScrollView>



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
    color: "#201A1B",
},
textHeader: {
    paddingLeft: 18,
    fontSize: 14,
    color: "#8A8383",
},
textAddTopic:{
    fontSize: 18,
    fontWeight: '500',
    color: '#000'
},
topics:{
  flexDirection: 'row',
  paddingLeft: 25,
  paddingTop: 40,
  justifyContent: 'space-between',
  paddingRight: 25,
},
textTopic:{
  fontSize: 16,
  fontWeight: '500'
},

  bottom:{
    flexDirection: 'row',
    paddingLeft: 30,   
    paddingTop: '130%'
  },
  imageBottom:{
    width: 50,
    height: 50,
    borderRadius: 100,
    marginLeft: 60,
  },
  iconBootom:{
    paddingLeft: 60,
    marginTop: 5
  },
  chip: {
    width: 120,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },

});
export default Topic;