import PropTypes from "prop-types";
import { showMessage } from "react-native-flash-message";
import { THEME } from "../../theme";
import { scale } from "../../utils/scaling";
import { textStyles } from "../../utils/textStyles";

export const FlashMessage = (props) => {
  showMessage({
    backgroundColor: THEME.colors.errorColor,
    message: props.message,
    type: "info",
    position: "bottom",
    titleStyle: {
      fontSize: scale(12),
      ...textStyles.Medium,
    },
  });
};
FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
