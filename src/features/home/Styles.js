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
  wrapTopic: {
    // marginLeft: 18,
    marginRight: 18,
  },
  textHeader: {
    // paddingLeft: 18,
    fontSize: 14,
    color: '#8A8383',
  },
  paddingBottom: {
    paddingBottom: 15,
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
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  bodyTop: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingLeft: 16,
  },
  userName: {
    width: '70%',
    paddingLeft: 8,
    paddingTop: 2,
    color: '#000',
  },
  titlePost: {
    flexDirection: 'row',
  },
  imagePost: {
    width: 100,
    height: 60,
  },
  contentPost: {
    width: '65%',
    height: 65,
    fontSize: 17,
    paddingLeft: 16,
    lineHeight: 25,
    paddingTop: 12,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'inherit',
  },
  timePost: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 6,
  },
  timeUpdatePost: {
    color: '#A09898',
    fontSize: 14,
    fontFamily: 'inherit',
    paddingLeft: 12,
  },
  timeRead: {
    color: '#A09898',
    fontSize: 14,
    fontFamily: 'inherit',
    paddingLeft: 8,
  },
  Icon: {
    flexDirection: 'row',
    paddingLeft: 215,
    paddingTop: 4,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    paddingLeft: 28,
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
