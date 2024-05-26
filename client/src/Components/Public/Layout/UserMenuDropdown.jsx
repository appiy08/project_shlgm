import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
// End Imports
const items = [
  {
    label: "Dashboard",
    path: "/dashboard",
    key: "1",
  },
  {
    label: "Profile",
    path: "/profile",
    key: "2",
  },
  { type: "divider" },
  {
    label: "Logout",
    path: "/logout",
    key: "3",
  },
];

const UserMenuDropdown = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(get(e, "item.props.path", ""));
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
      trigger={["click"]}
    >
      <Button
        type="primary"
        shape="default"
        icon={<UserOutlined />}
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  );
};
export default UserMenuDropdown;
