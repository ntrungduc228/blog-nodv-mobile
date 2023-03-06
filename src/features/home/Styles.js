import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerSite: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 75,
    paddingVertical: 59,
    paddingHorizontal: 40,
  },
  textSite: {
    fontWeight: '700',
    fontSize: 25,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  //   headerIcon: {
  //     // marginRight: 18,
  //   },
  textHighline: {
    color: '#201A1B',
  },
  textHeader: {
    paddingLeft: 18,
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
  imageProfile: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  bodyTop: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 16,
  },
  userName: {
    width: '55%',
    paddingLeft: 8,
    paddingTop: 11,
    color: '#000',
  },
  titlePost: {
    flexDirection: 'row',
  },
  imagePost: {
    width: 120,
    height: 70,
  },
  contentPost: {
    width: '60%',
    height: 65,
    fontSize: 16,
    paddingLeft: 16,
    lineHeight: 25,
    paddingTop: 12,
    paddingLeft: 16,
    fontWeight: '500',
    color: '#000',
  },
  timePost: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 6,
  },
  timeUpdatePost: {
    color: '#A09898',
    fontSize: 12,
    fontFamily: 'Roboto',
    paddingLeft: 12,
  },
  timeRead: {
    color: '#A09898',
    fontSize: 12,
    fontFamily: 'Roboto',
    paddingLeft: 8,
  },
  Icon: {
    flexDirection: 'row',
    paddingLeft: 240,
    paddingTop: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    paddingLeft: 22,
    // paddingBottom: 20,
  },
  bottom: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingTop: 60,
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
  iconEdit: {
    flexDirection: 'row',
  },
  propDownDot: {
    width: 100,
    height: 70,
    backgroundColor: '#fff',
    marginTop: 50,
    marginRight: 100,
  },
  textIcon: {
    paddingRight: 70,
  },
  iconDot: {
    // position: 'absolute',
    // marginBottom: 50,
    // top: 0,
    marginLeft: 10,
  },
});
export default Styles;
