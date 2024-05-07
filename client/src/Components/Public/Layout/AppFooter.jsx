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
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};

export default AppFooter;
