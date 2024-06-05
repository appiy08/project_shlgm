import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Menu, Tooltip } from "antd";
import { filter, get } from "lodash";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import UserMenuDropdown from "./UserMenuDropdown";
// End Imports
const { Header } = Layout;

const AppHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth_credentials } = useAuthContext();
  const [currentSelectMenu, setCurrentSelectMenu] = useState("1");

  const onClickMenu = (e) => {
    setCurrentSelectMenu(e.key);
    navigate(get(e,'item.props.path','/home'))
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
          <Link to="/">
            <img src="/brand-logo/cc_brand_name_primary.svg" alt="Brand Logo" />
          </Link>
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
          <div>
            <Tooltip title="Shopping Cart">
              <Button
                type="default"
                shape="default"
                icon={<ShoppingCartOutlined />}
              />
            </Tooltip>
          </div>
          <Flex gap="middle">
            {get(auth_credentials, "_id", "") === "" ? (
              <>
                <Button type="primary" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button
                  type="default"
                  ghost
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <UserMenuDropdown />
            )}
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
    path: "/home",
  },
  {
    key: "2",
    label: "Shop",
    path: "/products",
  },
  {
    key: "3",
    label: "About",
    path: "/",
  },
  {
    key: "4",
    label: "Contact",
    path: "/",
  },
];
