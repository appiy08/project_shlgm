import { Button, Flex, Layout, Menu } from "antd";
import { filter, get } from "lodash";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// End Imports
const { Header } = Layout;

const PublicHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [currentSelectMenu, setCurrentSelectMenu] = useState("1");

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
    <Header
      headerPadding="0 16px"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
      }}
    >
      <Flex align="center" justify="space-between" style={{ height: "100%" }}>
        <div className="brand-logo">
          <img src="./cc-shlgm-logo.png" alt="Brand Logo" />
        </div>
        <Flex align="center" gap="middle">
          <Menu
            theme="dark"
            onClick={onClickMenu}
            selectedKeys={[currentSelectMenu]}
            mode="horizontal"
            items={MenuItems}
            style={{ minWidth: 320 }}
          />
          <Flex gap="middle">
            <Button type="primary" onClick={() => navigate("/login")}>
              Log In
            </Button>
            <Button type="default" ghost onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};

PublicHeader.propTypes = {};

export default PublicHeader;

const MenuItems = [
  {
    key: "1",
    label: "Home",
    path: "/home",
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
    label: "Contact Us",
    path: "/contact-us",
  },
];
