import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Image,
  Typography,
  Button,
  Rate,
  InputNumber,
  message,
  Space,
  Divider,
  Descriptions,
  Tag,
  Select,
  Steps,
  Form,
  Checkbox,
  Tabs,
  Tooltip,
  Carousel,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;
const { TabPane } = Tabs;

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("L");

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleSizeChange = (value) => {
    setSize(value);
  };

  const handleAddToCart = () => {
    message.success(`Added ${quantity} items to cart`);
  };

  const handleBuyNow = () => {
    message.success(`Redirecting to checkout`);
  };

  const productDetails = [
    {
      key: "Price",
      value: "Rs. 5,824.00",
    },
    {
      key: "Brand",
      value: "Wpbingo",
    },
    {
      key: "Availability",
      value: "In stock",
    },
    {
      key: "Sold",
      value: "35 sold in last 18 hours",
    },
    {
      key: "Viewing",
      value: "38 people are viewing this right now",
    },
  ];

  const productImages = [
    "https://images.unsplash.com/photo-1556695542-40a0efc8092e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1580489944765-25f9d6f61c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1574813746010-4308973c844e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    "https://images.unsplash.com/photo-1544203917-03a0415299fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  ];

  const relatedProducts = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1603377495092-db88c0038b22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Sicily Slide",
      price: "Rs. 5,824.00",
      discount: "12%",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1603283728201-96243ab6c13c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Twist Chain Necklace",
      price: "Rs. 7,072.00",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1595926559272-081c97744a2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Reese Cupro Mini Dress",
      price: "Rs. 5,408.00",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1580489944765-25f9d6f61c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Susie Midi Dress",
      price: "Rs. 6,656.00",
      discount: "11%",
    },
  ];

  const recentlyViewedProducts = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1544203917-03a0415299fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Cascata Wide - Brim Hat",
      price: "Rs. 6,656.00",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1574813746010-4308973c844e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      title: "Bought Together",
      price: "Rs. 6,240.00",
      discount: "16%",
    },
  ];

  return (
    <div className="product-detail-page">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Image
            width={500}
            src="https://images.unsplash.com/photo-1556695542-40a0efc8092e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Product"
          />
          <div className="product-images">
            <Carousel
              arrows={true}
              infinite={false}
              autoplay={true}
              lazyLoad={true}
              fade={true}
              effect="fade"
              className="hb-slideshow"
            >
              {productImages.map((image, index) => (
                <div key={index}>
                  <Image
                    width={100}
                    src={image}
                    alt="Product"
                    preview={false}
                    className="product-image-thumb"
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </Col>
        <Col xs={24} md={12}>
          <Title level={2} className="playfair-display-bold">Al Fonso Dress (Upsell)</Title>
          <Rate defaultValue={4} disabled />
          <Text
            type="secondary"
            style={{ fontSize: "16px", marginBottom: "10px" }}
          >
            1 review
          </Text>
          <Title level={3} style={{ marginBottom: "10px" }}>
            Rs. 5,824.00
          </Title>
          <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
            <del>Rs. 6,240.00</del>
          </Text>
          <Descriptions
            bordered
            column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
            size="small"
            style={{ marginBottom: "20px" }}
          >
            {productDetails.map((item) => (
              <Descriptions.Item key={item.key} label={item.key}>
                {item.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
          <div className="product-size-selection">
            <Text style={{ marginBottom: "5px" }}>Size:</Text>
            <Space size={8}>
              <Select
                defaultValue={size}
                onChange={handleSizeChange}
                style={{ width: 100 }}
              >
                <Option value="L">L</Option>
                <Option value="M">M</Option>
                <Option value="S">S</Option>
              </Select>
            </Space>
          </div>
          <div className="product-quantity-selection">
            <Text style={{ marginBottom: "5px" }}>Quantity:</Text>
            <InputNumber
              min={1}
              max={45}
              defaultValue={quantity}
              onChange={handleQuantityChange}
              style={{ width: 80 }}
            />
          </div>
          <Row gutter={24}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Button
                type="primary"
                size="large"
                block={true}
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Button
                type="default"
                size="large"
                block={true}
                icon={<HeartOutlined />}
                onClick={handleBuyNow}
              >
                Buy It Now
              </Button>
            </Col>
          </Row>

          <div className="product-buy-more-save-more">
            <Title level={5}>BUY MORE SAVE MORE!</Title>
            <Tag color="green" style={{ marginBottom: "10px" }}>
              5 item(s) get 10% OFF on each product
            </Tag>
            <Button type="primary" size="small">
              ADD
            </Button>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">Description</Title>
          </Divider>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </Paragraph>
          <Paragraph>
            Don`&#39;`t ever play yourself. The weather is amazing, walk with me
            through the pathway of more success. Take this journey with me,
            Lion! The other day the grass was brown, now it`&#39;`s green
            because I ain`&#39;`t give up. Never surrender
          </Paragraph>
          <ul>
            <li>Claritas est etiam processus dynamicus.</li>
            <li>Qui sequitur mutationem consuetudium lectorum.</li>
            <li>Claritas est etiam processus dynamicus.</li>
            <li>Qui sequitur mutationem consuetudium lectorum.</li>
            <li>Claritas est etiam processus dynamicus.</li>
            <li>Qui sequitur mutationem consuetudium lectorum.</li>
          </ul>
          <Paragraph>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release.
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">Review</Title>
          </Divider>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">Shipping</Title>
          </Divider>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">Return</Title>
          </Divider>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "40px" }}>
        <Col span={24}>
          <Title level={3} className="playfair-display-bold" style={{ marginBottom: "20px" }}>
            You may also like
          </Title>
          <Row gutter={[16, 16]}>
            {relatedProducts.map((product, index) => (
              <Col key={index} xs={24} md={6}>
                <Card
                  hoverable
                  cover={<Image alt="product" src={product.imageUrl} />}
                  actions={[
                    <Tooltip key={1} title="Add to Cart">
                      <ShoppingCartOutlined />
                    </Tooltip>,
                    <Tooltip key={2} title="Add to Wishlist">
                      <HeartOutlined />
                    </Tooltip>,
                  ]}
                >
                  <Card.Meta
                    title={product.title}
                    description={
                      product.discount ? (
                        <span>
                          <del>
                            {product.price.slice(0, product.price.length - 3)}
                          </del>
                          <Text type="success" style={{ marginLeft: "5px" }}>
                            {product.price}
                          </Text>
                          <Tag
                            color="orange"
                            style={{ marginLeft: "5px", fontSize: "10px" }}
                          >
                            -{product.discount}%
                          </Tag>
                        </span>
                      ) : (
                        <Text type="success">{product.price}</Text>
                      )
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "40px" }}>
        <Col span={24}>
          <Title level={3} className="playfair-display-bold" style={{ marginBottom: "20px" }}>
            Recently Viewed Products
          </Title>
          <Row gutter={[16, 16]}>
            {recentlyViewedProducts.map((product, index) => (
              <Col key={index} xs={24} md={6}>
                <Card
                  hoverable
                  cover={<Image alt="product" src={product.imageUrl} />}
                  actions={[
                    <Tooltip key={1} title="Add to Cart">
                      <ShoppingCartOutlined />
                    </Tooltip>,
                    <Tooltip key={2} title="Add to Wishlist">
                      <HeartOutlined />
                    </Tooltip>,
                  ]}
                >
                  <Card.Meta
                    title={product.title}
                    description={
                      product.discount ? (
                        <span>
                          <del>
                            {product.price.slice(0, product.price.length - 3)}
                          </del>
                          <Text type="success" style={{ marginLeft: "5px" }}>
                            {product.price}
                          </Text>
                          <Tag
                            color="orange"
                            style={{ marginLeft: "5px", fontSize: "10px" }}
                          >
                            -{product.discount}%
                          </Tag>
                        </span>
                      ) : (
                        <Text type="success">{product.price}</Text>
                      )
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
