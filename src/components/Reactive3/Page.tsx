import React from 'react';
import { StyleSheet, View, useWindowDimensions, Text } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { PageProps } from './Types'

const Page: React.FC<PageProps> = ({ title, index, reference }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()

  const inputRange: number[] = [
    (index - 1) * screenWidth,
    (index) * screenWidth,
    (index + 1) * screenWidth
  ]

  const rShapeStyle = useAnimatedStyle(() => {
    const outputRange: number[] = [0, 1, 0]

    const scale = interpolate(reference.value, inputRange, outputRange, Extrapolate.CLAMP)

    return {
      transform: [
        { scale: scale }
      ]
    }
  }, [])

  const rTextStyle = useAnimatedStyle(() => {
    const translationOutputRange: number[] = [-500, 0, -500]
    const opacityOutputRange: number[] = [-5, 1, -5]

    const translationY = interpolate(reference.value, inputRange, translationOutputRange, Extrapolate.CLAMP)
    const opacity = interpolate(reference.value, inputRange, opacityOutputRange, Extrapolate.CLAMP)

    return {
      transform: [
        { translateY: translationY },
      ],
      opacity: opacity,
    }
  })

  return (
    <View style={[
      styles({ screenWidth, screenHeight }).container,
      { backgroundColor: `rgba(0, 0, 0, 0.${index + 1})` }
    ]}>
      <Animated.View style={[styles({}).textContainer, rTextStyle]}>
        <Text style={styles({}).text}>{title}</Text>
      </Animated.View>
      <Animated.View style={[
        styles({ screenWidth, screenHeight }).shape,
        rShapeStyle,
      ]} />
    </View>
  );
}

const styles = (props?: any) => StyleSheet.create({
  container: {
    width: props.screenWidth,
    height: props.screenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape: {
    aspectRatio: 1,
    width: props.screenWidth * 0.5,
    borderRadius: props.screenWidth * 0.5 / 2,
    backgroundColor: '#FCA311',
  },
  textContainer: {
    position: 'absolute',
    top: 100
  },
  text: {
    color: '#E5E5E5',
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Page
