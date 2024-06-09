/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Avatar, Button, Card, Col, Descriptions, Radio, Row } from "antd";


import { get } from "lodash";
import { useSelector } from "react-redux";
import { PencilIcon } from "../../assets/dashboard/icons";
import BgProfile from "../../assets/dashboard/images/bg-profile.jpg";
import profilavatar from "../../assets/dashboard/images/face-1.jpg";
// Dependencies End

const Profile = () => {
  const user = useSelector((state) => get(state, "user.data", {}));
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: "url(" + BgProfile + ")" }}
      ></div>

      <Card
        className="card-profile-head"
        styles={{ body: { display: "none" } }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{get(user, "name", "")}</h4>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={12} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Button type="link">
                <PencilIcon />
              </Button>
            }
            styles={{ body: { paddingTop: 0, paddingBottom: 16 } }}
          >
            <Descriptions>
              <Descriptions.Item label="Full Name" span={3}>
                {get(user, "name", "")}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {get(user, "phone", "")}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {get(user, "email", "")}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
