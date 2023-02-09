import { ViewStyle, ImageStyle, Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, verticalScale } from "../../utils/scaling";
const { width: ScreenWidth } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.lightBackground,
    justifyContent: "center",
  },
  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
    ...alignment.MTlarge,
  },
  loginButtonStyle: {
    height: verticalScale(50),
    width: ScreenWidth * 0.9,
    backgroundColor: THEME.colors.primary,
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 32,
    // elevation: 5,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: THEME.colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
  },
  loginTextStyle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupStyle: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  signupTextStyle: {
    color: "#acabb0",
  },
  dividerStyle: {
    height: 0.5,
    marginTop: 24,
    marginBottom: 12,
    borderRadius: 16,
    width: ScreenWidth * 0.8,
    alignSelf: "center",
    backgroundColor: "#ccc",
  },
  socialLoginContainer: {
    ...alignment.MTlarge,
    alignItems: "center",
    // justifyContent: "center",
  },

  facebookSocialButtonTextStyle: {
    color: "#4267B2",
  },
  twitterSocialButtonTextStyle: {
    color: "#56bfe8",
  },
  discordSocialButtonTextStyle: {
    color: "#5865F2",
  },
  socialButtonStyle: {
    marginTop: 16,
  },
  input: {
    ...alignment.MBmedium,
  },
});
