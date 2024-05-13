import { ConfigProvider } from "antd";
import PropTypes from "prop-types";
import * as React from "react";
import useButtonStyle from './components/buttonStyle';
import { PREFIX } from "./constant";
import { themeConfig } from './themeConfig';

export default function ThemeProvider(props) {
  const { children, disabled } = props;

  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);

  // Button
  useButtonStyle(getPrefixCls(`btn`));

  // ====================== Render ======================
  const passedCls = disabled ? null : PREFIX;

  return (
    <ConfigProvider theme={themeConfig({buttonClass:passedCls})}>
      {children}
    </ConfigProvider>
  );
}
ThemeProvider.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
};
