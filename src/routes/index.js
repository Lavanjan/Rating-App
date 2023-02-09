/* eslint-disable react/prop-types */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import Animated from "react-native-reanimated";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import i18n from "../../i18n";
import { LeftButton, TextDefault } from "../components";
import { useLogin } from "../context/AuthProvider/AuthProvider";
import { AddRating, Home, ViewRatings } from "../screens";
import Login from "../screens/Login/Login";
import Profile from "../screens/Profile/Profile";
import Signup from "../screens/Signup/Signup";
import { THEME } from "../theme";
import { ICONS_NAME, NAVIGATION_SCREEN } from "../utils/constants";
import navigationService from "./navigationService";
import screenOptions from "./screenOptions";
import styles from "./styles";

const NavigationStack = createStackNavigator();

function Auth({ style, OuterWindowSlide, InnerWindowSlide }) {
  return (
    <React.Fragment>
      <Animated.View
        style={[styles.outerView, style, { marginLeft: OuterWindowSlide }]}
      />
      <Animated.View
        style={[styles.innerView, style, { marginLeft: InnerWindowSlide }]}
      />
      <Animated.View style={[styles.animatedView, style]}>
        <NavigationStack.Navigator
          screenOptions={screenOptions({
            textColor: THEME.colors.headerTextColor,
          })}
        >
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Login}
            component={Login}
            options={{ headerShown: false }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Signup}
            component={Signup}
            options={{
              title: i18n.t("createAccount"),
            }}
          />
        </NavigationStack.Navigator>
      </Animated.View>
    </React.Fragment>
  );
}

function Main({ style, OuterWindowSlide, InnerWindowSlide }) {
  const { colors } = useTheme();

  return (
    <React.Fragment>
      <Animated.View
        style={[styles.outerView, style, { marginLeft: OuterWindowSlide }]}
      />
      <Animated.View
        style={[styles.innerView, style, { marginLeft: InnerWindowSlide }]}
      />
      <Animated.View style={[styles.animatedView, style]}>
        <NavigationStack.Navigator
          mode="modal"
          screenOptions={screenOptions({
            textColor: colors.headerTextColor,
          })}
        >
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Home}
            component={Home}
            options={{ headerShown: false }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.ViewRatings}
            component={ViewRatings}
            options={{
              title: i18n.t("ratings"),
              headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.AddRatings}
            component={AddRating}
            options={{
              title: i18n.t("addRating"),
              headerLeft: () => <LeftButton icon={ICONS_NAME.Back} />,
            }}
          />
          <NavigationStack.Screen
            name={NAVIGATION_SCREEN.Profile}
            component={Profile}
          />
        </NavigationStack.Navigator>
      </Animated.View>
    </React.Fragment>
  );
}

function AppContainer() {
  const { isLoggedIn } = useLogin();
  console.log({ isLoggedIn });
  const [token, settoken] = useState();
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      settoken(token);
    };
    loadToken();
  }, [isLoggedIn]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer
        ref={(ref) => {
          navigationService.setGlobalRef(ref);
        }}
      >
        {token || isLoggedIn ? <Main /> : <Auth />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppContainer;
