import * as React from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import TextInput from "react-native-text-input-interactive";
/**
 * ? Local Imports
 */
import styles from "./styles";
import SocialButton from "../SocialButton/SocialButton";
import TextDefault from "../Text/TextDefault/TextDefault";
import i18n from "../../../i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const dummyFunction = () => {};

const SignupScreen = ({
  style,
  dividerStyle,
  loginTextStyle,
  loginButtonStyle,
  textInputContainerStyle,
  disableSocialButtons,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  onCpasswordChange,
  onFacebookPress = dummyFunction,
  children,
  textInputProps,
  onSignupPress,
  disabled,
  loading,
}) => {
  const [isVisible, setisVisible] = React.useState(false);
  const [isConfirmVisible, setisConfirmVisible] = React.useState(false);
  const LoginButton = () => (
    <TouchableOpacity
      style={[styles.loginButtonStyle, loginButtonStyle]}
      onPress={onSignupPress}
      disabled={disabled}
    >
      <TextDefault style={[styles.loginTextStyle, loginTextStyle]}>
        {loading ? i18n.t("loading") : i18n.t("createAccount")}
      </TextDefault>
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
    <KeyboardAwareScrollView>
      <View style={[styles.container, style]}>
        <StatusBar barStyle="dark-content" />
        <View style={[styles.textInputContainer, textInputContainerStyle]}>
          <View style={styles.input}>
            <TextInput
              placeholder={i18n.t("username")}
              onChangeText={onUsernameChange}
              {...textInputProps}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder={i18n.t("email")}
              onChangeText={onEmailChange}
              {...textInputProps}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              enableIcon={true}
              secureTextEntry={isVisible ? false : true}
              placeholder={i18n.t("password")}
              onChangeText={onPasswordChange}
              {...textInputProps}
              iconImageSource={
                isVisible
                  ? require("../../assets/images/view.png")
                  : require("../../assets/images/hidden.png")
              }
              onIconPress={() => setisVisible(!isVisible)}
            />
          </View>
          <View style={styles.input}>
            <TextInput
              enableIcon={true}
              secureTextEntry={isConfirmVisible ? false : true}
              placeholder={i18n.t("confirmPassword")}
              onChangeText={onCpasswordChange}
              {...textInputProps}
              iconImageSource={
                isConfirmVisible
                  ? require("../../assets/images/view.png")
                  : require("../../assets/images/hidden.png")
              }
              onIconPress={() => setisConfirmVisible(!isConfirmVisible)}
            />
          </View>
        </View>
        <LoginButton />
        <Divider />

        <View style={styles.socialLoginContainer}>
          {children || <DefaultSocialLoginButtons />}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignupScreen;
