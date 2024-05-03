import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
// End Imports 
const { Content, Footer } = Layout;

const PublicLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
     <PublicHeader/>
      <Content
        style={{
          padding: "64px 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default PublicLayout;
