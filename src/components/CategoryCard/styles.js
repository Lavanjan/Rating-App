import { useTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, scale, verticalScale } from "../../utils/scaling";
const { width, height } = Dimensions.get("window");

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    imgResponsive: {
      width: scale(120),
      height: verticalScale(100),
      borderRadius: moderateScale(10),
    },
    loadingView: {
      backgroundColor: THEME.colors.background,
      width: "100%",
      height: "100%",
    },
    container: {
      backgroundColor: THEME.colors.secondplaceHolderColor,
      borderRadius: moderateScale(8),
      justifyContent: "space-between",
      ...alignment.MTxSmall,
      ...alignment.MBxSmall,
      ...alignment.MLmedium,
      ...alignment.MRmedium,
      flexDirection: "row",
      ...alignment.Psmall,
    },
    descriptionContainer: {
      justifyContent: "space-around",
      alignItems: "flex-start",
      width: "100%",
      ...alignment.Pmedium,
    },
    ratingContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingText: {
      ...alignment.MLxSmall,
    },
  });
};
export default useStyle;
