import { Typography } from "antd";
import PropTypes from "prop-types";
// End Imports
const { Text } = Typography;

const richStyle = {
  fontSize: "16px",
  fontWeight: 500,
};

const RichText = ({
  price,
  currency,
  decimalSeparator,
  thousandSeparator,
  style,
  ...restProps
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    decimalSeparator: decimalSeparator,
    thousandSeparator: thousandSeparator,
  });

  return (
    <>
      <Text {...restProps} style={{ ...richStyle, ...style }}>
        {formatter.format(price)}
      </Text>
      ;
    </>
  );
};

RichText.propTypes = {
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currency: PropTypes.string,
  decimalSeparator: PropTypes.string,
  thousandSeparator: PropTypes.string,
  style: PropTypes.any,
};

export default RichText;
