import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';
import {useCallback, useEffect, useRef} from 'react';

export const Spinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    spin();
  }, [spin]);
  const spin = useCallback(() => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  }, [spinValue]);

  const spinInterpolation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{rotate: spinInterpolation}]}}>
        <ActivityIndicator size="large" color="#10b981" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
