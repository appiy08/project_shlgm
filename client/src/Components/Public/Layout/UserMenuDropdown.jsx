import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message } from "antd";
// End Imports
const items = [
  {
    label: "Dashboard",
    key: "1",
  },
  {
    label: "Profile",
    key: "2",
  },
  {
    label: "Logout",
    key: "3",
  },
];

const UserMenuDropdown = () => {
  const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
    >
      <Button
        shape="circle"
        icon={<UserOutlined />}
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  );
};
export default UserMenuDropdown;
