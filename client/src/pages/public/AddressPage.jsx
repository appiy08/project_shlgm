import { Button, Card, Col, Radio, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { getAddressData } from "../../features/address/addressSlice";
import { get, map } from "lodash";
// End Dependencies
const { Title, Text } = Typography;

const AddressPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { auth_credentials } = useAuthContext();
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address);
  const [selectedAddress, setSelectedAddress] = useState({});

  const handleSelectAddress = (e) => {
    setSelectedAddress(get(e, "target.value"));
  };

  useEffect(() => {
    dispatch(getAddressData({ userId: get(auth_credentials, "_id", "") }));
  }, [auth_credentials, dispatch]);

  return (
    <Card style={{ margin: "1rem" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[12, 12]} justify="space-between" align="middle">
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Title
                level={2}
                className="playfair-display-bold"
                style={{ marginBottom: 0 }}
              >
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
        <Col span={24}>
          <Radio.Group
            name="radiogroup"
            value={selectedAddress}
            onChange={handleSelectAddress}
          >
            <Row gutter={[12, 12]}>
              {map(get(addresses, "data", []), (data, index) => (
                <Col>
                  <Card
                    key={index}
                    title={get(data, "name", "")}
                    extra={<Radio value={get(data, "_id", "")}>Select</Radio>}
                  >
                    <Row gutter={[12, 6]}>
                      <Col span={24}>
                        <Text>{get(data, "address", "")}, </Text>
                      </Col>
                      <Col span={24}>
                        <Text>{get(data, "zip", "")}, </Text>
                        <Text>{get(data, "city", "")}, </Text>
                      </Col>
                      <Col span={24}>
                        <Text>{get(data, "state", "")}, </Text>
                        <Text>{get(data, "country", "")}, </Text>
                      </Col>
                      <Col span={24}>
                        <Text>Phone: {get(data, "phone", "")}, </Text>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </Col>
        <Col span={24}>
          <div style={{ textAlign: "center", marginTop: "1rem",marginBottom:'2rem' }}>
            <Button
              type="primary"
              onClick={() =>
                navigate("/checkout", {
                  state: { ...state, addressId: selectedAddress },
                })
              }
            >
              Payment
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default AddressPage;
