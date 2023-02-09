import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Font from "expo-font";
import { THEME } from "./src/theme";
import { useEffect, useState } from "react";
import { exitAlert } from "./src/utils/androidBackButton";
import i18n from "./i18n";
import AnimatedSplash from "./src/screens/AnimatedSplash/AnimatedSplash";
import AppContainer from "./src/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import LoginProvider from "./src/context/AuthProvider/AuthProvider";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [token, setToken] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.log(e);
      }
    })();
    loadAppData();
  }, []);

  const loadAppData = async () => {
    await i18n.initAsync();
    await Font.loadAsync({
      Poppin300: require("./src/assets/font/Poppin/Poppins-Light.ttf"),
      Poppin400: require("./src/assets/font/Poppin/Poppins-Regular.ttf"),
      Poppin500: require("./src/assets/font/Poppin/Poppins-Medium.ttf"),
      Poppin600: require("./src/assets/font/Poppin/Poppins-SemiBold.ttf"),
      Poppin700: require("./src/assets/font/Poppin/Poppins-Bold.ttf"),
      icomoon: require("./src/assets/font/icomoon.ttf"),
    });

    BackHandler.addEventListener("hardwareBackPress", exitAlert);
    setFontLoaded(true);
    await SplashScreen.hideAsync();
  };
  if (fontLoaded) {
    return (
      <View style={styles.flex}>
        <StatusBar
          translucent
          backgroundColor={"transparent"}
          barStyle={"dark-content"}
        />
        <AnimatedSplash image={require("./assets/splash.png")}>
          <LoginProvider>
            <AppContainer />
          </LoginProvider>
        </AnimatedSplash>
        <FlashMessage duration={2000} position="center" />
      </View>
    );
  } else {
    return (
      <View style={[styles.flex, styles.mainContainer]}>
        <ActivityIndicator size="large" color={THEME.colors.spinnerColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
