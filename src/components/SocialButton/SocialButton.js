import * as React from "react";
import {
  View,
  Image,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import TextDefault from "../Text/TextDefault/TextDefault";
/**
 * ? Local Imports
 */
import styles from "./styles";

const SocialButton = ({
  style,
  text,
  textStyle,
  iconImageStyle,
  textContainerStyle,
  imageSource = require("../../assets/images/google.png"),
  onPress,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image
        resizeMode="contain"
        source={imageSource}
        style={[styles.iconImageStyle, iconImageStyle]}
      />
      <View style={[styles.textContainer, textContainerStyle]}>
        <TextDefault style={[styles.textStyle, textStyle]}>{text}</TextDefault>
      </View>
    </TouchableOpacity>
  );
};

export default SocialButton;
