import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { memo, useRef, useState } from "react";
import EnategaImage from "../EnategaImage/EnategaImage";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NAVIGATION_SCREEN } from "../../utils/constants";
import { Entypo } from "@expo/vector-icons";
import TextDefault from "../Text/TextDefault/TextDefault";
import { Modalize } from "react-native-modalize";
import BranchList from "../BranchList/BranchList";
import i18n from "../../../i18n";
import { THEME } from "../../theme";

const HomeHeader = (props) => {
  const dataArray = props.data ? props.data : [];
  const { getChildData, selectedBranch } = props;

  const navigation = useNavigation();
  const modalizeRef = useRef(null);

  const openModal = () => {
    modalizeRef.current.open();
  };
  const closeModal = () => {
    modalizeRef.current.close();
  };

  const header = () => (
    <TextDefault bold style={styles.header} center H4>
      {i18n.t("branches")}
    </TextDefault>
  );

  const memoziedHeader = memo(header);

  return (
    <React.Fragment>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openModal}
          style={styles.branchToggleContainer}
        >
          <View style={styles.innerToggle}>
            <View>
              <TextDefault H4 bold>
                {selectedBranch?.name}
              </TextDefault>
            </View>
            <Entypo name="chevron-small-down" size={24} color="black" />
          </View>
          <TextDefault light>{i18n.t("branches")}</TextDefault>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION_SCREEN.Profile)}
          style={styles.container}
        >
          <EnategaImage
            imgStyle={styles.imgResponsive}
            imgSource={require("../../assets/images/user.png")}
            spinnerProps={{ style: styles.loadingView }}
          />
        </TouchableOpacity>
      </View>

      <Modalize
        snapPoint={350}
        ref={modalizeRef}
        adjustToContentHeight
        disableScrollIfPossible={false}
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: false,
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height"
        openAnimationConfig={{
          timing: { duration: 400 },
          spring: { speed: 20, bounciness: 5 },
        }}
        HeaderComponent={header}
      >
        <View>
          {dataArray &&
            dataArray.map((item, idx) => {
              return (
                <BranchList
                  key={idx}
                  isSelected={item.id === selectedBranch?.id}
                  data={item}
                  onPress={() => {
                    getChildData(item);
                    closeModal();
                  }}
                />
              );
            })}
        </View>
      </Modalize>
    </React.Fragment>
  );
};

export default HomeHeader;
