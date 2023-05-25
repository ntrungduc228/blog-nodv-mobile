import * as Yup from 'yup';

import {ActivityIndicator, Button} from 'react-native-paper';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

import {Formik} from 'formik';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';
import {login} from '../../api/authApi';
import {routesScreen} from '../../navigations';
import {setAccessToken} from '../../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import useSocialAuth from '../../hooks/useSocialAuth';
import useToast from '../../hooks/useToast';

export const FormLogin = () => {
  const navigation = useNavigation();
  const {showToast} = useToast();
  const {handleLoginByGoogle} = useSocialAuth();
  const dispatch = useDispatch();

  const SubmittedForm = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please fill the Email'),
    password: Yup.string().required('Please fill the Password'),
  });

  const loginMutation = useMutation(login, {
    onSuccess: data => {
      console.log('data ', data);

      if (data?.accessToken) {
        dispatch(setAccessToken({accessToken: data.accessToken, provider: ''}));
        showToast('success', 'Welcome to home');
      }
      // navigation.navigate(routesScreen.Verify);
    },
    onError: error => {
      showToast('error', error?.message);
      if (error?.message === 'Please verify your account') {
        navigation.navigate(routesScreen.Verify, {key: 'otp'});
      }
    },
  });

  const submitForm = data => {
    console.log('data ', data);
    loginMutation.mutate(data);
  };

  return (
    <View className="w-full">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SubmittedForm}
        onSubmit={submitForm}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <View className="gap-5">
              <View>
                <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                  <IconFontAwesome5
                    className=""
                    name="envelope"
                    size={22}
                    solid
                  />
                  <TextInput
                    name="email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values?.email || ''}
                    className="flex-1 ml-1 "
                    placeholder="Email"
                  />
                </View>
                {errors.email && touched.email && (
                  <Text className="mt-1 ml-2 italic text-red-500">
                    {errors.email}
                  </Text>
                )}
              </View>
              <View>
                <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                  <IconFontAwesome5 className="" name="lock" size={22} solid />
                  <TextInput
                    name="password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values?.password || ''}
                    className="flex-1 ml-1 "
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {errors.password && touched.password && (
                <Text className="mt-1 ml-2 italic text-red-500">
                  {errors.password}
                </Text>
              )}
            </View>
            <View className="mt-2 pl-2">
              <TouchableOpacity
                onPress={() => navigation.navigate(routesScreen.PasswordReset)}>
                <Text className="italic text-sm text-emerald-200">
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View className="mt-7">
              <Button
                loading={loginMutation?.isLoading}
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => (
                  <>
                    {loginMutation?.isLoading ? (
                      <ActivityIndicator animating={true} color={'#fff'} />
                    ) : (
                      ''
                    )}
                  </>
                )}
                mode="contained"
                className={`h-[50px] justify-center !rounded-full`}
                onPress={handleSubmit}
                disabled={loginMutation?.isLoading}>
                Login
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <View className="mt-3 justify-center flex-row">
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routesScreen.SignUp)}>
          <Text className="font-bold text-black">Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center mt-5">Or</Text>
      <View className="mt-5">
        <Button
          // eslint-disable-next-line react/no-unstable-nested-components
          icon={() => (
            <IconFontAwesome5 name="google" size={15} color="#db4a39" solid />
          )}
          mode="outlined"
          className="h-[50px] justify-center rounded-full"
          onPress={handleLoginByGoogle}>
          <Text className="text-black ml-18"> Login with Google</Text>
        </Button>
      </View>
    </View>
  );
};
