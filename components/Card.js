import { Button, Div, Image, Text, Icon } from 'react-native-magnus';
import React, { useState, useMemo, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import useSWR from 'swr';
import { SwipeButton } from './SwipeButton';
import { fetcher } from '../utils/fetcher';

// const db = [
//   { url: 'https://picsum.photos/id/227/440/320' },
//   { url: 'https://picsum.photos/id/532/440/320' },
//   { url: 'https://picsum.photos/id/315/440/320' },
//   { url: 'https://picsum.photos/id/335/440/320' },
//   { url: 'https://picsum.photos/id/355/440/320' },
// ];

export const Card = () => {
  const ACCESS_KEY = process.env.ACCESS_KEY;

  const [images, setImages] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [emptyArray, setEmptyArray] = useState(false);

  const { data, error, mutate } = useSWR(
    `search/photos?client_id=${ACCESS_KEY}&page=${currPage}&query=chinese food`,
    fetcher
  );

  useEffect(() => {
    let db = [];
    for (let step = 0; step < 10; step++) {
      console.log('Running');
      // Runs 5 times, with values of step 0 through 4.
      db.push(data?.results[step].urls.regular);
    }
    setImages(db);
  }, [data]);

  const refresh = () => {
    setCurrPage(currPage + 1);
    setEmptyArray(false);
  };

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
            <Div key={img}>
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen(i)}
                preventSwipe={['up', 'down']}
              >
                <Div
                  position='absolute'
                  alignSelf='center'
                  mt='sm'
                  mx='sm'
                  h={440}
                  w={320}
                  rounded='2xl'
                >
                  <Image
                    h={440}
                    w={320}
                    rounded='2xl'
                    source={{
                      uri: img,
                    }}
                  />
                </Div>
              </TinderCard>
            </Div>
          ))}
        </Div>

        {emptyArray ? (
          <Div flex={1} alignSelf='center' justifyContent='center'>
            <Text textAlign='center' fontSize='2xl'>
              All out of images!
            </Text>
            <Button
              onPress={refresh}
              h={50}
              w={50}
              bg='#fff'
              shadow='xl'
              rounded='circle'
            >
              <Icon
                name='refresh'
                fontSize={24}
                color='#FF3A82'
                shadow='md'
                fontFamily='FontAwesome'
              />
            </Button>
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
