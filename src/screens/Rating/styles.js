import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { THEME } from "../../theme";
import { alignment } from "../../utils/alignment";
import { moderateScale, scale, verticalScale } from "../../utils/scaling";

const useStyle = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      ...alignment.PLlarge,
      ...alignment.PRlarge,
    },
    header: {
      ...alignment.MTmedium,
    },
    overallRating: {
      backgroundColor: THEME.colors.secondplaceHolderColor,
      ...alignment.Psmall,
      borderRadius: moderateScale(12),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    leftContainer: {
      flexDirection: "column",
      width: "50%",
    },
    overallRatingText: {
      flexDirection: "row",
      alignItems: "center",
    },
    ratingContainer: {
      backgroundColor: THEME.colors.reviewBackground,
      ...alignment.Psmall,
    },
    rightContainer: {
      flexDirection: "column",
      width: "50%",
      alignItems: "center",
    },
    addReview: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    addReviewText: {
      ...alignment.MLsmall,
    },
    reviewIcon: {
      flexDirection: "row",
      alignItems: "center",
    },
    userReview: {
      ...alignment.MTmedium,
    },

    // add rating
    imgResponsive: {
      width: scale(150),
      height: scale(150),
      borderRadius: moderateScale(200),
      alignSelf: "center",
    },
    serviceImage: {
      width: scale(120),
      height: scale(120),
      borderRadius: moderateScale(200),
      alignSelf: "center",
    },
    loadingView: {
      backgroundColor: THEME.colors.background,
      width: "100%",
      height: "100%",
    },
    addRatingContainer: {
      ...alignment.PLlarge,
      ...alignment.PRlarge,
      backgroundColor: THEME.colors.white,
    },
    ratingContainer: {
      backgroundColor: THEME.colors.secondplaceHolderColor,
      ...alignment.Psmall,
    },
    addratingContainer: {
      backgroundColor: THEME.colors.white,
      ...alignment.Psmall,
    },
    input: {
      backgroundColor: THEME.colors.secondplaceHolderColor,
      ...alignment.Pmedium,
      textAlignVertical: "top",
      borderRadius: moderateScale(12),
    },
    inputLabel: {
      ...alignment.MBsmall,
    },
    submitButtonStyle: {
      height: moderateScale(45),
      width: "90%",
      backgroundColor: THEME.colors.primary,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 32,
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowColor: THEME.colors.primary,
      ...alignment.MBmedium,
    },
    addReviewButton: {
      height: moderateScale(45),
      width: "100%",
      backgroundColor: THEME.colors.primary,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowColor: THEME.colors.primary,
      ...alignment.MBmedium,
    },
    tryAgain: {
      height: moderateScale(45),
      width: "80%",
      backgroundColor: THEME.colors.ratingColor,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowColor: THEME.colors.primary,
      ...alignment.MBmedium,
    },
    disabledsubmitButtonStyle: {
      height: moderateScale(45),
      width: "90%",
      backgroundColor: THEME.colors.placeHolderColor,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 32,
      shadowRadius: 8,
      shadowOpacity: 0.3,
      shadowColor: THEME.colors.primary,
      ...alignment.Bmedium,
    },
    loginTextStyle: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    serviceName: {
      ...alignment.MTsmall,
    },
    starContainer: {
      ...alignment.MTmedium,
      justifyContent: "center",
      alignItems: "center",
    },
    averageRating: {
      fontSize: scale(45),
    },
    placeholder: {
      ...alignment.MTxSmall,
      ...alignment.MBxSmall,
      backgroundColor: "#fff",
      borderRadius: moderateScale(8),
    },
    noResult: {
      width: scale(150),
      height: scale(150),
      alignSelf: "center",
    },
    noResultContainer: {
      justifyContent: "center",
      alignItems: "center",
      ...alignment.MTlarge,
    },
  });
};

export { useStyle };
