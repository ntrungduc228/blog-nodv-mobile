import {Button, Chip} from 'react-native-paper';
import {Text, View} from 'react-native';
import React, {useCallback} from 'react';
import useSocialAuth from '../../hooks/useSocialAuth';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SocialLogin = () => {
  const {handleLoginByGoogle, handleLoginByFacebook} = useSocialAuth();

  const iconGoogle = useCallback(
    () => <IconFontAwesome5 name="google" size={15} color="#db4a39" solid />,
    [],
  );

  const iconFacebook = useCallback(
    () => <IconFontAwesome5 name="facebook" size={15} color="#4267B2" solid />,
    [],
  );

  return (
    <View className="pt-[30] px-[40]">
      <View>
        <Button
          icon={iconGoogle}
          mode="outlined"
          className="rounded-full"
          onPress={handleLoginByGoogle}>
          <Text className="text-black ml-18"> Login with Google</Text>
        </Button>
      </View>
      <View className="mt-[40]">
        <Button
          icon={iconFacebook}
          mode="outlined"
          className="justify-center rounded-full"
          onPress={handleLoginByFacebook}>
          <Text className="mx-auto text-black"> Login with Facebook</Text>
        </Button>
      </View>
    </View>
  );
};

export default SocialLogin;
