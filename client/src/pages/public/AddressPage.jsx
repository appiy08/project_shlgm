import { Button, Card, Col, Row, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { getAddressData } from "../../features/address/addressSlice";
import { get } from "lodash";
// End Dependencies
const { Title } = Typography;

const AddressPage = () => {
  const navigate = useNavigate();
  const { auth_credentials } = useAuthContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddressData({ userId: get(auth_credentials, "_id", "") }));
  }, [auth_credentials, dispatch]);

  return (
    <Card style={{ margin: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[12, 12]} justify="space-between" align="middle">
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Title level={2} style={{ marginBottom: 0 }}>
                Address
              </Title>
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              style={{ textAlign: "end" }}
            >
              <Button
                type="primary"
                onClick={() => {
                  navigate("/address/add");
                }}
              >
                Add New Address
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>Card</Col>
      </Row>
    </Card>
  );
};

export default AddressPage;
