import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import CustomerSignUpForm from "../../Components/Auth/CustomerSignUpForm";
// End Imports
const { Title, Paragraph } = Typography;

const CustomerSignUp = () => {
  return (
    <>
      <div className="auth-container">
        <Row>
          <Col xs={24} lg={12}>
            <Row
              gutter={24}
              justify={"center"}
              align={"middle"}
              style={{ flexDirection: "column" }}
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
          <Col xs={24} lg={12}>
            <CustomerSignUpForm />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CustomerSignUp;
