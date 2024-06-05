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
    console.log("e :>:>:>", e);
    setCurrentSelectMenu(e.key);
    navigate(get(e, "item.props.path"));
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
    path: "/products",
  },
  {
    key: "3",
    label: "Search",
    icon: <SearchOutlined />,
    path: "/home",
  },
  {
    key: "4",
    label: "Account",
    icon: <UserOutlined />,
    path: "/dashboard/profile",
  },
];
