import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import TextDefault from "../Text/TextDefault/TextDefault";
import { styles } from "./styles";
import { THEME } from "../../theme";

const ProgressBar = (props) => {
  const { progress, width = 100, label } = props;
  return (
    <View style={styles.container}>
      <TextDefault textColor={THEME.colors.fontSecondColor}>
        {label}
      </TextDefault>
      <Progress.Bar
        color={THEME.colors.primary}
        borderColor={THEME.colors.lightBackground}
        style={styles.progressBar}
        progress={progress}
        width={width}
        unfilledColor={THEME.colors.fontSecondColor}
      />
    </View>
  );
};

export default ProgressBar;
