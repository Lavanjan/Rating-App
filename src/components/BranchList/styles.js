import { useTheme } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, verticalScale } from "../../utils/scaling";
const { width, height } = Dimensions.get("window");

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...alignment.MTsmall,
      ...alignment.MRlarge,
      ...alignment.MLlarge,
      borderRadius: moderateScale(8),
      ...alignment.Psmall,
      backgroundColor: THEME.colors.lightBackground,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};
export default useStyle;
