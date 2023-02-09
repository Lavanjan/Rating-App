import { StyleSheet } from "react-native";
import { alignment } from "../../utils/alignment";
import { moderateScale } from "../../utils/scaling";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    ...alignment.MTmedium,
  },
  branchToggleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 40,
  },
  column: {
    justifyContent: "space-between",
  },
  listHeader: {
    ...alignment.PLmedium,
  },
  placeholder: {
    ...alignment.MTxSmall,
    ...alignment.MBxSmall,
    ...alignment.MLmedium,
    ...alignment.MRmedium,
    backgroundColor: "#fff",
    borderRadius: moderateScale(8),
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
