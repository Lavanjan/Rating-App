import {
  ViewStyle,
  StyleSheet,
  Dimensions,
  ImageStyle,
  TextStyle,
} from "react-native";
import { scale } from "../../utils/scaling";
const { width: ScreenWidth } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    width: ScreenWidth * 0.9,
    paddingLeft: ScreenWidth * 0.2,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#e9eef4",
  },
  iconImageStyle: {
    width: scale(20),
    height: scale(20),
  },
  textContainer: {
    marginLeft: 16,
  },
  textStyle: {
    color: "#315092",
    fontWeight: "500",
  },
});
