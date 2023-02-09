import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { TextField } from "rn-material-ui-textfield";
import { async } from "validate.js";
import i18n from "../../../i18n";
import {
  FlashMessage,
  LeftButton,
  RightButton,
  TextDefault,
  WrapperView,
} from "../../components";
import EnategaImage from "../../components/EnategaImage/EnategaImage";
import { useLogin } from "../../context/AuthProvider/AuthProvider";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { ICONS_NAME, NAVIGATION_SCREEN } from "../../utils/constants";
import { moderateScale, scale } from "../../utils/scaling";
import { textStyles } from "../../utils/textStyles";
import ChangeLanguage from "./ChangeLanguage";
import ChangePassword from "./ChangePassword";
import useStyle from "./styles";

function Profile() {
  const refName = useRef();
  const route = useRoute();
  const styles = useStyle();
  const refPhone = useRef(null);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { setIsLoggedIn, setProfile } = useLogin();

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [toggleView, setToggleView] = useState(true);
  const [modelVisible, setModalVisible] = useState(false);
  const [languageModel, setlanguageModel] = useState(false);
  const [userData, setuserData] = useState({
    name: "Your username",
    email: "Your email",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
    });
  }, [navigation, toggleView]);

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user");
      console.log(JSON.parse(userData));
      setuserData(JSON.parse(userData));
    })();
  }, []);

  const signout = async () => {
    Alert.alert("Confirm exit", "Do you want to quit the app?", [
      { text: "CANCEL", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          await setIsLoggedIn(false);
        },
      },
    ]);
    return true;
  };

  function changePasswordTab() {
    return (
      <View style={styles.containerInfo}>
        <TextField
          label={i18n.t("username")}
          ref={refName}
          editable={false}
          defaultValue={userData?.name}
          labelFontSize={scale(12)}
          fontSize={scale(12)}
          style={{
            ...textStyles.Medium,
            ...textStyles.H5,
            color: colors.fontMainColor,
          }}
          maxLength={20}
          textColor={colors.fontMainColor}
          baseColor={colors.fontSecondColor}
          errorColor={colors.errorColor}
          tintColor={!nameError ? colors.tagColor : "red"}
          labelTextStyle={{
            ...textStyles.Normal,
            paddingTop: scale(1),
          }}
          error={nameError}
        />
        <View style={{ ...alignment.MTxSmall }}></View>
        <TextField
          keyboardType={"email-address"}
          label={i18n.t("email")}
          style={{
            ...textStyles.Medium,
            ...textStyles.H5,
            color: colors.fontMainColor,
          }}
          editable={false}
          defaultValue={userData?.email}
          labelFontSize={scale(12)}
          fontSize={scale(12)}
          textColor={colors.fontMainColor}
          baseColor={colors.fontSecondColor}
          errorColor={colors.errorColor}
          tintColor={colors.tagColor}
          labelTextStyle={{
            ...textStyles.Normal,
            paddingTop: scale(1),
          }}
        />
        <View style={{ ...alignment.MTxSmall }}></View>
        {/* <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.changePassword}
        >
          <TextDefault>{i18n.t("changePassword")}</TextDefault>
          <MaterialCommunityIcons
            name={"pencil"}
            size={20}
            color={colors.tagColor}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => setlanguageModel(true)}
          style={styles.changePassword}
        >
          <TextDefault>{i18n.t("changeLanguage")}</TextDefault>
          <MaterialCommunityIcons
            name={"pencil"}
            size={20}
            color={colors.tagColor}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await signout();
          }}
          style={styles.signoutButton}
        >
          <TextDefault H5 medium textColor={THEME.colors.errorColor}>
            {i18n.t("signout")}
          </TextDefault>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <WrapperView>
      <ChangePassword
        modalVisible={modelVisible}
        hideModal={() => {
          setModalVisible(false);
        }}
      />

      <ChangeLanguage
        modalVisible={languageModel}
        hideModal={() => {
          setlanguageModel(false);
        }}
      />

      <View style={styles.formContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={styles.flex}
        >
          <ScrollView style={styles.flex}>
            <View style={[styles.formSubContainer]}>
              <View
                style={{
                  width: scale(100),
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                  top: moderateScale(-50),
                }}
              >
                <View style={styles.imgContainer}>
                  <EnategaImage
                    imgStyle={styles.imgResponsive}
                    imgSource={require("../../assets/images/user.png")}
                    spinnerProps={{ style: styles.loadingView }}
                  />
                </View>
              </View>
              {toggleView ? (
                changePasswordTab()
              ) : (
                <View style={styles.containerInfo}>
                  <View>
                    <View style={{ margin: scale(0) }}></View>
                    <TextField
                      label={i18n.t("name")}
                      ref={refName}
                      defaultValue={userData?.name}
                      style={{
                        ...textStyles.Bold,
                        ...textStyles.H5,
                        color: colors.fontMainColor,
                      }}
                      labelFontSize={scale(12)}
                      fontSize={scale(12)}
                      maxLength={20}
                      textColor={colors.fontMainColor}
                      baseColor={colors.fontSecondColor}
                      errorColor={colors.errorColor}
                      tintColor={!nameError ? colors.buttonBackground : "red"}
                      labelTextStyle={{
                        ...textStyles.Normal,
                        paddingTop: scale(1),
                      }}
                      error={nameError}
                    />
                    <View style={{ ...alignment.MTxSmall }}></View>
                    <TextField
                      keyboardType={"email-address"}
                      label={i18n.t("email")}
                      style={{
                        ...textStyles.Bold,
                        ...textStyles.H5,
                        color: colors.fontMainColor,
                      }}
                      editable={false}
                      // defaultValue={profile.email}
                      labelFontSize={scale(12)}
                      fontSize={scale(12)}
                      textColor={colors.fontMainColor}
                      baseColor={colors.fontSecondColor}
                      errorColor={colors.errorColor}
                      tintColor={colors.buttonBackground}
                      labelTextStyle={{
                        ...textStyles.Normal,
                        paddingTop: scale(1),
                      }}
                    />
                    <View style={{ ...alignment.MTxSmall }}></View>
                    <TextField
                      keyboardType={"phone-pad"}
                      label={i18n.t("phone")}
                      style={{
                        ...textStyles.Bold,
                        ...textStyles.H5,
                        color: colors.fontMainColor,
                      }}
                      ref={refPhone}
                      // defaultValue={profile.phone}
                      labelFontSize={scale(12)}
                      fontSize={scale(12)}
                      maxLength={15}
                      textColor={colors.fontMainColor}
                      baseColor={colors.fontSecondColor}
                      errorColor={colors.errorColor}
                      tintColor={!phoneError ? colors.buttonBackground : "red"}
                      labelTextStyle={{
                        ...textStyles.Normal,
                        paddingTop: scale(1),
                      }}
                      error={phoneError}
                    />
                  </View>

                  <TouchableOpacity
                    disabled={loadingMutation}
                    activeOpacity={0.7}
                    style={styles.saveContainer}
                  >
                    <TextDefault
                      textColor={colors.buttonText}
                      H5
                      bold
                      style={[alignment.MTsmall, alignment.MBsmall]}
                    >
                      {i18n.t("saveBtn")}
                    </TextDefault>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignSelf: "center", ...alignment.MTsmall }}
                    activeOpacity={0.7}
                  >
                    <TextDefault
                      textColor={colors.fontMainColor}
                      H5
                      bold
                      style={[alignment.MTsmall, alignment.MBsmall]}
                    >
                      {"Cancel"}
                    </TextDefault>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TextDefault
              center
              textColor={colors.fontSecondColor}
              style={alignment.MBsmall}
            >
              All rights are reserved by Lavanjan
            </TextDefault>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </WrapperView>
  );
}

export default Profile;
