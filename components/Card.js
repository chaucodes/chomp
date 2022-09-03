import { Div, Image, Text } from 'react-native-magnus';
import React, { useMemo, createRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { SwipeButton } from './SwipeButton';

const db = [
  { url: 'https://picsum.photos/id/227/440/320' },
  { url: 'https://picsum.photos/id/532/440/320' },
  { url: 'https://picsum.photos/id/315/440/320' },
  { url: 'https://picsum.photos/id/335/440/320' },
  { url: 'https://picsum.photos/id/355/440/320' },
];

// const alreadyRemoved = [];
// let imagesState = db;

export const Card = () => {
  const [emptyArray, setEmptyArray] = useState(false);
  const images = db;

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier) => {
    if (myIdentifier === 0) {
      setEmptyArray(true);
    }
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <>
      {/* Image goes in this card */}
      <Div h={530} w={330} rounded='2xl' bg='#D8B4A0' shadow='2xl'>
        <Div>
          {images.map((img, i) => (
            <Div>
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen(i)}
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
            </Div>
          ))}
        </Div>
        {emptyArray ? (
          <Div flex={1} justifyContent='center'>
            <Text textAlign='center' fontSize='2xl'>
              All out of images!
            </Text>
          </Div>
        ) : null}

        {/* <Div zIndex={-1} flex={1} flexDir='column-reverse'>
          <Div row w='100%' mb='5%' justifyContent='space-around'>
            <SwipeButton name='times' fontFamily='FontAwesome5' />
            <SwipeButton name='heart' fontFamily='FontAwesome' />
          </Div>
        </Div> */}
      </Div>
    </>
  );
};
