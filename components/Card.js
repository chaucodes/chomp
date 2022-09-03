import { Div, Image } from 'react-native-magnus';
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { SwipeButton } from './SwipeButton';

const db = [
  { url: 'https://picsum.photos/id/227/440/320' },
  { url: 'https://picsum.photos/id/532/440/320' },
  { url: 'https://picsum.photos/id/345/440/320' },
];

export const Card = () => {
  const images = db;

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <>
      {/* Image goes in this card */}
      <Div h={530} w={330} rounded='2xl' bg='#D8B4A0' shadow='2xl'>
        {images.map((img, i) => (
          <TinderCard
            onSwipe={onSwipe}
            onCardLeftScreen={() => onCardLeftScreen('fooBar')}
            preventSwipe={['up', 'down']}
            key={img.url}
          >
            <Div
              position='absolute'
              alignSelf='center'
              mt='sm'
              mx='sm'
              h={440}
              w={320}
              rounded='2xl'
              shadow='2xl'
            >
              <Image
                h={440}
                w={320}
                rounded='2xl'
                source={{
                  uri: img.url,
                }}
              />
            </Div>
          </TinderCard>
        ))}

        <Div flex={1} justifyContent='flex-end'>
          <Div row w='100%' mb='5%' justifyContent='space-around'>
            <SwipeButton name='times' fontFamily='FontAwesome5' />
            <SwipeButton name='heart' fontFamily='FontAwesome' />
          </Div>
        </Div>
      </Div>
    </>
  );
};
