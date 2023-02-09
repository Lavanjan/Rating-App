import { StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale } from "../../utils/scaling";

export const styles = StyleSheet.create({
  imgResponsive: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(20),
  },
  loadingView: {
    backgroundColor: THEME.colors.background,
    width: "100%",
    height: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  branchToggleContainer: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red",
    ...alignment.PxSmall,
  },
  innerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...alignment.PLmedium,
    ...alignment.PRmedium,
    ...alignment.PTmedium,
  },
  header: {
    ...alignment.MTlarge,
  },
  floating: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,

    position: "absolute",
    right: 20,
    bottom: 20,

    width: 60,
    height: 60,

    borderRadius: 30,
    backgroundColor: "#333",
  },
});
