export * from "antd/es/theme/internal";
import { useStyleRegister } from "@ant-design/cssinjs";
import { ConfigProvider, theme as Theme } from "antd";
import React from "react";

// Copy from antd `genComponentStyleHook`, you can use any other CSS-in-JS library instead.
export function genComponentStyleHook(componentNames, styleFn) {
  const concatComponent = componentNames.join("-");

  return (prefixCls) => {
    const { theme, token, hashId } = Theme.useToken();
    const { getPrefixCls, iconPrefixCls } = React.useContext(
      ConfigProvider.ConfigContext
    );
    const rootPrefixCls = getPrefixCls();

    // Shared config
    const sharedConfig = {
      theme,
      token,
      hashId,
    };

    useStyleRegister(
      { ...sharedConfig, path: [concatComponent, prefixCls, iconPrefixCls] },
      () => {
        const componentCls = `.${prefixCls}`;

        const mergedToken = {
          ...token,
          componentCls,
          prefixCls,
          iconCls: `.${iconPrefixCls}`,
          antCls: `.${rootPrefixCls}`,
        };

        const styleInterpolation = styleFn(mergedToken);
        return styleInterpolation;
      }
    );
  };
}
