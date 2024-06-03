/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product pathname: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Divider, Flex, Menu, Typography } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const { Text } = Typography;

const DashboardSidenav = ({ color }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const defaultPath = pathname.split("/").pop();
  const [current, setCurrent] = useState(defaultPath);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.item.props.path);
  };

  const MenuItems = [
    {
      label: <span className="label">Dashboard</span>,
      key: "dashboard",
      path: "/dashboard",
      icon: (
        <span
          className="icon"
          style={{
            background: defaultPath === "dashboard" ? color : "",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            key={0}
          >
            <path d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"></path>
            <path d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"></path>
            <path d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"></path>
          </svg>
        </span>
      ),
    },
    {
      label: <span className="label">Products</span>,
      key: "products",
      path: "/dashboard/products",
      icon: (
        <span
          className="icon"
          style={{
            background: defaultPath === "products" ? color : "",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 1024 1024"
          >
            <path d="M909.5 544l-359-362.4c-8-8.1-18.7-12.6-30.2-12.6H158c-34.2 0-62 27.5-62 61.4V454c0 11.2 4.4 21.7 12.4 29.7L467 838c11.8 11.5 27.3 17.9 43.8 17.9s32-6.3 43.8-17.9l28.3-28 28.3 28c11.8 11.5 27.3 17.9 43.8 17.9s32-6.4 43.8-17.9L909 630.3c24-23.6 24.2-62.3.5-86.3zM280.1 439c-42.6 0-77.2-34.6-77.2-77.2s34.6-77.2 77.2-77.2 77.2 34.6 77.2 77.2c-.1 42.6-34.6 77.2-77.2 77.2zm588.7 150.6L658.6 797.3c-1 1-2.2 1.4-3.6 1.4s-2.6-.5-3.6-1.4l-32.1-31.7L760.6 626c21.7-21.4 21.8-56.1.4-77.8L442 226.1h72.2l354.6 358.1c.3.3 1.1 1.2 1.1 2.7.1 1.4-.5 2.2-1.1 2.7zM280.1 335.9c-14.3 0-26 11.7-26 26s11.7 26 26 26 26-11.7 26-26-11.7-26-26-26z" />
          </svg>
        </span>
      ),
    },
    {
      type: "group",
      label: <span className="label">Account</span>,
      children: [
        {
          label: <span className="label">Profile</span>,
          key: "profile",
          path: "/dashboard/profile",
          icon: (
            <span
              className="icon"
              style={{
                background: defaultPath === "profile" ? color : "",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill={color}
                xmlns="http://www.w3.org/2000/svg"
                key={0}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
                ></path>
              </svg>
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <>
      <Flex gap={8} align="center">
        <Link to="/">
          <img
            src={"/brand-logo/cc_shlgm_logo_secondary_transparent.svg"}
            alt="Brand Logo"
            width={48}
            height={48}
            />
            </Link>
          <Text
            className="playfair-display-bold"
            style={{ fontSize: "1.375rem" }}
            strong
          >
            Celestial Chic
          </Text>
      </Flex>
      <Divider />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        defaultSelectedKeys={[current]}
        defaultOpenKeys={["dashboard"]}
        theme="light"
        mode="inline"
        items={MenuItems}
      />
    </>
  );
};

DashboardSidenav.propTypes = {
  color: PropTypes.string,
};

export default DashboardSidenav;
