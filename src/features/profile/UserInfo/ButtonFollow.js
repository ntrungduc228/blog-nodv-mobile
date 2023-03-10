import React from 'react';
import {Button} from 'react-native-paper';

export const ButtonFollow = ({followed, onPress, ...props}) => {
  return (
    <Button
      style={{borderColor: '#4caf50'}}
      className={`rounded-full mx-10 ${followed ? `bg-white` : `bg-[#4caf50]`}`}
      mode="outlined"
      onPress={onPress}
      textColor={followed ? `#4caf50` : `#fff`}
      {...props}>
      {followed ? `Following` : `Follow`}
    </Button>
  );
};
