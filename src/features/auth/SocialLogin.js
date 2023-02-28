import {Button, Chip} from 'react-native-paper';
import {Text, View} from 'react-native';

import React from 'react';
import {styled} from 'nativewind';
import useSocialAuth from '../../hooks/useSocialAuth';

const CustomButton = styled(Chip);

const SocialLogin = () => {
  const {handleLoginByGoogle, handleLoginByFacebook} = useSocialAuth();

  return (
    <View>
      <View className="mt-[30] px-[40]">
        <Chip
          mode="outlined"
          className="justify-center rounded-full"
          onPress={() => handleLoginByGoogle()}>
          <Text className="mx-auto"> Login by Google</Text>
        </Chip>
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
