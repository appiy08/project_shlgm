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
import { useState } from "react";

import {
  MenuUnfoldOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Timeline,
  Typography
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Echart from "../../Components/Dashboard/chart/EChart";
import LineChart from "../../Components/Dashboard/chart/LineChart";
import { CartIcon, DollarIcon, HeartIcon, ProfileIcon } from "../../assets/dashboard/icons";
// End Imports 

const Dashboard=()=> {
  const { Title } = Typography;

  const [reverse, setReverse] = useState(false);


  return (
    <>
      <div className="layout-content">
        <Row className="rowgap-vbox" gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card bordered={false} className="criclebox ">
                <div className="number">
                  <Row align="middle" gutter={[24, 0]}>
                    <Col xs={18}>
                      <span>{c.today}</span>
                      <Title level={3}>
                        {c.title} <small className={c.bnb}>{c.percent}</small>
                      </Title>
                    </Col>
                    <Col xs={6}>
                      <div className="icon-box">{c.icon}</div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={8} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <div className="timeline-box">
                <Title level={5}>Orders History</Title>
                <Paragraph className="lastweek" style={{ marginBottom: 24 }}>
                  this month <span className="bnb2">20%</span>
                </Paragraph>

                <Timeline
                  pending="Recording..."
                  className="timelinelist"
                  reverse={reverse}
                  items={timelineList}
                />

                <Button
                  type="primary"
                  className="width-100"
                  onClick={() => setReverse(!reverse)}
                >
                  {<MenuUnfoldOutlined />} REVERSE
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;

const count = [
  {
    today: "Today’s Sales",
    title: "$53,000",
    percent: "+30%",
    icon: <DollarIcon />,
    bnb: "bnb2",
  },
  {
    today: "Today’s Users",
    title: "3,200",
    percent: "+20%",
    icon: <ProfileIcon />,
    bnb: "bnb2",
  },
  {
    today: "New Clients",
    title: "+1,200",
    percent: "-20%",
    icon: <HeartIcon />,
    bnb: "redtext",
  },
  {
    today: "New Orders",
    title: "$13,200",
    percent: "10%",
    icon: <CartIcon />,
    bnb: "bnb2",
  },
];

const timelineList = [
  {
    title: "$2,400 - Redesign store",
    time: "09 JUN 7:20 PM",
    color: "green",
  },
  {
    title: "New order #3654323",
    time: "08 JUN 12:20 PM",
    color: "green",
  },
  {
    title: "Company server payments",
    time: "04 JUN 3:10 PM",
  },
  {
    title: "New card added for order #4826321",
    time: "02 JUN 2:45 PM",
  },
  {
    title: "Unlock folders for development",
    time: "18 MAY 1:30 PM",
  },
  {
    title: "New order #46282344",
    time: "14 MAY 3:30 PM",
    color: "gray",
  },
];
