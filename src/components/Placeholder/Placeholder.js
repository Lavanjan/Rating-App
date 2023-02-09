import { View, Text, Animated, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

const Placeholder = ({ width, height, style }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: "rgba(0,0,0,0.12)",
          overflow: "hidden",
        },
        style,
      ])}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ height: "100%", width: "100%" }}
          colors={["transparent", "rgba(0,0,0,0.05)", "transparent"]}
          start={{ x: 1, y: 1 }}
        ></LinearGradient>
      </Animated.View>
    </View>
  );
};

export default Placeholder;
