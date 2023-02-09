import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import TextDefault from "../Text/TextDefault/TextDefault";
import useStyle from "./styles";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { scale } from "../../utils/scaling";

const BranchList = React.memo((props) => {
  const { data, onPress, isSelected } = props;
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={onPress}>
          <TextDefault numberOfLines={1} H5 bold>
            {data.name}
          </TextDefault>
          <TextDefault numberOfLines={1}>{data.address}</TextDefault>
        </TouchableOpacity>
      </View>
      <View>
        {isSelected && (
          <MaterialCommunityIcons
            name="check-decagram"
            color={THEME.colors.primary}
            size={scale(16)}
            style={{ marginHorizontal: 3 }}
          />
        )}
      </View>
    </View>
  );
});

export default BranchList;
