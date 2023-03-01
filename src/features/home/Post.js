import { Text, View, StyleSheet, Image, Alert,  } from 'react-native';
import { useMemo, useState, useMutation } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './Styles';
import { Avatar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NotificationType } from '../../config/dataType.js';
import IconFeather from 'react-native-vector-icons/Feather'
import IconFontAwesomer from 'react-native-vector-icons/FontAwesome'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import axiosClient from '../../api/axiosClient.js';
import { axiosClientPrivate } from '../../api/axiosClient.js';
import { useQueryClient } from 'react-query';
// import {useMutation} from '@apollo/react-hooks';
// import { useMutation, useQueryClient } from 'react-query';
function Post({post}){
    const currentUser = useSelector(state => state.user.data);
    const [isBookmark, setIsBookmark] = useState(false)
 
    
    const handleBookmark = async (id)=>{
       
        await axiosClientPrivate.patch(`/bookmarks/${id}`);
        // console.log('test'+id)
        setIsBookmark(!isBookmark);
        // console.log(isBookmark)
        // const colorBookmark = isBookmark? color="#A09898": color="#000" 
    }
  
    const handleHidePost = async (id)=>{
        // console.log(id)
        await axiosClientPrivate.patch(`/blackLists/${id}`)   
        
    }

    // const handleHidePost = useMutation(hidePost, {
    //     onSuccess: (data)
    // })
 
    return (
        <View style={Styles.body}>
                        <View style={Styles.bodyTop}>
                            <Image
                                source={{
                                    uri: post.user.avatar,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                    },
                                    body: 'Your Body goes here',
                                }}
                                style={Styles.imageProfile}
                            />
                            <Text style={Styles.userName}>{post.user.username}</Text>
                        </View>
                        <View style={Styles.post}>
                            <View style={Styles.titlePost}>
                                <Text style={Styles.contentPost}>
                                    {post.title}
                                </Text>
                                <Image
                                    source={{
                                        uri: post.thumbnail ? post.thumbnail : 'https://genk.mediacdn.vn/thumb_w/640/2014/3-d397c379c6dcaa6fdf0e6ef1d8ce4f47-1413790602424.png',
                                        method: 'POST',
                                        headers: {
                                            Pragma: 'no-cache',
                                        },
                                        body: 'Your Body goes here',
                                    }}
                                    style={Styles.imagePost}
                                />
                            </View>
                            <View style={Styles.timePost}>
                                <Text style={Styles.timeUpdatePost}>{post.createdDate}</Text>
                                <Text style={{ color: "#A09898", fontSize: 20, marginTop: -10, fontWeight: '700', paddingLeft: 5 }}>.</Text>
                                <Text style={Styles.timeRead}>{post.timeRead} min read</Text>
                            </View>
                        </View>
                        <View style={Styles.Icon}>
                           
                            <IconFontAwesomer name="bookmark-o" size={24} color={isBookmark?"#000":"#A09898"} solid="#A09898" onPress={()=> handleBookmark(post.id)} />
                            <IconAntDesign name="minuscircleo" size={24} color="#A09898" solid="#A09898" style={Styles.titleIcon} onPress={()=> handleHidePost(post.id)}/>
                            <IconFeather name="more-vertical" size={24} color="#A09898" solid="#A09898" style={Styles.titleIcon} />
                        </View>
                        <View
                            style={{
                                width: '100%',
                                height: 1,
                                backgroundColor: '#F0DFDF',
                                marginTop: 19,
                            }} />
                    </View>
    )
}

export default Post;