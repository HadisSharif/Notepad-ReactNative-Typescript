import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import Navigate from "../app/navigation/Navigate";
import descriptionicon from "../common/assets/images/descriptionicon.png";
import { Colors } from "./utils/Colors";
import { Strings } from "./utils/Strings";

const Splash = () => {
  const moveLogo = useRef(
    new Animated.Value(Dimensions.get("window").width)
  ).current;

  const rotateAnimation = new Animated.Value(0);

  const opacity = new Animated.Value(0);

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      }),
      Animated.timing(moveLogo, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      rotateAnimation.setValue(0);
    });
    setTimeout(() => {
      Navigate.navigate("SignInPage");
    }, 6000);
  }, []);

  const animatedStyle = {
    opacity: opacity,
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  return (
    <Animated.View style={styles.container}>
      <Animated.Image
        source={descriptionicon}
        style={[styles.image, { transform: [{ translateX: moveLogo }] }]}
      />
      <Animated.Text style={[styles.text, animatedStyle]}>
        {Strings.appName}
      </Animated.Text>
    </Animated.View>
  );
};
export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.yellow,
  },
  image: {
    width: 100,
    height: 100,
    tintColor: Colors.light_purple,
  },
  text: {
    fontSize: 35,
    color: Colors.pink,
  },
});
