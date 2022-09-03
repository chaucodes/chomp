import { Div, Image } from 'react-native-magnus';
import React from 'react';

export const CardComponent = () => {
  return (
    <Div mt='sm' mx='sm' h={440} w={320} rounded='2xl' shadow='2xl'>
      <Image
        h={440}
        w={320}
        rounded='2xl'
        source={{
          uri: currImage,
        }}
      />
    </Div>
  );
};
