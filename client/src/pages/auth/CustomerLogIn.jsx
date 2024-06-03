import { Col, Divider, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import CustomerLogInForm from "../../Components/Auth/CustomerLogInForm";
// End Imports
const { Title, Paragraph } = Typography;

const CustomerLogIn = () => {
  return (
    <>
      <div className="auth-container">
        <Row gutter={24} justify='center'>
          <Col xs={24} lg={11}>
            <Row
              gutter={24}
              justify={"center"}
              align={"middle"}
              style={{ flexDirection: "column", paddingBottom: "24px" }}
            >
              <Col xs={24}>
                <Link to="/" style={{ display: "inline-block" }}>
                  <img
                    alt="Brand_Logo"
                    src="/brand-logo/cc_shlgm_logo_primary_transparent.svg"
                    className="img-fluid auth-container-logo"
                  />
                </Link>
              </Col>
              <Col xs={24}>
                <div className="auth-container-captions">
                  <Title level={1} className="playfair-display-black title">
                    Welcome To Celestial Chic
                  </Title>
                  <Paragraph className="sub-title">
                    Second-Hand Luxury Goods Marketplace
                  </Paragraph>
                </div>
              </Col>
            </Row>
          </Col>
          <Divider type="vertical" />
          <Col xs={24} lg={11}>
            <CustomerLogInForm />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerLogIn;
