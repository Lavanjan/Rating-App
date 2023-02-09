import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useRoute, useTheme } from "@react-navigation/native";
import {
  HorizontalBar,
  StarRating,
  TextDefault,
  WrapperView,
} from "../../components";
import EnategaImage from "../../components/EnategaImage/EnategaImage";
import { SERVICE_TYPE, SYSTEM_URL } from "../../utils/constants";
import { AirbnbRating, Rating } from "react-native-ratings";
import { scale } from "../../utils/scaling";
import { THEME } from "../../theme";
import i18n from "../../../i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Spinner from "../../components/Spinner/Spinner";
import { useStyle } from "./styles";
import { alignment } from "../../utils/alignment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AddRating = () => {
  const route = useRoute();
  const { serviceItem, branchId } = route.params;
  const styles = useStyle();
  const { colors } = useTheme();

  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");
  const [loading, setloading] = useState(false);
  // const [userData, setuserData] = useState();

  const isValid = () => {
    if (rating === 0 || comment === "") {
      return true;
    } else {
      return false;
    }
  };

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

  const submitReview = async () => {
    setloading(true);
    const userData = await AsyncStorage.getItem("user");
    const currentUser = JSON.parse(userData);
    const payload = {
      userId: currentUser?.id,
      rate: rating,
      comment: comment,
      serviceId: serviceItem.id,
      branchId: branchId,
      username: currentUser?.name,
    };

    await axios
      .post(`${SYSTEM_URL.API}/api/review`, payload, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
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
              const totalRating = await res.reduce(
                (sum, rate) => sum + parseInt(rate.rate),
                0
              );

              let averageRating = await (totalRating / res.length).toFixed(1);
              const payload = {
                averageRating: averageRating,
              };
              await axios
                .put(
                  `${SYSTEM_URL.API}/api/updateAverageRating/${serviceItem?.id}`,
                  payload,
                  {
                    headers: { "Content-Type": "application/json" },
                  }
                )
                .then((res) => {
                  console.log({ res });
                  setrating(0);
                  setcomment("");
                  setloading(false);
                });
            },
            (err) => {
              setrating(0);
              setcomment("");
              setloading(false);
            }
          );
      })
      .catch((err) => {
        console.log({ err });
        setrating(0);
        setcomment("");
        setloading(false);
      });
  };

  const ratingCompleted = (value) => {
    setrating(value);
  };

  return (
    <WrapperView>
      <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.addRatingContainer}>
            <EnategaImage
              resizeMode="contain"
              imgStyle={styles.imgResponsive}
              imgSource={serviceImages}
              spinnerProps={{ style: styles.loadingView }}
            />
            <View style={styles.serviceName}>
              <TextDefault numberOfLines={2} H3 medium center bolder>
                {serviceItem?.name}
              </TextDefault>
            </View>
            <View style={styles.addratingContainer}>
              <TextDefault center>{i18n.t("yourOverallRating")}</TextDefault>

              <View style={styles.starContainer}>
                <StarRating
                  rating={rating}
                  handleRating={(value) => {
                    ratingCompleted(value);
                  }}
                  size={28}
                />
              </View>
            </View>
            <HorizontalBar />
            <View>
              <TextDefault style={styles.inputLabel} bold>
                {i18n.t("commentPlaceholder")}
              </TextDefault>
              <TextInput
                onChangeText={setcomment}
                multiline
                numberOfLines={6}
                placeholder="What is your review?"
                style={styles.input}
                value={comment}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <TouchableOpacity
        onPress={submitReview}
        disabled={isValid()}
        style={[
          isValid()
            ? styles.disabledsubmitButtonStyle
            : styles.submitButtonStyle,
        ]}
      >
        {loading ? (
          <Spinner />
        ) : (
          <TextDefault style={styles.loginTextStyle}>
            {i18n.t("submit")}
          </TextDefault>
        )}
      </TouchableOpacity>
    </WrapperView>
  );
};

export default AddRating;
