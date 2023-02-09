import * as React from "react";
import {
  Image,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import TextInput from "react-native-text-input-interactive";
/**
 * ? Local Imports
 */
import styles from "./styles";
import SocialButton from "../SocialButton/SocialButton";
import TextDefault from "../Text/TextDefault/TextDefault";
import i18n from "../../../i18n";
import { Ionicons } from "@expo/vector-icons";
import EnategaImage from "../EnategaImage/EnategaImage";

const dummyFunction = () => {};

const LoginScreen = ({
  style,
  dividerStyle,
  logoImageStyle,
  loginTextStyle,
  loginButtonStyle,
  signupTextStyle,
  signupStyle,
  textInputContainerStyle,
  disableDivider,
  logoImageSource,
  onLoginPress,
  disableSocialButtons,
  disablePasswordInput = false,
  loginButtonText = "Login",
  onSignupPress,
  onEmailChange,
  onPasswordChange,
  onFacebookPress = dummyFunction,
  disableSignup = false,
  children,
  textInputProps,
  emailValue,
  passwordValue,
  loading,
}) => {
  const [isVisible, setisVisible] = React.useState(false);
  const Logo = () => (
    <Image
      resizeMode="contain"
      source={logoImageSource}
      style={[styles.logoImageStyle, logoImageStyle]}
    />
  );

  const isValid = () => {
    if (emailValue === "" || passwordValue === "") {
      return true;
    } else {
      return false;
    }
  };

  const LoginButton = () => (
    <TouchableOpacity
      disabled={isValid()}
      style={[
        isValid() ? styles.disabledloginButtonStyle : styles.loginButtonStyle,
        loginButtonStyle,
      ]}
      onPress={onLoginPress}
    >
      <TextDefault style={[styles.loginTextStyle, loginTextStyle]}>
        {loading ? "Loading..." : loginButtonText}
      </TextDefault>
    </TouchableOpacity>
  );

  const SignUp = () => (
    <TouchableOpacity
      style={[styles.signupStyle, signupStyle]}
      onPress={onSignupPress}
    >
      <Text style={[styles.signupTextStyle, signupTextStyle]}>
        {i18n.t("createAccount")}
      </Text>
    </TouchableOpacity>
  );

  const Divider = () => <View style={[styles.dividerStyle, dividerStyle]} />;

  const DefaultSocialLoginButtons = () =>
    !disableSocialButtons ? (
      <>
        <SocialButton
          text="Continue with Facebook"
          textStyle={styles.facebookSocialButtonTextStyle}
          onPress={onFacebookPress}
        />
      </>
    ) : null;

  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="dark-content" />
      <Logo />
      <View style={[styles.textInputContainer, textInputContainerStyle]}>
        <TextInput
          placeholder={i18n.t("username")}
          onChangeText={onEmailChange}
          {...textInputProps}
          value={emailValue}
        />
        {!disablePasswordInput && (
          <View style={styles.passwordTextInputContainer}>
            <TextInput
              enableIcon={true}
              placeholder={i18n.t("password")}
              secureTextEntry={isVisible ? false : true}
              onChangeText={onPasswordChange}
              {...textInputProps}
              value={passwordValue}
              iconImageSource={
                isVisible
                  ? require("../../assets/images/view.png")
                  : require("../../assets/images/hidden.png")
              }
              onIconPress={() => setisVisible(!isVisible)}
            />
          </View>
        )}
      </View>
      <LoginButton />
      {!disableSignup && <SignUp />}
      {!disableDivider && <Divider />}
      <View style={styles.socialLoginContainer}>
        {children || <DefaultSocialLoginButtons />}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
