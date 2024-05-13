export const themeConfig = (props) => ({
  token: {
    colorPrimary: "#e09540",
    colorSecondary: "#353839",
    colorSuccess: "#67d85d",
    colorWarning: "#ffc638",
    colorError: "#fe6f5e",
    colorInfo: "#2fb1fc",
    borderRadius: 0,
    fontFamily: '"Raleway", sans-serif',
    fontFamilyCode: '"Raleway", sans-serif',
  },
  components: {
    Layout: {
      headerPadding: "0 30px",
    },
    Button: {
      dangerShadow: "none",
      defaultShadow: "none",
      primaryShadow: "none",
      algorithm: true,
      className: props.buttonClass,
    },
  },
  cssVar: true,
});
