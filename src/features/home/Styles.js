import { StyleSheet } from "react-native";

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
        color: '#000'
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
    imageProfile: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    bodyTop: {
        flexDirection: 'row',
        paddingTop: 12,
        paddingLeft: 16,
    },
    userName: {
        paddingLeft: 8,
        paddingTop: 11,
    },
    titlePost: {
        flexDirection: 'row',

    },
    imagePost: {
        width: 130,
        height: 80,
    },
    contentPost: {
        width: '60%',
        height: 60,
        fontSize: 18,
        paddingLeft: 16,
        lineHeight: 25,
        paddingTop: 12,
        paddingLeft: 16,
        fontWeight: '500',
        color: '#000'
    },
    timePost: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingTop: 12,
    },
    timeUpdatePost: {
        color: "#A09898",
        fontSize: 15,
        fontFamily: "Roboto",
        paddingLeft: 15,
    },
    timeRead: {
        color: "#A09898",
        fontSize: 15,
        fontFamily: "Roboto",
        paddingLeft: 8,
    },
    Icon: {
        flexDirection: 'row',
        paddingLeft: 240,
        paddingTop: 29,

    },
    titleIcon: {
        paddingLeft: 22
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
        marginTop: 5
    }
})
export default Styles