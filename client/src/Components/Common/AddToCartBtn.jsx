import { Button, Col, Flex, Input, Row } from "antd";
import React from "react";
// End Imports

const AddToCartBtnBox = () => {
  const [quantity, setQuantity] = React.useState(0);
  return (
    <Flex vertical align="center" gap={8} style={{ width: "100%" }}>
      <Row>
        <Col>
          <Button type="text">S</Button>
        </Col>
        <Col>
          <Button type="text">M</Button>
        </Col>
        <Col>
          <Button type="text">L</Button>
        </Col>
      </Row>
      <Flex gap={8}>
        <Row>
          <Col>
            <Button
              onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : null)}
            >
              -
            </Button>
          </Col>
          <Col>
            <Input
              value={quantity}
              style={{ width: 40, textAlign: "center" }}
            />
          </Col>
          <Col>
            <Button
              onClick={() => (quantity < 10 ? setQuantity(quantity + 1) : null)}
            >
              +
            </Button>
          </Col>
        </Row>
        <Button type="primary">Add to Cart</Button>
      </Flex>
    </Flex>
  );
};

export default AddToCartBtnBox;
