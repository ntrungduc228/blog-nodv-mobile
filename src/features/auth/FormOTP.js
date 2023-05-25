import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {verifyAccount} from '../../api/authApi';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import useToast from '../../hooks/useToast';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../../redux/slices/userSlice';
// import {routesScreen} from '../../navigations';

export const FormOTP = () => {
  // const navigation = useNavigation();
  const {showToast} = useToast();
  const dispatch = useDispatch();

  const SubmittedForm = Yup.object().shape({
    otp: Yup.string().required('Please fill the Otp'),
  });

  const verifyMutation = useMutation(verifyAccount, {
    onSuccess: data => {
      if (data?.accessToken) {
        dispatch(setAccessToken({accessToken: data.accessToken, provider: ''}));
        showToast('success', 'Welcome to home');
      }
    },
    onError: error => {
      showToast('error', error?.message);
    },
  });

  const submitForm = data => {
    console.log('ok', data);
    verifyMutation.mutate(data?.otp);
  };

  return (
    <View>
      <Formik
        initialValues={{
          otp: '',
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
                  name="otp"
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  value={values?.otp || ''}
                  type="text"
                  className="flex-1 ml-1 "
                  placeholder="Enter OTP"
                />
              </View>
              {errors?.otp && touched?.otp && (
                <Text className="mt-1 ml-2 italic text-red-500">
                  {errors?.otp}
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
                Verify
              </Button>
            </View>
          </>
        )}
      </Formik>

      <View className="mt-5 justify-center flex-row">
        <Text>Didn't received OTP? </Text>
        <TouchableOpacity
        //   onPress={() => navigation.navigate(routesScreen.Login)}>
        >
          <Text className="text-emerald-200">Resend now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
