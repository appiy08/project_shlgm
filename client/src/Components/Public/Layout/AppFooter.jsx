import { Layout } from "antd";
// End Imports 
const {Footer} = Layout
const AppFooter = () => {
  return (
    <Footer
      className="app-footer"
      style={{
        textAlign: "center",
      }}
    >
      Celestial Chic ©{new Date().getFullYear()} Created by Appiy08
    </Footer>
  );
};

export default AppFooter;
