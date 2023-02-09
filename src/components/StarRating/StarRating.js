import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { scale } from "../../utils/scaling";

const StarRating = React.memo((props) => {
  const { size = 15 } = props;
  const Star = ({ filled }) => {
    return (
      <FontAwesome
        name={filled ? "star" : "star-o"}
        color={THEME.colors.primary}
        size={scale(size)}
        style={{ marginHorizontal: 3 }}
      />
    );
  };

  const [rating, setrating] = useState(props.rating ?? 1);
  const [animation, setanimation] = useState(new Animated.Value(1));
  let numStars = 5;
  let stars = [];

  const rate = (star) => {
    console.log({ star });
    props.handleRating(star);
    setrating(star);
  };

  const animate = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(1);
    });
  };

  const animateScale = animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1],
  });

  const animateRotate = animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ["0deg", "-3deg", "3deg", "0deg"],
  });

  const animateStyle = {
    transform: [{ scale: animateScale }, { rotate: animateRotate }],
    opacity: animateOpacity,
  };

  const handleTouch = (x) => {
    rate(x);
    animate();
  };

  for (let x = 1; x <= numStars; x++) {
    stars.push(
      <TouchableWithoutFeedback
        key={x}
        onPress={() => {
          props.handleRating && handleTouch(x);
        }}
      >
        <Animated.View style={x <= rating ? animateStyle : ""}>
          <Star filled={x <= rating ? true : false} />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
});

export default StarRating;
