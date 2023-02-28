import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import useSocialAuth from '../../hooks/useSocialAuth';

const SocialLogin = () => {
  const {handleLoginByGoogle} = useSocialAuth();

  return (
    <View>
      <View className="mt-[30] px-[40]">
        <Button mode="contained" onPress={() => handleLoginByGoogle()}>
          <Text>Login by Google</Text>
        </Button>
      </View>
    </View>
  );
};

export default SocialLogin;
