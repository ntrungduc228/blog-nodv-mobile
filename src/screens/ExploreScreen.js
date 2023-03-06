import {Text, View, StyleSheet} from 'react-native';
import {Spinner} from '../components';

function ExploreScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text>Explore!</Text>
      <Spinner />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ExploreScreen;
