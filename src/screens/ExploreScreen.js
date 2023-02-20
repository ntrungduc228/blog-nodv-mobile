import {Text, View, StyleSheet} from 'react-native';

function ExploreScreen() {
  return (
    <View style={styles.viewContainer}>
      <Text>Explore!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ExploreScreen;
