import {Button} from 'react-native-paper';
import React from 'react';

export const ButtonFollow = ({followed, onPress, ...props}) => {
  return (
    <Button
      style={{borderColor: '#4caf50'}}
      className={`rounded-full ${followed ? `bg-white` : `bg-[#4caf50]`}`}
      mode="outlined"
      onPress={onPress}
      textColor={followed ? `#4caf50` : `#fff`}
      {...props}>
      {followed ? `Following` : `Follow`}
    </Button>
  );
};
