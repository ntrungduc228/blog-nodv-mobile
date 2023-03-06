import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import useSocialAuth from '../hooks/useSocialAuth';

export function SettingsScreen() {
  const {handleLogoutBySocial} = useSocialAuth();
  return (
    <View style={{justifyContent: 'center'}}>
      <Button
        className="mt-2"
        buttonColor="#4caf50"
        textColor="#fff"
        mode="contained"
        onPress={handleLogoutBySocial}>
        Sign out
      </Button>
    </View>
  );
}
