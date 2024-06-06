import {
  CheckSquareTwoTone,
  CloseSquareTwoTone,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Carousel,
  Col,
  Divider,
  Flex,
  Image,
  InputNumber,
  message,
  Rate,
  Row,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import { grey } from "@ant-design/colors";
import { get, map, startCase } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RTEBox from "../../Components/Common/RTEBox";
import { productGetByID } from "../../lib/actions/product";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
// End Imports
const { Title, Text } = Typography;
const { Option } = Select;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { auth_credentials } = useAuthContext();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const dispatch = useDispatch();

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  const handleAddToCart = () => {
    const formData = {
      userId: get(auth_credentials, "_id", ""),
      itemId: productId,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    };
    dispatch(addToCart(formData))
      .then((result) => {
        if (get(result, "payload.status", 0) === 200) {
          message.success(`Added ${quantity} items to cart`);
        }
      })
      .catch((err) => {
        message.error(`Something went wrong`);
        throw err;
      });
  };

  const handleBuyNow = () => {
    message.success(`Redirecting to checkout`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setFetchLoading(true);
      try {
        const response = await productGetByID(productId);
        const data = get(response, "data", []);
        setProduct(data);
        setSelectedSize(get(data, "sizes[0]", ""));
        setSelectedColor(get(data, "colors[0]", ""));
        setFetchLoading(false);
      } catch (error) {
        console.error(error);
        setFetchLoading(false);
      }
    };
    fetchProducts();
  }, [productId]);

  return fetchLoading ? (
    <Card>
      <Flex
        justify="center"
        align="center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <Spin />
      </Flex>
    </Card>
  ) : (
    <Card className="product-detail-page">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12} style={{ alignContent: "center" }}>
          <Carousel
            arrows={true}
            infinite={true}
            autoplay={true}
            lazyLoad={true}
            fade={true}
            effect="fade"
            centerMode={true}
            slidesToShow={1}
            slidesToScroll={1}
            slidesPerRow={1}
          >
            {map(get(product, "images", []), (image, index) => (
              <div key={index} style={{ textAlign: "center" }}>
                <Image
                  width={100}
                  src={image}
                  alt="Product"
                  className="product-image-thumb"
                />
              </div>
            ))}
          </Carousel>
        </Col>
        <Col xs={24} md={12}>
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Title level={2} className="playfair-display-bold">
                {get(product, "name", "")}
              </Title>
            </Col>
            <Col span={24}>
              <Rate defaultValue={get(product, "rating", 0)} disabled />
              <Text
                type="secondary"
                style={{ fontSize: "16px", marginBottom: "10px" }}
              >
                {get(product, "reviews", 0)}
              </Text>
            </Col>
            <Col span={24}>
              <Title level={3} style={{ marginBottom: "10px" }}>
                Rs. {get(product, "price", 0)}
              </Title>
            </Col>
            <Col span={24}>
              <Text style={{ fontSize: "16px", marginBottom: "10px" }}>
                <del>Rs. {get(product, "originalPrice", 0)}</del>
              </Text>
            </Col>
            <Col span={24}>
              <Flex gap={12} align="center">
                <Text>Color:</Text>
                <Space>
                  {map(get(product, "colors", []), (color) => (
                    <Button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      size="small"
                      shape="circle"
                      style={{
                        width: "1.5rem",
                        height: "1.5rem",
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? `0.25rem solid ${grey[1]}`
                            : `0.25rem solid transparent`,
                      }}
                    />
                  ))}
                </Space>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex gap={12} align="center">
                <Text>Size:</Text>
                <Space size={8}>
                  <Select
                    mode="multiple"
                    defaultValue={get(product, "sizes", "")}
                    onChange={handleSizeChange}
                    value={selectedSize}
                    style={{ width: 100 }}
                  >
                    <Option value="xs">XS</Option>
                    <Option value="s">S</Option>
                    <Option value="m">M</Option>
                    <Option value="l">L</Option>
                    <Option value="xl">XL</Option>
                    <Option value="xxl">XXL</Option>
                  </Select>
                </Space>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex
                gap={12}
                align="center"
                className="product-quantity-selection"
              >
                <Text>Quantity:</Text>
                <InputNumber
                  min={1}
                  max={45}
                  defaultValue={quantity}
                  onChange={handleQuantityChange}
                  style={{ width: 80 }}
                />
              </Flex>
            </Col>
            <Col span={24}>
              <Flex gap={12} align="center" className="product-gender">
                <Text>Gender: </Text>
                <Text>{startCase(get(product, "gender", ""))}</Text>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex gap={12} align="center" className="product-brand">
                <Text>Brand: </Text>
                <Text>{startCase(get(product, "brand", ""))}</Text>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex gap={12} align="center" className="product-condition">
                <Text>Condition: </Text>
                <Text>{startCase(get(product, "condition", ""))}</Text>
              </Flex>
            </Col>
            <Col span={24}>
              <Flex gap={12} align="center" className="product-brand">
                <Text>In Stock: </Text>
                <Text>
                  {get(product, "inStock", "") ? (
                    <CheckSquareTwoTone twoToneColor="#49b344" />
                  ) : (
                    <CloseSquareTwoTone twoToneColor="#d94f45" />
                  )}
                </Text>
              </Flex>
            </Col>
            <Col span={24}>
              <Row gutter={[24, 24]} style={{ marginTop: "1.5rem" }}>
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
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">
              Description
            </Title>
          </Divider>
          <RTEBox htmlContent={get(product, "description", "")} />
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">
              Review
            </Title>
          </Divider>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">
              Shipping
            </Title>
          </Divider>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Divider orientation="left">
            <Title level={4} className="playfair-display-bold">
              Return
            </Title>
          </Divider>
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]} style={{ marginTop: "40px" }}>
      <Col span={24}>
        <Title
          level={3}
          className="playfair-display-bold"
          style={{ marginBottom: "20px" }}
        >
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
    </Row> */}
      {/* <Row gutter={[16, 16]} style={{ marginTop: "40px" }}>
      <Col span={24}>
        <Title
          level={3}
          className="playfair-display-bold"
          style={{ marginBottom: "20px" }}
        >
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
    </Row> */}
    </Card>
  );
};

export default ProductDetailPage;
