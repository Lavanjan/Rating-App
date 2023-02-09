import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { FilledTextField } from "rn-material-ui-textfield";
import i18n from "../../../i18n";
import {
  LeftButton,
  LoginScreen,
  RegistrationHeader,
  Spinner,
  TextDefault,
  WrapperView,
} from "../../components";
import { FlashMessage } from "../../components/FlashMessage/FlashMessage";
import { alignment } from "../../utils/alignment";
import { scale, verticalScale } from "../../utils/scaling";
import useStyle from "./styles";
import { THEME } from "../../theme";
import EnategaImage from "../../components/EnategaImage/EnategaImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocialButton from "../../components/SocialButton/SocialButton";
import SignupScreen from "../../components/Signup/Signup";
import {
  ICONS_NAME,
  NAVIGATION_SCREEN,
  SYSTEM_URL,
} from "../../utils/constants";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { showMessage } from "react-native-flash-message";

export default function Signup() {
  const styles = useStyle();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
    });
  }, []);

  const isDisabled = () => {
    if (loading) {
      return true;
    } else if (
      (username === "") |
      (password === "") |
      (email === "") |
      (confirmPassword === "")
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSignup = async () => {
    setloading(true);
    const payload = {
      name: username,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      user_level_id: "0", //customer level
    };

    await axios
      .post(`${SYSTEM_URL.API}/api/auth/register`, JSON.stringify(payload), {
        headers: { "Content-Type": "application/json" },
      })
      .then(
        (data) => {
          if (data?.data?.user?.id) {
            navigation.navigate(NAVIGATION_SCREEN.Login);
          } else {
            FlashMessage({
              message: JSON.stringify(data.data.errors),
            });
          }
          setloading(false);
        },
        (err) => {
          setloading(false);
          console.log(err);
        }
      );
  };

  return (
    <WrapperView>
      <SignupScreen
        loading={loading}
        disabled={isDisabled()}
        onSignupPress={handleSignup}
        onUsernameChange={(value) => {
          setUsername(value);
        }}
        onEmailChange={(value) => {
          setEmail(value);
        }}
        onPasswordChange={(value) => {
          setPassword(value);
        }}
        onCpasswordChange={(value) => {
          setconfirmPassword(value);
        }}
      >
        <SocialButton text={i18n.t("continueWithGoogle")} onPress={() => {}} />
      </SignupScreen>
    </WrapperView>
  );
}
