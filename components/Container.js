import React from 'react';
import { Div } from 'react-native-magnus';

export const Container = ({ children }) => {
  return (
    <Div flex={1} bg='#fff'>
      {children}
    </Div>
  );
};
