import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import {
  HorizontalBar,
  Placeholder,
  ProgressBar,
  ReviewCard,
  StarRating,
  TextDefault,
  WrapperView,
} from "../../components";
import { Rating } from "react-native-ratings";
import { THEME } from "../../theme";
import { scale, verticalScale } from "../../utils/scaling";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../../../i18n";
import {
  NAVIGATION_SCREEN,
  SERVICE_TYPE,
  SYSTEM_URL,
} from "../../utils/constants";
import { useStyle } from "./styles";
import { orderBy } from "lodash";
import EnategaImage from "../../components/EnategaImage/EnategaImage";
import ReactNativeLottie from "lottie-react-native";
import { isEmpty } from "validate.js";
import { alignment } from "../../utils/alignment";

const ViewRatings = React.memo(() => {
  const initialRatingCount = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  const initialRatingPercentage = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [ratingAssets, setratingAssets] = useState({
    ratingCount: initialRatingCount,
    ratingPercentage: initialRatingPercentage,
    averageRating: 0,
  });
  const route = useRoute();
  const { serviceItem, branchId } = route.params;

  const { width } = Dimensions.get("window");

  const NO_RESULT = require("../../assets/images/no-results.png");

  const styles = useStyle();

  useEffect(() => {
    getReviewData();
  }, []);

  const serviceImages = useMemo(() => {
    if (serviceItem?.imageType === SERVICE_TYPE.Location) {
      return require("../../assets/images/location.jpg");
    } else if (serviceItem?.imageType === SERVICE_TYPE.FoodService) {
      return require("../../assets/images/location.jpg");
    } else if (serviceItem?.imageType === SERVICE_TYPE.RoomService) {
      return require("../../assets/images/roomService.jpg");
    } else if (serviceItem?.imageType === SERVICE_TYPE.Things) {
      return require("../../assets/images/things.jpg");
    }
  }, [serviceItem]);

  const getReviewData = () => {
    setloading(true);
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      `${SYSTEM_URL.API}/api/getReviews/${serviceItem?.id}/${branchId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(
        async (res) => {
          console.log({ res });
          setdata(res);
          const totalRating = await res.reduce(
            (sum, rate) => sum + parseInt(rate.rate),
            0
          );
          const ratingCount = await res
            .map((x) => parseInt(x.rate))
            .reduce((acc, rate) => {
              acc[rate] = (acc[rate] || 0) + 1;
              return acc;
            }, {});
          let ratingPercentage = {};
          await Object.keys(ratingCount).forEach((rate) => {
            ratingPercentage[rate] = (ratingCount[rate] / res.length) * 1;
          });
          let averageRating = await (totalRating / res.length).toFixed(1);
          await setratingAssets({
            ratingCount: ratingCount,
            ratingPercentage: ratingPercentage,
            averageRating: averageRating,
          });
          await setloading(false);
        },
        (err) => {
          setloading(false);
        }
      );
  };
  const header = () => {
    return (
      <>
        <View style={styles.overallRating}>
          <View>
            <EnategaImage
              resizeMode="contain"
              imgStyle={styles.serviceImage}
              imgSource={serviceImages}
              spinnerProps={{ style: styles.loadingView }}
            />
          </View>
          <View style={styles.rightContainer}>
            <TextDefault textColor={THEME.colors.fontSecondColor}>
              {i18n.t("basedOnReviews")} {data.length} {i18n.t("reviews")}
            </TextDefault>
            <View>
              <StarRating rating={ratingAssets.averageRating} />
            </View>

            <View style={styles.overallRatingText}>
              <TextDefault style={styles.averageRating} medium>
                {ratingAssets.averageRating}
              </TextDefault>
              <TextDefault H5 medium>
                /5
              </TextDefault>
            </View>
          </View>
        </View>

        <HorizontalBar />
        <TextDefault H5 bold>
          {i18n.t("userReviews")}
        </TextDefault>
      </>
    );
  };

  const memoziedHeader = memo(header);

  return (
    <WrapperView>
      <View style={[styles.container]}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate(NAVIGATION_SCREEN.AddRatings, {
              serviceItem,
              branchId,
            })
          }
          style={styles.addReviewButton}
        >
          <TextDefault style={styles.loginTextStyle}>
            {i18n.t("addReview")}
          </TextDefault>
        </TouchableOpacity>
        <View style={styles.userReview}>
          {loading ? (
            [1, 2, 3].map((x) => (
              <Placeholder
                key={x}
                width={width}
                height={verticalScale(150)}
                style={styles.placeholder}
              />
            ))
          ) : isEmpty(data) ? (
            <View style={styles.noResultContainer}>
              <EnategaImage
                resizeMode="contain"
                imgStyle={styles.noResult}
                imgSource={NO_RESULT}
                spinnerProps={{ style: styles.loadingView }}
              />
              <TextDefault style={{ ...alignment.MTmedium }} H4 medium center>
                {i18n.t("notFound")}
              </TextDefault>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={getReviewData}
                style={styles.tryAgain}
              >
                <TextDefault style={styles.loginTextStyle}>
                  {i18n.t("tryAgain")}
                </TextDefault>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getReviewData}
                />
              }
              ListHeaderComponent={memoziedHeader}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              data={orderBy(data, ["created_at"], ["desc"])}
              renderItem={({ item, index }) => (
                <ReviewCard key={index} props={item} />
              )}
            />
          )}
        </View>
      </View>
    </WrapperView>
  );
});

export default ViewRatings;
