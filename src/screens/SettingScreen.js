import {View} from 'react-native';
import {List, Switch, Text, Button} from 'react-native-paper';
import useSocialAuth from '../hooks/useSocialAuth';

export function SettingsScreen() {
  const {handleLogoutBySocial} = useSocialAuth();
  return (
    <View>
      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Push Notifications"
          right={() => <Switch value={false} />}
        />
        <List.Item
          title="Email Notifications"
          right={() => <Switch value={false} />}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item title="Change Password" />
        <List.Item
          title="Delete Account"
          description="Permanently delete your account"
        />
      </List.Section>
      <Button
        className="mt-2 mx-2"
        buttonColor=""
        textColor="#4caf50"
        mode="outlined"
        onPress={handleLogoutBySocial}>
        Sign out
      </Button>
    </View>
  );
}
