import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { Platform } from "react-native";
import { en } from "./translations/en";
import { sp } from "./translations/sp";

i18n.initAsync = async () => {
  i18n.fallbacks = true;
  i18n.translations = { en, sp };
  if (Platform.OS === "android") {
    const lang = await AsyncStorage.getItem("app-language");
    i18n.locale = lang || "en";
  } else {
    i18n.locale = Localization.locale;
  }
};

export default i18n;
