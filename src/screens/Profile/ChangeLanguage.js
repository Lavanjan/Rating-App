import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
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
import { RadioButton } from "../../components";

function ChangeLanguage(props) {
  const styles = useStyle();
  const { colors } = useTheme();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [loading, setloading] = useState(false);

  const languageTypes = [
    { value: "English", code: "en", index: 0 },
    { value: "español", code: "sp", index: 1 },
  ];

  const [activeRadio, setActiveRadio] = useState(languageTypes[0].index);

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

  useEffect(() => {
    selectedLanguageFunc();
  }, []);

  async function selectedLanguageFunc() {
    const lang = await AsyncStorage.getItem("app-language");
    if (lang) {
      const defLang = languageTypes.findIndex((el) => el.code === lang);
      const langName = languageTypes[defLang].value;
      setActiveRadio(defLang);
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
              {i18n.t("changeLanguage")}
            </TextDefault>
          </View>

          <View style={[styles.languageContainer]}>
            {languageTypes.map((item, index) => (
              <TouchableOpacity
                activeOpacity={0.7}
                key={index}
                onPress={() => setActiveRadio(item.index)}
                style={[styles.radioContainer]}
              >
                <TextDefault
                  numberOfLines={1}
                  textColor={
                    activeRadio === item.index
                      ? colors.fontMainColor
                      : colors.placeHolderColor
                  }
                  bold
                  H5
                  style={alignment.MLsmall}
                >
                  {item.value}
                </TextDefault>
                <RadioButton
                  animation={"bounceIn"}
                  size={13}
                  outerColor={colors.tagColor}
                  innerColor={colors.radioColor}
                  isSelected={activeRadio === item.index}
                  onPress={() => setActiveRadio(item.index)}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
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

ChangeLanguage.propTypes = {
  hideModal: PropTypes.func,
  modalVisible: PropTypes.bool.isRequired,
};
export default ChangeLanguage;
