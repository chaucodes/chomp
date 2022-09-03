import { Button, Icon } from 'react-native-magnus';
import React from 'react';

export const SwipeButton = ({ name, fontFamily }) => {
  return (
    <>
      <Button h={50} w={50} bg='#fff' shadow='xl' rounded='circle'>
        <Icon
          name={name}
          fontSize={24}
          color='#FF3A82'
          shadow='md'
          fontFamily={fontFamily}
        />
      </Button>
    </>
  );
};
