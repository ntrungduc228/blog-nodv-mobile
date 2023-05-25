import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {useMutation} from 'react-query';
import useToast from '../../hooks/useToast';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {forgotPassword} from '../../api/authApi';
import {useNavigation} from '@react-navigation/native';
import {routesScreen} from '../../navigations';

export const FormForgotPassword = () => {
  const navigation = useNavigation();
  const {showToast} = useToast();

  const SubmittedForm = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Please fill the Email'),
  });

  const verifyMutation = useMutation(forgotPassword, {
    onSuccess: data => {
      console.log('datareturn ', data);
      navigation.navigate(routesScreen.Verify, {key: 'forgotPassword'});
    },
    onError: error => {
      showToast('error', error?.message);
    },
  });

  const submitForm = data => {
    console.log('ok', data);
    verifyMutation.mutate(data?.email);
  };

  return (
    <View>
      <Text className="font-bold text-black text-xl text-center">
        Enter your email to receive the OTP
      </Text>
      <Formik
        initialValues={{
          email: '',
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
          <>
            <View className="my-5">
              <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                <TextInput
                  name="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values?.email || ''}
                  className="flex-1 ml-1 "
                  placeholder="Enter Email"
                />
              </View>
              {errors.email && touched.email && (
                <Text className="mt-1 ml-2 italic text-red-500">
                  {errors.email}
                </Text>
              )}
            </View>
            <View className="mt-2">
              <Button
                mode="contained"
                // eslint-disable-next-line react/no-unstable-nested-components
                icon={() => (
                  <>
                    {verifyMutation?.isLoading ? (
                      <ActivityIndicator animating={true} color={'#fff'} />
                    ) : (
                      ''
                    )}
                  </>
                )}
                className={`h-[50px] justify-center ${
                  verifyMutation?.isLoading ? 'opacity-50' : 'opacity-100'
                }`}
                onPress={handleSubmit}
                disabled={verifyMutation?.isLoading}>
                Enter
              </Button>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};
