import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';
import Page from './Page'

const PAGES = [
  'Page 1',
  'Page 2',
  'Page 3',
]

export default function index() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  const translationX = useSharedValue(0)

  const boundedTranslationX = useDerivedValue(() => {
    const lowerBound = Math.min(translationX.value, 0)
    const upperBound = -(screenWidth * (PAGES.length - 1))

    return Math.max(lowerBound, upperBound)
  })

  type Context = {
    changeX: number;
  }

  const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Context>({
    onStart: (event, context) => {
      context.changeX = boundedTranslationX.value

      cancelAnimation(translationX)
    },
    onActive: (event, context) => {
      translationX.value = context.changeX + event.translationX
    },
    onEnd: (event, context) => {
      translationX.value = withDecay({ velocity: event.velocityX })
    },
  })

  const rScrollStyle = useAnimatedStyle(() => {

    return {
      transform: [
        { translateX: boundedTranslationX.value }
      ]
    }
  })

  return (
    <View style={styles.root}>
      <PanGestureHandler onGestureEvent={gestureEventHandler}>
        <Animated.View style={[styles.scroll, rScrollStyle]}>
          {PAGES.map((page, index) => (
            <Page key={`${index}`} title={page} index={index} reference={translationX} />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#202020',
  },
  scroll: {
    flex: 1,
    flexDirection: 'row',
  }
});
