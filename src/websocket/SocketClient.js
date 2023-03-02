import {useDispatch, useSelector} from 'react-redux';

import Config from 'react-native-config';
import SockJS from 'sockjs-client';
import {setSocket} from '../redux/slices/socketSlice';
import {useEffect} from 'react';

var Stomp = require('stompjs/lib/stomp.js').Stomp;

const SOCKET_URL = Config.REACT_APP_API_URL + '/ws';

export const SocketClient = () => {
  const id = useSelector(state => state.user.data?.info?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const sock = new SockJS(SOCKET_URL);
    const stomp = Stomp.over(sock);
    if (id) {
      stomp.debug = false;
      stomp.connect({}, () => onSuccessConnect(stomp), onError);
    }

    return () => {
      if (id) {
        stomp.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onError = err => {
    console.log(err);
  };

  const onSuccessConnect = stomp => {
    dispatch(setSocket(stomp));
  };

  return <></>;
};
