import { View, Text } from "react-native";
import React from "react";
import EnategaImage from "../EnategaImage/EnategaImage";
import TextDefault from "../Text/TextDefault/TextDefault";
import ProgressBar from "../ProgressBar/ProgressBar";
import { scale } from "../../utils/scaling";
import { Rating } from "react-native-ratings";
import { THEME } from "../../theme";
import { useStyle } from "./styles";
import StarRating from "../StarRating/StarRating";
import moment from "moment";

const ReviewCard = ({ props }) => {
  console.log({ props });
  const { username, comment, rate, created_at } = props;
  const styles = useStyle();
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <View style={styles.nameSubContainer}>
          <EnategaImage
            imgStyle={styles.imgResponsive}
            imgSource={require("../../assets/images/user.png")}
            spinnerProps={{ style: styles.loadingView }}
          />
          <TextDefault style={styles.nameText} numberOfLines={1} medium>
            {username}
          </TextDefault>
        </View>
        <View style={styles.ratingSubnContainer}>
          <StarRating rating={rate} size={13} />
          <TextDefault style={styles.nameText} numberOfLines={1} light>
            {moment(created_at).format("YYYY-MM-DD")}
          </TextDefault>
        </View>
      </View>
      <View>
        <TextDefault textColor={THEME.colors.fontMainColor}>
          {comment}
        </TextDefault>
      </View>
    </View>
  );
};

export default ReviewCard;
