import color from 'app/assets/styles/color';
import common from 'app/assets/styles/common';
import {listProfile} from 'app/mocks/data';
import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import BottomAction from './components/BottomAction';
import CardItem from './components/CardItem';
import HeaderHome from './components/HeaderHome';
import useTinderCard from './useTinderCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// decide a threshold after which card will be swiped
const {width, height} = Dimensions.get('screen');
const Home = () => {
  const insets = useSafeAreaInsets();

  // initialize deck to render
  const {data, _panResponder, animation, scale, opacity, status} =
    useTinderCard(listProfile);
  // initialize animation values for position and opacity of top card
  // and scale of next cards
  return (
    <View style={{flex: 1, backgroundColor: color.black}}>
      <HeaderHome />
      <View style={styles.container}>
        {data
          .slice(0, 2)
          .reverse()
          .map((item, index, items) => {
            // check if it's top card
            const isLastItem = index === items.length - 1;
            // apply panHandlers if it's top card
            const panHandlers = isLastItem
              ? {..._panResponder.panHandlers}
              : {};
            // check if it's next card
            const isSecondToLast = index === items.length - 2;
            // rotate from -15 degree to +15 degree for swipe distance of -200 to +200
            const rotate = animation.x.interpolate({
              inputRange: [-200, 0, 200],
              outputRange: ['15deg', '0deg', '-15deg'],
              extrapolate: 'clamp', // make sure the rotation doesn't go beyong 15 degrees.
            });
            // prepare card styles
            const animatedCardStyles = {
              transform: [{rotate}, ...animation.getTranslateTransform()],
              opacity,
            };
            const cardStyle = isLastItem ? animatedCardStyles : undefined;
            const nextStyle = isSecondToLast
              ? {transform: [{scale: scale}], borderRadius: 5}
              : undefined;
            return (
              <CardItem
                {...panHandlers}
                style={[
                  styles.card,
                  cardStyle,
                  nextStyle,
                  {
                    height:
                      height -
                      common.bottomHeight -
                      insets.top -
                      common.headerHomeHeight -
                      40,
                  },
                ]} // apply styles
                key={item.id}
                status={status}
                cardData={item}
              />
            );
          })}
        <BottomAction status={status} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // add container styles and place the cards to center
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  card: {
    width: '100%',
    position: 'absolute',
    borderRadius: 25,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  nameText: {
    fontSize: 16,
  },
  animalText: {
    fontSize: 14,
    color: '#757575',
    paddingTop: 5,
  },
});

export default Home;
