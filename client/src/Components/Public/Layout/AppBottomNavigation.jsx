import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { filter, get } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// End Imports
const { Footer } = Layout;

const AppBottomNavigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentSelectMenu, setCurrentSelectMenu] = useState("1");

  const onClickMenu = (e) => {
    setCurrentSelectMenu(e.key);
    navigate(e.path);
  };

  useEffect(() => {
    const getHeaderDefaultSelectedKey = () => {
      let activeKey = "";
      filter(MenuItems, (data) => {
        activeKey =
          get(data, "path", "") === pathname ? get(data, "key", "") : "1";
      });
      return activeKey;
    };
    getHeaderDefaultSelectedKey();

    return () => {};
  }, [pathname]);

  return (
    <Footer className="app-bottom-navigation" style={{ footerPadding: 0 }}>
      <Menu
        theme="dark"
        onClick={onClickMenu}
        selectedKeys={[currentSelectMenu]}
        mode="horizontal"
        items={MenuItems}
      />
    </Footer>
  );
};
export default AppBottomNavigation;

const MenuItems = [
  {
    key: "1",
    label: "Home",
    icon: <HomeOutlined />,
    path: "/",
  },
  {
    key: "2",
    label: "Shop",
    icon: <ShoppingOutlined />,
    path: "/shop",
  },
  {
    key: "3",
    label: "Search",
    icon: <SearchOutlined />,
    path: "/about",
  },
  {
    key: "4",
    label: "Account",
    icon: <UserOutlined />,
    path: "/contact",
  },
];
