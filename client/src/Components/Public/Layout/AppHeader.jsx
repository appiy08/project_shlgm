import { Button, Flex, Layout, Menu } from "antd";
import { filter, get } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import UserMenuDropdown from "./UserMenuDropdown";
// End Imports
const { Header } = Layout;

const AppHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentSelectMenu, setCurrentSelectMenu] = useState("1");
  const { state } = useAuthContext();
  console.log("auth_credentials : State ::>>", state);
  console.log("auth_credentials ::>>", state?.auth_credentials);
  const onClickMenu = (e) => {
    setCurrentSelectMenu(e.key);
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
    <Header theme="light" className="app-header">
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <div className="brand-logo">
          <img src="./cc_brand_name_primary.svg" alt="Brand Logo" />
        </div>
        <Flex align="center" gap="middle">
          <div className="header-navigation-menu">
            <Menu
              theme="dark"
              onClick={onClickMenu}
              selectedKeys={[currentSelectMenu]}
              mode="horizontal"
              items={MenuItems}
              style={{ minWidth: 320 }}
            />
          </div>
          <Flex gap="middle">
            <Button type="primary" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button type="default" ghost onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
            <UserMenuDropdown/>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};

AppHeader.propTypes = {};

export default AppHeader;

const MenuItems = [
  {
    key: "1",
    label: "Home",
    path: "/",
  },
  {
    key: "2",
    label: "Shop",
    path: "/shop",
  },
  {
    key: "3",
    label: "About",
    path: "/about",
  },
  {
    key: "4",
    label: "Contact",
    path: "/contact",
  },
];
