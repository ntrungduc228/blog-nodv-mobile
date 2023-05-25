import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button, RadioButton, ActivityIndicator} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {routesScreen} from '../../navigations';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signUp} from '../../api/authApi';
import {useMutation} from 'react-query';
import useToast from '../../hooks/useToast';

export const FormSignUp = () => {
  const navigation = useNavigation();
  const {showToast} = useToast();

  const SubmittedForm = Yup.object().shape({
    username: Yup.string()
      .min(6, 'Must be at least 6 characters long')
      .required('Please fill the Username'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please fill the Email'),
    password: Yup.string().required('Please fill the Password'),
    confirmPassword: Yup.string()
      .required('Please fill the Confirm Password')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  });

  const signUpMutation = useMutation(signUp, {
    onSuccess: data => {
      showToast('success', 'Sign Up successfully');
      navigation.navigate(routesScreen.Verify, {key: 'otp'});
    },
    onError: error => {
      console.log('error ', error);
      showToast('error', error?.message);
    },
  });

  const submitForm = data => {
    console.log('datasumbmit ', data);
    signUpMutation.mutate(data);
  };

  return (
    <View className="w-full ">
      <Formik
        initialValues={{
          username: '',
          email: '',
          gender: true,
          password: '',
          confirmPassword: '',
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
                  <IconFontAwesome5 className="" name="user" size={22} solid />
                  <TextInput
                    name="username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values?.username || ''}
                    className="flex-1 ml-1 "
                    placeholder="Username"
                  />
                </View>
                {errors.username && touched.username && (
                  <Text className="mt-1 ml-2 italic text-red-500">
                    {errors.username}
                  </Text>
                )}
              </View>
              <View>
                <RadioButton.Group value={true}>
                  <View className="flex-row gap-3">
                    <View className="flex-row items-center">
                      <RadioButton value={true} />
                      <Text>Male</Text>
                    </View>
                    <View className="flex-row items-center">
                      <RadioButton value={false} />
                      <Text>Female</Text>
                    </View>
                  </View>
                </RadioButton.Group>
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
                {errors.password && touched.password && (
                  <Text className="mt-1 ml-2 italic text-red-500">
                    {errors.password}
                  </Text>
                )}
              </View>

              <View>
                <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                  <IconFontAwesome5 className="" name="lock" size={22} solid />
                  <TextInput
                    secureTextEntry={true}
                    name="confirmPassword"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values?.confirmPassword || ''}
                    className="flex-1 ml-1 "
                    placeholder="Confirm Password"
                  />
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text className="mt-1 ml-2 italic text-red-500">
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>
            </View>

            <View className="mt-7">
              <Button
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => (
                  <>
                    {signUpMutation?.isLoading ? (
                      <ActivityIndicator animating={true} color={'#fff'} />
                    ) : (
                      ''
                    )}
                  </>
                )}
                mode="contained"
                className={`h-[50px] justify-center ${
                  signUpMutation?.isLoading ? 'opacity-50' : 'opacity-100'
                }`}
                onPress={handleSubmit}
                disabled={signUpMutation?.isLoading}>
                Sign Up
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <View className="mt-5 justify-center flex-row">
        <Text>If you have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routesScreen.Login)}>
          <Text className="font-bold text-black">Login now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
