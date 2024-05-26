import { Avatar, Badge, Dropdown, List } from "antd";
import { get } from "lodash";
import { BellIcon, CreditIcon, WiFiIcon } from "../../../assets/dashboard/icons";
import avatar from "../../../assets/dashboard/images/team-2.jpg";

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        New message from Sophie
      </a>
    ),
    title: "New message from Sophie",
    description: `2 days ago`,
    icon: <Avatar src={avatar} shape="square" />,
  },
  {
    key: "2",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        New album by Travis Scott
      </a>
    ),
    title: "New album by Travis Scott",
    description: `2 days ago`,
    icon: <Avatar icon={<WiFiIcon />} shape="square" />,
  },
  {
    key: "3",
    label: (
      <a target="_blank" rel="noopener noreferrer" href="">
        Payment completed
      </a>
    ),
    title: "Payment completed",
    description: `2 days ago`,
    icon: <Avatar icon={<CreditIcon />} shape="square" />,
  },
];

const NotificationDropdown = () => {
  const menuStyle = {
    boxShadow: "none",
  };

  return (
    <Badge size="small" count={4}>
      <Dropdown
        trigger={["click"]}
        menu={{
          items,
        }}
        dropdownRender={(menu) => (
          <div className="ant-dropdown-menu ant-dropdown-menu-split header-notifications-dropdown">
            <List
              min-width="100%"
              className="header-notifications-dropdown"
              style={menuStyle}
              itemLayout="horizontal"
              dataSource={get(menu, "props.items", [])}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.icon}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      >
        <a
          href="#pablo"
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          <BellIcon />
        </a>
      </Dropdown>
    </Badge>
  );
};
export default NotificationDropdown;
