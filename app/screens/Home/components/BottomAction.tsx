import color from 'app/assets/styles/color';
import ImageUtil from 'app/utils/ImageUtil';
import React, {useRef, useEffect} from 'react';
import {Image, View, Animated, StyleSheet} from 'react-native';
type BottomActionProps = {
  status: string;
};
const BottomAction = ({status}: BottomActionProps) => {
  const scaleLike = useRef(new Animated.Value(1)).current;
  const scaleClose = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.timing(scaleLike, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();

    switch (status) {
      case 'like':
      case 'nope':
        Animated.timing(scaleLike, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(scaleLike, {
            toValue: 1.4,
            duration: 100,
            useNativeDriver: false,
          }).start();
        });
        Animated.timing(scaleClose, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {});
        break;

      default:
        Animated.timing(scaleClose, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
        Animated.timing(scaleLike, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
    }
  }, [status]);
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{scale: scaleClose}],
            },
          ]}>
          <Image
            source={ImageUtil.images.ic_reload}
            style={{width: 25, height: 25}}
          />
        </Animated.View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{scale: status === 'nope' ? scaleLike : scaleClose}],
            },
          ]}>
          <Image
            source={ImageUtil.images.ic_close}
            style={{width: 25, height: 25}}
          />
        </Animated.View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{scale: scaleClose}],
            },
          ]}>
          <Image
            source={
              status === 'nope'
                ? ImageUtil.images.ic_star
                : ImageUtil.images.ic_star
            }
            style={{width: 25, height: 25}}
          />
        </Animated.View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{scale: status === 'like' ? scaleLike : scaleClose}],
            },
          ]}>
          <Image
            source={
              status === 'nope'
                ? ImageUtil.images.ic_heart
                : ImageUtil.images.ic_heart
            }
            style={{width: 25, height: 25}}
          />
        </Animated.View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.View
          style={[
            styles.item,
            {
              transform: [{scale: scaleClose}],
            },
          ]}>
          <Image
            source={
              status === 'nope'
                ? ImageUtil.images.ic_send
                : ImageUtil.images.ic_send
            }
            style={{width: 25, height: 25}}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default BottomAction;
const styles = StyleSheet.create({
  container: {
    height: 70,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    width: 40,
    height: 40,
    backgroundColor: color.neutral_4,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
