import { DOT_PREFIX } from "../constant";
import { genComponentStyleHook } from "./styleUtil";

// ============================== Border ==============================
const genButtonStyle = (token) => {
  const { componentCls } = token;

  return {
    [`${componentCls}${DOT_PREFIX}`]: {
      // ======================= Primary =======================
      [`&${componentCls}-secondary`]: {
        [`&:not(${componentCls}-dangerous)`]: {
          appearance: "none",
          backgroundColor: "#ffffff",
          borderWidth: 0,
          color: "#000000",
          cursor: "pointer",
          display: "inline-block",
          fontFamily: '"Raleway", sans-serif',
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: 0,
          lineHeight: "1em",
          margin: 0,
          opacity: 1,
          outline: 0,
          padding: "1.5em 2.2em",
          position: "relative",
          textAlign: "center",
          textDecoration: "none",
          textRendering: "geometricprecision",
          textTransform: "uppercase",
          transition: `opacity 300ms cubic-bezier(0.694, 0, 0.335, 1),
            background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
            color 100ms cubic-bezier(0.694, 0, 0.335, 1)`,
          userSelect: "none",
          touchAction: "manipulation",
          verticalAlign: "baseline",
          whiteSpace: "nowrap",
          [`&:not(${componentCls}-dangerous)`]: {
            "&:disabled": {
              opacity: token.opacityLoading,
              color: token.colorTextLightSolid,
            },
          },
        },
      },

      // ======================== Hover ========================
      [`&${componentCls}-secondary`]: {
        [`&:not(:disabled):not(${componentCls}-dangerous)`]: {
          "&:hover": {
            filter: `brightness(120%)`,
            backgroundColor: token.primaryColor,
          },
          "&:active": {
            filter: `brightness(80%)`,
            backgroundColor: token.primaryColor,
          },
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(["Button", "appTheme"], (token) => {
  return [genButtonStyle(token)];
});
