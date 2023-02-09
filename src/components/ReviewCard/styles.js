import { StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale } from "../../utils/scaling";

const useStyle = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: THEME.colors.secondplaceHolderColor,
      ...alignment.Pmedium,
      ...alignment.MTmedium,
      borderRadius: moderateScale(12),
    },
    imgResponsive: {
      width: moderateScale(28),
      height: moderateScale(28),
      borderRadius: moderateScale(20),
    },
    loadingView: {
      backgroundColor: THEME.colors.background,
      width: "100%",
      height: "100%",
    },
    ratingContainer: {
      backgroundColor: THEME.colors.secondplaceHolderColor,
      ...alignment.Psmall,
    },
    nameContainer: {
      // flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    nameSubContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
    },
    nameText: {
      ...alignment.MLsmall,
    },
    ratingSubnContainer: {
      width: "50%",
      flexDirection: "row",
      ...alignment.MTsmall,
      ...alignment.MBxSmall,
    },
    imgResponsive: {
      width: moderateScale(30),
      height: moderateScale(30),
      borderRadius: moderateScale(20),
    },
    loadingView: {
      backgroundColor: THEME.colors.background,
      width: "100%",
      height: "100%",
    },
  });
};

export { useStyle };
