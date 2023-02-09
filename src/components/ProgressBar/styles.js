import { StyleSheet } from "react-native";
import { alignment } from "../../utils/alignment";
import { moderateScale } from "../../utils/scaling";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBar: {
    ...alignment.MLxSmall,
  },
});
