// Create `useTinderCard` hook
import {IProfile} from 'app/types/Story';
import {clamp} from 'lodash';
import {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';
const {width} = Dimensions.get('screen');

const SWIPE_THRESHOLD = 0.25 * width;

export default function useTinderCard(deck: IProfile[]) {
  const [data, setData] = useState<IProfile[]>(deck);
  const [status, setStatus] = useState<'none' | 'like' | 'nope'>('none');
  const animation = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.98)).current;

  const transitionNext = function () {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setData(data => {
        return data.slice(1);
      });
    });
  };

  useEffect(() => {
    scale.setValue(0.98);
    opacity.setValue(1);
    animation.setValue({x: 0, y: 0});
  }, [data]);

  const _panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        animation.setValue({x: gesture.dx, y: gesture.dy});
        let velocity;
        if (gesture.dx > 0) {
          velocity = clamp(gesture.dx, 4, 5);
          setStatus('like');
        } else if (gesture.dx < 0) {
          velocity = clamp(Math.abs(gesture.dx), 4, 5) * -1;
          setStatus('nope');
        }
      },
      onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
        setStatus('none');

        let velocity;
        if (vx >= 0) {
          velocity = clamp(vx, 4, 5);
        } else if (vx < 0) {
          velocity = clamp(Math.abs(vx), 4, 5) * -1;
        }
        if (Math.abs(dx) > SWIPE_THRESHOLD) {
          Animated.parallel([
            Animated.decay(animation, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.99,
              useNativeDriver: false,
            }),
            Animated.spring(scale, {
              toValue: 1,
              friction: 4,
              useNativeDriver: false,
            }),
          ]).start(transitionNext);
          console.log('velocity :>> ', velocity);
          if (velocity > 0) {
            // handleRightDecay();
          } else {
            // handleLeftDecay();
          }
        } else {
          Animated.spring(animation, {
            toValue: {x: 0, y: 0},
            friction: 4,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  return {data, _panResponder, animation, scale, opacity, status};
}
