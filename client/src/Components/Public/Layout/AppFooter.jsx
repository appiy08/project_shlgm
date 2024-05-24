import { Col, Divider, Layout, List, Row, Typography } from "antd";
import { Link } from "react-router-dom";
// End Imports
const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <Footer
      className="app-footer"
      style={{
        textAlign: "center",
      }}
    >
      <Row gutter={16} justify="space-between">
        <Col md={{ flex: "256px" }}>
          <Row justify='center'>
            <Col>
              <Link
                to={"/"}
                className="brand-logo"
              >
                <img
                  alt="Brand Logo"
                  src="cc_shlgm_logo_full_transparent.png"
                  className="img-fluid"
                />
              </Link>
            </Col>
            <Col>
              <Paragraph>Second-Hand Luxury Goods Marketplace</Paragraph>
            </Col>
          </Row>
        </Col>
        <Col md={{ flex: "25%" }}>
          <List
            header={
              <Title
                level={5}
                type="primary"
                underline
                className="playfair-display-regular"
              >
                Featured Brands
              </Title>
            }
            itemLayout="horizontal"
            size="small"
            dataSource={BRANDS}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={<Link to={"/"}>{item.title}</Link>} />
              </List.Item>
            )}
          />
        </Col>
        <Col md={{ flex: "25%" }}>
          <List
            header={
              <Title
                level={5}
                type="primary"
                underline
                className="playfair-display-regular"
              >
                Featured Categories
              </Title>
            }
            itemLayout="horizontal"
            size="small"
            dataSource={CATEGORIES}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={<Link to={"/"}>{item.title}</Link>} />
              </List.Item>
            )}
          />
        </Col>
        <Col md={{ flex: "25%" }}>
          <List
            header={
              <Title
                level={5}
                type="primary"
                underline
                className="playfair-display-regular"
              >
                General
              </Title>
            }
            itemLayout="horizontal"
            size="small"
            dataSource={GENERAL}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={<Link to={"/"}>{item.title}</Link>} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Divider />
      <Paragraph style={{ margin: 0 }}>
        Celestial Chic ©{new Date().getFullYear()} Created by Appiy08
      </Paragraph>
    </Footer>
  );
};

export default AppFooter;

const BRANDS = [
  {
    title: "Louis Vuitton",
  },
  {
    title: "Rolex",
  },
  {
    title: "Gucci",
  },
  {
    title: "Hermes",
  },
  {
    title: "Tory Burch",
  },
  {
    title: "Chanel",
  },
  {
    title: "Omega",
  },
  {
    title: "Breitling",
  },
  {
    title: "Michel Kors",
  },
  {
    title: "Fendi",
  },
  {
    title: "Coach",
  },
  {
    title: "Cartier",
  },
  {
    title: "Hublot",
  },
  {
    title: "Salvatore Ferragamo",
  },
  {
    title: "Burberry",
  },
  {
    title: "Tag Heuer",
  },
  {
    title: "Audemars Piguet",
  },
  {
    title: "Patek Philippe",
  },
  {
    title: "Panerai",
  },
  {
    title: "Shop All Brands",
  },
];
const CATEGORIES = [
  { title: "Women's Fashion" },
  { title: "Women Handbags" },
  { title: "Men's Fashion" },
  { title: "Luxury Watches" },
  { title: "Designer Jewelry" },
  { title: "Luxury Gifts" },
  { title: "Sunglasses" },
];
const GENERAL = [
  { title: "About Us" },
  { title: "Authenticity" },
  { title: "Guidelines" },
  { title: "Terms & Conditions" },
  { title: "Order & Return" },
  { title: "Shipping & Delivery" },
  { title: "Privacy Policy" },
  { title: "Contact Us" },
];
