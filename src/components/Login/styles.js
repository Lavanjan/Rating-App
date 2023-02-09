import { ViewStyle, ImageStyle, Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, scale } from "../../utils/scaling";
const { width: ScreenWidth } = Dimensions.get("screen");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.lightBackground,
    justifyContent: "center",
  },
  logoImageStyle: {
    width: scale(150),
    height: scale(150),
    alignSelf: "center",
    ...alignment.MBmedium,
  },
  textInputContainer: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordTextInputContainer: {
    marginTop: 16,
  },
  loginButtonStyle: {
    height: moderateScale(45),
    width: ScreenWidth * 0.9,
    backgroundColor: THEME.colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 32,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: THEME.colors.primary,
  },
  disabledloginButtonStyle: {
    height: moderateScale(45),
    width: ScreenWidth * 0.9,
    backgroundColor: THEME.colors.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 32,
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowColor: THEME.colors.primary,
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
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
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
});
