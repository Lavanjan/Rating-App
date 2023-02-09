import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import { TextField } from "rn-material-ui-textfield";
import Modal from "react-native-modal";
import i18n from "../../../i18n";
import { FlashMessage } from "../../components/FlashMessage/FlashMessage";
import TextDefault from "../../components/Text/TextDefault/TextDefault";
import { alignment } from "../../utils/alignment";
import { scale } from "../../utils/scaling";
import useStyle from "./styles";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

function ChangePassword(props) {
  const styles = useStyle();
  const { colors } = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [loading, setloading] = useState(false);

  const languageTypes = [
    { value: "English", code: "en", index: 0 },
    { value: "français", code: "fr", index: 1 },
    { value: "ភាសាខ្មែរ", code: "km", index: 2 },
    { value: "中文", code: "zh", index: 3 },
    { value: "Deutsche", code: "de", index: 4 },
  ];

  const [activeRadio, setActiveRadio] = useState(languageTypes[1].index);

  async function onSelectedLanguage() {
    const languageInd = activeRadio;

    if (Platform.OS === "android") {
      const localization = await Localization.getLocalizationAsync();
      localization.locale = languageTypes[languageInd].code;
      await AsyncStorage.setItem(
        "app-language",
        languageTypes[languageInd].code
      );
      try {
        Updates.reloadAsync();
      } catch (error) {
        console.log("err", error);
      }
    }
  }

  return (
    <Modal
      onBackButtonPress={props.hideModal}
      onBackdropPress={props.hideModal}
      isVisible={props.modalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <TextDefault bold H4>
              {i18n.t("changePassword")}
            </TextDefault>
          </View>

          <View style={{ ...alignment.MTsmall }}>
            <TextField
              secureTextEntry
              error={oldPasswordError}
              label="Current Password"
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.errorColor}
              tintColor={colors.tagColor}
              labelTextStyle={{ fontSize: scale(12) }}
              onChangeText={setOldPassword}
              onBlur={() => {
                setOldPasswordError(!oldPassword ? "Password is required" : "");
              }}
            />
          </View>
          <View style={{ ...alignment.MTmedium }}>
            <TextField
              secureTextEntry
              error={newPasswordError}
              label="New Password"
              labelFontSize={scale(12)}
              fontSize={scale(12)}
              labelHeight={10}
              textColor={colors.fontMainColor}
              baseColor={colors.fontSecondColor}
              errorColor={colors.errorColor}
              tintColor={colors.tagColor}
              labelTextStyle={{ fontSize: scale(12) }}
              onChangeText={setNewPassword}
              onBlur={() => {
                setNewPasswordError(!newPassword ? "Password is required" : "");
              }}
            />
          </View>

          <TouchableOpacity
            // disabled={loading}
            // onPress={() => {
            //   const newPasswordError =
            //     newPassword === "" ? "Password is required" : "";
            //   const oldPasswordError =
            //     oldPassword === "" ? "Password is required" : "";
            //   setNewPasswordError(newPasswordError);
            //   setOldPasswordError(oldPasswordError);

            //   if (
            //     oldPasswordError.length === 0 &&
            //     newPasswordError.length === 0
            //   ) {
            //     mutate({ variables: { oldPassword, newPassword } });
            //   }
            // }}
            onPress={onSelectedLanguage}
            style={[styles.btnContainer]}
          >
            <TextDefault textColor={colors.primary} bold H5>
              {i18n.t("apply")}
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

ChangePassword.propTypes = {
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool.isRequired,
};
export default ChangePassword;
