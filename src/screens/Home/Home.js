import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import TextDefault from "../../components/Text/TextDefault/TextDefault";
import { styles } from "./styles";
import { HomeHeader, Placeholder, WrapperView } from "../../components";
import { useNavigation, useTheme } from "@react-navigation/native";
import i18n from "../../../i18n";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { NAVIGATION_SCREEN, SYSTEM_URL } from "../../utils/constants";
import { verticalScale } from "../../utils/scaling";

const Home = () => {
  const [data, setdata] = useState([]);
  const [serviceData, setserviceData] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedBranch, setselectedBranch] = useState();

  const { colors } = useTheme();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");

  const header = () => {
    return (
      <View style={styles.header}>
        <TextDefault H3 bold>
          {i18n.t("services")}
        </TextDefault>
      </View>
    );
  };
  const memoziedHeader = memo(header);

  useEffect(() => {
    getBranchData();
    getServiceData();
  }, []);

  const getBranchData = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${SYSTEM_URL.API}/api/branches`, requestOptions)
      .then((response) => response.json())
      .then(
        async (data) => {
          setdata(data);
          setselectedBranch(data?.[0]);
          setloading(false);
        },
        (err) => {
          setloading(false);
        }
      );
  };

  const getServiceData = () => {
    setloading(true);

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${SYSTEM_URL.API}/api/getAll/service`, requestOptions)
      .then((response) => response.json())
      .then(
        async (data) => {
          console.log({ data });
          setserviceData(data);
          setloading(false);
        },
        (err) => {
          setloading(false);
        }
      );
  };

  const getChildData = (data) => {
    setselectedBranch(data);
    console.log(data);
  };

  return (
    <WrapperView>
      <SafeAreaView style={[styles.container]}>
        <HomeHeader
          selectedBranch={selectedBranch}
          data={data}
          getChildData={getChildData}
        />

        {loading ? (
          <View style={styles.placeholderContainer}>
            {[1, 2, 3, 4].map((x) => (
              <Placeholder
                key={x}
                width={width - 30}
                height={verticalScale(120)}
                style={styles.placeholder}
              />
            ))}
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getServiceData} />
            }
            ListHeaderComponent={memoziedHeader}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={serviceData}
            ListHeaderComponentStyle={styles.listHeader}
            keyExtractor={(item) => `service${item.id}`}
            renderItem={({ item, index }) => (
              <CategoryCard
                key={index}
                onPress={() =>
                  navigation.navigate(NAVIGATION_SCREEN.ViewRatings, {
                    serviceItem: item,
                    branchId: selectedBranch?.id,
                  })
                }
                title={item.name}
                star={item.averageRating}
                imageType={item.imageType}
              />
            )}
          />
        )}
      </SafeAreaView>
    </WrapperView>
  );
};

export default Home;
