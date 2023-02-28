import React from 'react';
import {View, Text} from 'react-native';
import {Button, Chip} from 'react-native-paper';
import useSocialAuth from '../../hooks/useSocialAuth';
import {styled} from 'nativewind';

const CustomButton = styled(Chip);

const SocialLogin = () => {
  const {handleLoginByGoogle, handleLoginByFacebook} = useSocialAuth();

  return (
    <View>
      <View className="mt-[30] px-[40]">
        <Chip
          className="outline-2 outline-rose-700 outline-dashed bg-black"
          mode="outlined"
          onPress={() => handleLoginByGoogle()}
          title="Login by Google"
        />
      </View>
      <View className="mt-[30] px-[40]">
        <Button
          title="Login by Facebook"
          className="outline-dashed"
          onPress={handleLoginByFacebook}
        />
        {/* <Button mode="outlined" onPress={() => handleLoginByGoogle()}>
          <Text className="text-gray-800 text-base font-normal">
            Login by Facebook
          </Text>
        </Button> */}
      </View>
    </View>
  );
};

export default SocialLogin;
