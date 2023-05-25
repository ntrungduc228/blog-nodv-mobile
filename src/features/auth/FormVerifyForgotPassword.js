import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {verifyForgotPassword} from '../../api/authApi';
import {useMutation} from 'react-query';
import useToast from '../../hooks/useToast';
import {useDispatch} from 'react-redux';
import {setAccessToken} from '../../redux/slices/userSlice';

export const FormVerifyForgotPassword = () => {
  const {showToast} = useToast();
  const dispatch = useDispatch();

  const SubmittedForm = Yup.object().shape({
    // email: Yup.string()
    //   .email('Invalid email')
    //   .required('Please fill the Email'),
    otp: Yup.string().required('Please fill the Otp'),
    password: Yup.string().required('Please fill the Password'),
    confirmPassword: Yup.string()
      .required('Please fill the Confirm Password')
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
  });

  const verifyMutation = useMutation(verifyForgotPassword, {
    onSuccess: data => {
      console.log('data ', data);
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
    verifyMutation.mutate({otp: data?.otp, password: data?.password});
  };
  return (
    <View>
      <Formik
        initialValues={{
          otp: '',
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
          <>
            <View className="my-2">
              <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                <TextInput
                  name="otp"
                  onChangeText={handleChange('otp')}
                  onBlur={handleBlur('otp')}
                  value={values?.otp || ''}
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
            <View className="my-2">
              <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                <IconFontAwesome5 className="" name="lock" size={22} solid />

                <TextInput
                  name="password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values?.password || ''}
                  className="flex-1 ml-1 "
                  placeholder="New Password"
                  secureTextEntry={true}
                />
              </View>
              {errors.password && touched.password && (
                <Text className="mt-1 ml-2 italic text-red-500">
                  {errors.password}
                </Text>
              )}
            </View>
            <View className="my-2">
              <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
                <IconFontAwesome5 className="" name="lock" size={22} solid />

                <TextInput
                  secureTextEntry={true}
                  name="confirmPassword"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values?.confirmPassword || ''}
                  className="flex-1 ml-1 "
                  placeholder="Confirm New Password"
                />
              </View>

              {errors.confirmPassword && touched.confirmPassword && (
                <Text className="mt-1 ml-2 italic text-red-500">
                  {errors.confirmPassword}
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
