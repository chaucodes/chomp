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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {}, [currentIndex]);

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
    if (currentIndex > 2) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      {/* Image goes in this card */}
      <Div
        justifyContent='flex-start'
        alignItems='center'
        h={530}
        w={330}
        rounded='2xl'
        bg='#D8B4A0'
        shadow='2xl'
      >
        <TinderCard
          onSwipe={onSwipe}
          onCardLeftScreen={() => onCardLeftScreen('fooBar')}
          preventSwipe={['up', 'down']}
        >
          <Div mt='sm' mx='sm' h={440} w={320} rounded='2xl' shadow='2xl'>
            {/* ActivityLoader when image is loading */}
            <Image
              h={440}
              w={320}
              rounded='2xl'
              source={{
                uri: db[currentIndex].url,
              }}
            />
          </Div>
        </TinderCard>
        <Div w='100%' mt='lg' row justifyContent='space-around'>
          <SwipeButton name='times' fontFamily='FontAwesome5' />
          <SwipeButton name='heart' fontFamily='FontAwesome' />
        </Div>
      </Div>
    </>
  );
};
