import { ActivityIndicator } from 'react-native';
import { Button, Div, Image, Text, Icon } from 'react-native-magnus';
import React, { useState, useEffect, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import useSWR from 'swr';
import { SwipeButton } from './SwipeButton';
import { fetcher } from '../utils/fetcher';

const alreadyRemoved = [];

export const Card = () => {
  const ACCESS_KEY = process.env.ACCESS_KEY;
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [emptyArray, setEmptyArray] = useState(false);

  const { data, mutate, error } = useSWR(
    `/photos/random?client_id=${ACCESS_KEY}&query=food&drink&orientation=portrait&count=10`,
    fetcher
  );

  const childRefs = useMemo(
    () =>
      Array(images.length)
        .fill(0)
        .map((i) => React.createRef()),
    [images]
  );

  const refresh = () => {
    mutate();
    setEmptyArray(false);
  };

  useEffect(() => {
    let db = [];
    for (let step = 0; step < 10; step++) {
      console.log('Running');
      // Runs 5 times, with values of step 0 through 4.
      db.push(data?.[step].urls.regular);
    }
    console.log(error);
    setImages(db);
    setIsLoading(false);
  }, [data]);

  const swipe = (dir) => {
    const cardsLeft = images.filter((img) => !alreadyRemoved.includes(img));
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]; // Find the card object to be removed
      const index = images.map((img) => img).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const swiped = (direction, imageToDelete) => {
    console.log('removing: ' + imageToDelete + ' to the ' + direction);
    alreadyRemoved.push(imageToDelete);
  };

  const onCardLeftScreen = (myIdentifier) => {
    if (myIdentifier === 0) {
      setEmptyArray(true);
      refresh();
    }
    console.log(myIdentifier + ' left the screen');
  };

  return (
    <>
      {/* Image goes in this card */}
      <Div h={530} w={330} rounded='2xl' bg='#D8B4A0' shadow='2xl'>
        <Div>
          {emptyArray ? (
            <>
              <ActivityIndicator />
            </>
          ) : (
            images.map((img, i) => (
              <Div>
                <TinderCard
                  onSwipe={(dir) => swiped(dir, img)}
                  onCardLeftScreen={() => onCardLeftScreen(i)}
                  preventSwipe={['up', 'down']}
                  ref={childRefs[i]}
                  key={img}
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
            ))
          )}
        </Div>

        {error ? (
          <Div h='50%' justifyContent='center'>
            <Text textAlign='center' fontSize='2xl'>
              Uh-oh!! Something went wrong
            </Text>
          </Div>
        ) : null}

        <Div zIndex={-1} flex={1} flexDir='column-reverse'>
          <Div row w='100%' mb='5%' justifyContent='space-around'>
            <SwipeButton
              swipe={swipe}
              dir='left'
              name='times'
              fontFamily='FontAwesome5'
            />
            <SwipeButton
              swipe={swipe}
              dir='right'
              name='heart'
              fontFamily='FontAwesome'
            />
          </Div>
        </Div>
      </Div>
    </>
  );
};
