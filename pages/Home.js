import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { Card } from '../components/Card';

export const Home = () => {
  return (
    <>
      <Text textAlign='center' fontSize='6xl' fontWeight='bold'>
        Chomp
      </Text>
      <Div flex={1} mt='3xl' justifyContent='flex-start' alignItems='center'>
        <Card />
      </Div>
    </>
  );
};
