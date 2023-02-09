import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import i18n from "../../../i18n";
import {
  FlashMessage,
  LoginScreen,
  Spinner,
  TextDefault,
  WrapperView,
} from "../../components";
import useStyle from "./styles";
import { THEME } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SocialButton from "../../components/SocialButton/SocialButton";
import { NAVIGATION_SCREEN, SYSTEM_URL } from "../../utils/constants";
import { useLogin } from "../../context/AuthProvider/AuthProvider";

export default function Login() {
  const styles = useStyle();
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setloading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");

  const inset = useSafeAreaInsets();
  const { setIsLoggedIn, setProfile } = useLogin();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
    });
  }, []);

  function validateCredentials() {
    let result = true;
    setEmailError(null);
    setPasswordError(null);

    if (!email) {
      setEmailError("Email/Phone is required");
      result = false;
    } else {
      const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
      const phoneRegex = /^[+]\d{6,15}$/;
      if (emailRegex.test(email) !== true && phoneRegex.test(email) !== true) {
        setEmailError("Invalid Email/Phone");
        result = false;
      }
    }
    if (!password) {
      setPasswordError("Password is required");
      result = false;
    }
    return result;
  }

  function renderLoginAction() {
    return (
      <TouchableOpacity
        style={styles.loginBtn}
        activeOpacity={0.7}
        onPress={async () => {
          const user = {
            email: email,
            password: password,
            type: "default",
          };
          if (validateCredentials()) {
            mutateLogin(user);
          }
        }}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ flex: 1, justifyContent: "center" }}
            color={THEME.colors.buttonText}
          />
        ) : (
          <TextDefault bold>{i18n.t("loginBtn")}</TextDefault>
        )}
      </TouchableOpacity>
    );
  }

  const handleSignin = async () => {
    setloading(true);
    const payload = {
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    fetch(`${SYSTEM_URL.API}/api/auth/login`, requestOptions)
      .then((response) => response.json())
      .then(
        async (data) => {
          if (data?.user?.id) {
            await setIsLoggedIn(true);
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            await AsyncStorage.setItem("token", data.access_token);
          } else {
            if (data?.error === "Unauthorized") {
              FlashMessage({
                message: "Unauthorized Access!",
              });
            } else if (data?.error === "Access Denied") {
              FlashMessage({
                message: "Access Denied!",
              });
            } else {
              FlashMessage({
                message: "Incorrect Username or Password!",
              });
            }
          }
          setloading(false);
        },
        (err) => {
          setloading(false);
          console.log({ err });
        }
      );
  };

  return (
    <WrapperView>
      <LoginScreen
        logoImageSource={require("../../assets/images/logo.png")}
        onLoginPress={handleSignin}
        onSignupPress={() => {
          navigation.navigate(NAVIGATION_SCREEN.Signup);
        }}
        onEmailChange={(email) => {
          setEmail(email);
        }}
        onPasswordChange={(password) => {
          setPassword(password);
        }}
        emailValue={email}
        passwordValue={password}
        loading={loading}
      >
        <SocialButton text={i18n.t("continueWithGoogle")} onPress={() => {}} />
      </LoginScreen>
    </WrapperView>
  );
}
