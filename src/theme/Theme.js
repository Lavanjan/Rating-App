import { DefaultTheme } from "@react-navigation/native";
import { COLORS } from "./Colors";
const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    black: COLORS.black,
    white: COLORS.white,
    curve: COLORS.primary,
    selected: COLORS.primary,
    fontWhite: COLORS.white,
    tagColor: COLORS.primary,
    iconColor: COLORS.darkGrey,
    iconColorPrimary: COLORS.primary,
    cardContainer: COLORS.white,
    rippleColor: COLORS.black02,
    background: COLORS.white,
    lightBackground: COLORS.lightBlueShadeGrey,
    headerbackground: COLORS.primary,
    headerbackground2: COLORS.offWhite,
    headerTextColor: COLORS.primaryBlack,
    fontMainColor: COLORS.primaryBlack,
    fontSecondColor: COLORS.lightGrey,
    placeHolderColor: COLORS.lightGrey,
    buttonBackground: COLORS.primary,
    buttonBackgroundLight: COLORS.mediumBlueShadeGrey,
    buttonBackgroundBlue: COLORS.primaryLightBlue,
    active: COLORS.primaryLightBlue,
    buttonText: COLORS.white,
    horizontalLine: COLORS.lineGrey,
    shadowColor: COLORS.black06,
    drawerBackground: COLORS.primary,
    spinnerColor: COLORS.primary,
    errorColor: COLORS.redishOrange,
    radioColor: COLORS.white,
    radioOuterColor: COLORS.primary,
    blueColor: COLORS.blueColor,
    chatBubblePrimary: COLORS.yellowishOrange,
    greyBackground: COLORS.thinGrey,
    ratingColor: COLORS.rating,
    reviewBackground: COLORS.grey,
    primary: COLORS.primary,
    secondplaceHolderColor: COLORS.defaultGrey,
    star: COLORS.star,
  },
};

export default Theme;
