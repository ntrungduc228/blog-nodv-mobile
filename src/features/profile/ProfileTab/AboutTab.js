import {View, Text} from 'react-native';
import {useState} from 'react';
import {
  AboutStarted,
  AboutForm,
  FollowerModal,
  FollowingModal,
  AboutDescription,
} from './components';
import {Button} from 'react-native-paper';
import {ModalTrigger} from '../../../components/ModalTrigger';
import {useSelector} from 'react-redux';

export const AboutTab = () => {
  const [showForm, setShowForm] = useState(false);
  const profile = useSelector(state => state?.profile?.data);
  const user = useSelector(state => state?.user?.data.info);
  const classMarginBottom = !showForm ? 'mb-7' : 'mb-0';

  const onPress = () => {
    setShowForm(prev => !prev);
  };

  return (
    <View className="flex-1 bg-white flex-col justify-between">
      {showForm ? (
        <AboutForm onPress={onPress} user={user} />
      ) : !user.bio ? (
        <AboutStarted onPress={onPress} />
      ) : (
        <AboutDescription onPress={onPress} userBio={user.bio} />
      )}
      <View
        className={`${classMarginBottom} flex flex-row items-center justify-center gap-x-3`}>
        <ModalTrigger
          button={
            <Button mode="text" textColor="#4caf50">
              Followers
            </Button>
          }>
          <FollowerModal />
        </ModalTrigger>

        <ModalTrigger
          button={
            <Button mode="text" textColor="#4caf50">
              Following
            </Button>
          }>
          <FollowingModal />
        </ModalTrigger>
      </View>
    </View>
  );
};
