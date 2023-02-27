import { Text, View, Button, ScrollView } from 'react-native';
import { logout } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../api/axiosClient';
import {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import Home from '../features/home/Home';

function HomeScreen({ navigation }) {
  const isLogin = useSelector(state => state.user.data.isLogin);
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([])

  const dispatch = useDispatch();

  const logoutUser = () => {
    if (isLogin) {
      dispatch(logout());
    }
  };
 
  

  return (
      <Home />
  );
}

export default HomeScreen;
