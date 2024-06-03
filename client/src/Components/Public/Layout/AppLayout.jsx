import { Divider, Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppBottomNavigation from "./AppBottomNavigation";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
// End Imports
const { Content } = Layout;

const AppLayout = () => {

  return (
    <>
      <Layout className="app-layout">
        <AppHeader />
        <Content>
          <Outlet />
        </Content>
        <Divider />
        <AppBottomNavigation />
        <AppFooter />
      </Layout>
    </>
  );
};
export default AppLayout;
