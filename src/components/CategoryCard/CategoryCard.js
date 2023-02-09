import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import EnategaImage from "../EnategaImage/EnategaImage";
import useStyle from "./styles";
import TextDefault from "../Text/TextDefault/TextDefault";
import { CustomIcon } from "../CustomIcon";
import { THEME } from "../../theme";
import { ICONS_NAME, SERVICE_TYPE } from "../../utils/constants";
import { scale } from "../../utils/scaling";
import { FontAwesome } from "@expo/vector-icons";
import i18n from "../../../i18n";

const CategoryCard = (props) => {
  const { onPress, title, address, star, imageType } = props;
  const styles = useStyle();

  const serviceImages = useMemo(() => {
    if (imageType === SERVICE_TYPE.Location) {
      return require("../../assets/images/location.jpg");
    } else if (imageType === SERVICE_TYPE.FoodService) {
      return require("../../assets/images/food.jpg");
    } else if (imageType === SERVICE_TYPE.RoomService) {
      return require("../../assets/images/roomService.jpg");
    } else if (imageType === SERVICE_TYPE.Things) {
      return require("../../assets/images/things.jpg");
    } else if (imageType === SERVICE_TYPE.Cleaning) {
      return require("../../assets/images/cleaning.jpg");
    } else if (imageType === SERVICE_TYPE.FrontStaff) {
      return require("../../assets/images/front-staff.jpg");
    } else if (imageType === SERVICE_TYPE.Guide) {
      return require("../../assets/images/guide.jpg");
    } else if (imageType === SERVICE_TYPE.Gym) {
      return require("../../assets/images/gym.jpeg");
    } else if (imageType === SERVICE_TYPE.Price) {
      return require("../../assets/images/price.jpg");
    } else if (imageType === SERVICE_TYPE.Spa) {
      return require("../../assets/images/spa.jpg");
    }
  }, [props]);

  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View>
        <EnategaImage
          imgStyle={styles.imgResponsive}
          imgSource={serviceImages}
          spinnerProps={{ style: styles.loadingView }}
        />
      </View>
      <View style={styles.descriptionContainer}>
        <TextDefault numberOfLines={2} H5 medium>
          {title}
        </TextDefault>
        <View style={styles.ratingContainer}>
          <FontAwesome
            name="star"
            size={scale(15)}
            color={THEME.colors.primary}
          />
          <TextDefault style={styles.ratingText} bold>
            {star}
          </TextDefault>
        </View>
        <TextDefault numberOfLines={2} textColor={THEME.colors.primary} bold>
          {i18n.t("addReview")}
        </TextDefault>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
