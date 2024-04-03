import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const FallingStar = () => {
  const { width, height } = Dimensions.get('window');
  const numOfStars = 50; // Number of stars to display

  const starAnimations = Array.from({ length: numOfStars }).map((_, index) => ({
    translateY: new Animated.Value(0),
    delay: index * 500, // Adjust delay to create staggered animation
  }));

  useEffect(() => {
    starAnimations.forEach((starAnimation) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(starAnimation.translateY, {
            toValue: height, // Adjust the value to reach the bottom of the screen
            duration: 3000, // Adjust the duration as needed
            useNativeDriver: true,
            delay: starAnimation.delay,
          }),
          Animated.timing(starAnimation.translateY, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {starAnimations.map((starAnimation, index) => (
        <Animated.View
          key={index}
          style={[
            styles.star,
            {
              transform: [{ translateY: starAnimation.translateY }],
              left: Math.random() * width, // Randomize the horizontal position of stars
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black', // Set the background color to black
  },
  star: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
});

export default FallingStar;
