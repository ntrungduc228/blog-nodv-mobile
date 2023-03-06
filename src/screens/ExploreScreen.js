import {Text, View, StyleSheet, Button} from 'react-native';

function ExploreScreen({navigation}) {
  return (
    <View style={styles.viewContainer}>
      <Text>Explore!</Text>
      <View className="my-3">
        <Button
          className="bg-emerald-500"
          title="Comment"
          onPress={() => navigation.navigate('Comments')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default ExploreScreen;
