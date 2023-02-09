import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, scale, verticalScale } from "../../utils/scaling";

const useStyle = () => {
  const { dark, colors } = useTheme();

  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    formContainer: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    containerInfo: {
      width: "100%",
      marginTop: moderateScale(60),
      ...alignment.PLsmall,
      ...alignment.PLlarge,
    },
    changePassword: {
      alignItems: "center",
      flexDirection: "row",
      width: "100%",
      backgroundColor: THEME.colors.lightBackground,
      alignSelf: "center",
      justifyContent: "space-between",
      shadowOffset: { width: 2, height: 2 },
      shadowColor: colors.shadowColor,
      shadowOpacity: 0.1,
      shadowRadius: 12,
      borderWidth: dark ? 2 : 0,
      borderRadius: moderateScale(10),
      elevation: 2,
      paddingHorizontal: scale(10),
      height: moderateScale(55),
      marginTop: moderateScale(20),
    },
    formSubContainer: {
      marginTop: moderateScale(80),
      alignItems: "center",
      width: "85%",
      backgroundColor: THEME.colors.lightBackground,
      alignSelf: "center",
      shadowOffset: { width: 2, height: 2 },
      shadowColor: colors.shadowColor,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      borderRadius: moderateScale(20),
      // elevation: 2,
      borderWidth: dark ? 2 : 0,
      borderColor: colors.shadowColor,
      ...alignment.MBlarge,
      ...alignment.PRlarge,
      ...alignment.Psmall,
      paddingBottom: verticalScale(50),
    },

    saveContainer: {
      marginTop: scale(40),
      width: "90%",
      height: scale(40),
      backgroundColor: colors.blueColor,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: moderateScale(14),
    },
    // Model for password changing
    modalContainer: {
      backgroundColor: THEME.colors.white,
      borderRadius: verticalScale(8),
      justifyContent: "center",
      alignItems: "center",
      ...alignment.PTmedium,
      ...alignment.PBsmall,
    },
    modalContent: {
      width: "90%",
    },
    titleContainer: {
      width: "100%",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    btnContainer: {
      width: "30%",
      justifyContent: "center",
      borderRadius: moderateScale(10),
      height: verticalScale(40),
      backgroundColor: colors.blueColor,
      alignItems: "center",
      alignSelf: "flex-end",
      ...alignment.MTsmall,
      ...alignment.PxSmall,
    },
    imgContainer: {
      width: scale(90),
      height: scale(90),
      justifyContent: "center",
      marginBottom: moderateScale(10),
      alignItems: "center",
      borderRadius: scale(50),
      // backgroundColor: colors.fontSecondColor,
    },
    signoutButton: {
      width: "50%",
      height: moderateScale(45),
      borderColor: THEME.colors.errorColor,
      borderRadius: moderateScale(6),
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      ...alignment.MTlarge,
    },
    imgResponsive: {
      width: moderateScale(100),
      height: moderateScale(100),
      borderRadius: moderateScale(20),
    },
    loadingView: {
      backgroundColor: THEME.colors.background,
      width: "100%",
      height: "100%",
    },
    languageContainer: {
      width: "80%",
      alignSelf: "center",
      ...alignment.PRmedium,
      ...alignment.PTsmall,
      ...alignment.PBlarge,
      ...alignment.PLmedium,
      ...alignment.MTmedium,
    },
    radioContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.horizontalLine,
      alignItems: "center",
      ...alignment.PTxSmall,
      ...alignment.PBmedium,
      ...alignment.MBmedium,
    },
  });
};
export default useStyle;
