import { useTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, scale, verticalScale } from "../../utils/scaling";
import { textStyles } from "../../utils/textStyles";
const { height } = Dimensions.get("window");
const { width: ScreenWidth } = Dimensions.get("screen");

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    width100: {
      width: "100%",
    },
    safeAreaViewStyles: {
      flex: 1,
      backgroundColor: colors.cardContainer,
    },
    imgResponsive: {
      width: scale(135),
      height: scale(125),
      backgroundColor: "transparent",
    },
    loadingView: {
      backgroundColor: colors.background,
      width: "100%",
      height: "100%",
    },
    upperContainer: {
      marginTop: verticalScale(60),
    },
    mainContainer: {
      flex: 1,
      alignItems: "center",
    },
    subContainer: {
      flex: 1,
      width: "80%",
      alignItems: "center",
      ...alignment.PBmedium,
    },

    marginTop3: {
      ...alignment.MTmedium,
    },
    lgnText: {
      fontSize: moderateScale(20),
    },
    textContainer: {
      borderRadius: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: colors.buttonBackgroundLight,
      alignItems: "center",
      overflow: "hidden",
    },
    labelStyle: {
      ...textStyles.Medium,
      marginTop: 3,
      paddingLeft: 5,
      paddingTop: scale(1),
    },
    loginBtn: {
      width: "100%",
      borderRadius: moderateScale(18),
      height: height * 0.06,
      backgroundColor: colors.buttonBackground,
      justifyContent: "center",
      alignItems: "center",
    },
    whiteBtn: {
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.fontSecondColor,
    },
    appleBtn: {
      width: "100%",
      height: height * 0.06,
    },
    lower_form: {
      alignItems: "center",
      ...alignment.MTlarge,
    },
    RContainer: {
      width: "100%",
      height: height * 0.06,
      backgroundColor: THEME.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: moderateScale(10),
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
};
export default useStyle;
