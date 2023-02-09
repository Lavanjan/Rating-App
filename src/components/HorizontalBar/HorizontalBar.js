import { View } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";

const HorizontalBar = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 1,
        width: "100%",
        backgroundColor: THEME.colors.border,
        ...alignment.MTmedium,
        ...alignment.MBmedium,
      }}
    ></View>
  );
};
export default HorizontalBar;
