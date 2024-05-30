import {
  Button,
  Card,
  Col,
  Image,
  Layout,
  Rate,
  Row,
  Select,
  Space,
  Typography
} from "antd";
import { useState } from "react";
import ProductsPageSidenav from "../../Components/Public/Pages/Products/ProductsPageSidenav";
import { ToggleIcon } from "../../assets/dashboard/icons";
// End Imports
const { Title, Text } = Typography;
const { Option } = Select;
const { Content } = Layout;

const products = [
  {
    id: 1,
    name: "AL FONSO DRESS (UPSELL)",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 5824,
    originalPrice: 6240,
    discount: 16,
    rating: 4,
    reviews: 1,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Akatsuki Store",
    inStock: true,
  },
  {
    id: 2,
    name: "BOUGHT TOGETHER",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 6240,
    originalPrice: 7488,
    discount: 16,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Akaza Store",
    inStock: true,
  },
  {
    id: 3,
    name: "CASCATA WIDE BRIM HAT",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 6656,
    originalPrice: 6656,
    discount: 0,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Lulu Store",
    inStock: true,
  },
  {
    id: 4,
    name: "CLEO MINI DRESS",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 6656,
    originalPrice: 6656,
    discount: 0,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "SE Store",
    inStock: true,
  },
  {
    id: 5,
    name: "KAESHA YORK DRESS",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 6240,
    originalPrice: 6240,
    discount: 0,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Wpbingo",
    inStock: true,
  },
  {
    id: 6,
    name: "LARGE ESSENTIAL HOOP",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 5824,
    originalPrice: 6656,
    discount: 18,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Akatsuki Store",
    inStock: true,
  },
  {
    id: 7,
    name: "MADDS ONE SHOULDER TOP",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 6240,
    originalPrice: 6656,
    discount: 21,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Akaza Store",
    inStock: true,
  },
  {
    id: 8,
    name: "PHOENIX MINI DRESS",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 4576,
    originalPrice: 5824,
    discount: 12,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Lulu Store",
    inStock: true,
  },
  {
    id: 9,
    name: "REESE CUPRO MINI DRESS",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 5408,
    originalPrice: 5408,
    discount: 0,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "SE Store",
    inStock: true,
  },
  {
    id: 10,
    name: "SICILY SLIDE",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 5824,
    originalPrice: 6656,
    discount: 12,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Wpbingo",
    inStock: true,
  },
  {
    id: 11,
    name: "STAR ESSENTIAL RING",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 4992,
    originalPrice: 4992,
    discount: 0,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Akatsuki Store",
    inStock: true,
  },
  {
    id: 12,
    name: "SUZIE MIDI DRESS",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
    price: 6656,
    originalPrice: 7488,
    discount: 11,
    rating: 0,
    reviews: 0,
    colors: ["#f5f5f5", "#d4ac0d"],
    sizes: ["S", "M", "L"],
    brand: "Akaza Store",
    inStock: true,
  },
];

const ProductsPage = () => {
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 7904]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
    if (value) {
      setFilteredProducts(
        products.filter((product) => product.brand === value)
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
    if (value) {
      setFilteredProducts(
        products.filter((product) => product.colors.includes(value))
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleSizeChange = (value) => {
    setSelectedSize(value);
    if (value) {
      setFilteredProducts(
        products.filter((product) => product.sizes.includes(value))
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
    setFilteredProducts(
      products.filter(
        (product) => product.price >= value[0] && product.price <= value[1]
      )
    );
  };

  const handleInStockChange = (e) => {
    setShowInStockOnly(e.target.checked);
    if (e.target.checked) {
      setFilteredProducts(products.filter((product) => product.inStock));
    } else {
      setFilteredProducts(products);
    }
  };

  const indexOfLastProduct =
    (currentPage - 1) * productsPerPage + productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSidenav = () => setVisible(!visible);

  return (
    <Layout style={{ position: "relative", padding: "1.5rem 0" }}>
      <ProductsPageSidenav
        selectedBrand={selectedBrand}
        handleBrandChange={handleBrandChange}
        selectedColor={selectedColor}
        handleColorChange={handleColorChange}
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
        selectedPriceRange={selectedPriceRange}
        handlePriceChange={handlePriceChange}
        showInStockOnly={showInStockOnly}
        handleInStockChange={handleInStockChange}
        visible={visible}
        toggleSidenav={toggleSidenav}
      />
      <Layout
        style={{
          padding: "0 1.5rem 1.5rem",
        }}
      >
        <Row gutter={24} style={{ paddingBottom: "1rem" }}>
          <Col
            lg={{
              span: 0,
            }}
          >
            <Button
              type="link"
              className="sidebar-toggler"
              onClick={() => toggleSidenav()}
            >
              <ToggleIcon />
            </Button>
          </Col>
          <Col>
            <Title level={1} className="playfair-display-black">
              Products
            </Title>
          </Col>
        </Row>
        <Content>
          <Row gutter={[24, 24]}>
            {currentProducts.map((product) => (
              <Col
                key={product.id}
                xs={{ span: 24 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                xxl={{ span: 6 }}
              >
                <Card
                  hoverable
                  cover={<Image src={product.imageUrl} alt={product.name} />}
                >
                  <Card.Meta
                    title={<a href="#">{product.name}</a>}
                    description={
                      <div>
                        <Rate
                          allowHalf
                          defaultValue={product.rating}
                          disabled
                        />
                        {product.reviews}{" "}
                        {product.reviews > 1 ? "reviews" : "review"}
                      </div>
                    }
                  />
                  <div style={{ marginTop: 16 }}>
                    {product.discount > 0 && (
                      <Text
                        type="danger"
                        style={{ textDecoration: "line-through" }}
                      >
                        Rs. {product.originalPrice.toFixed(2)}
                      </Text>
                    )}
                    <Text style={{ fontSize: 20 }}>
                      Rs. {product.price.toFixed(2)}
                    </Text>
                  </div>
                  <Space style={{ marginTop: 16 }}>
                    {product.colors &&
                      product.colors.map((color) => (
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
                              color === selectedColor
                                ? `0.125rem solid #353839`
                                : `0.125rem solid transparent`,
                          }}
                        />
                      ))}
                    {product.sizes && (
                      <Select
                        defaultValue={product.sizes[0]}
                        value={selectedSize}
                        onChange={handleSizeChange}
                        style={{ width: 120 }}
                      >
                        {product.sizes.map((size) => (
                          <Option key={size} value={size}>
                            {size}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Space>
                  <Button type="primary" block style={{ marginTop: 16 }}>
                    Add to Cart
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            {filteredProducts.length > 0 && (
              <Space>
                <Button
                  value={currentPage - 1}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {Array.from(
                  {
                    length: Math.ceil(
                      filteredProducts.length / productsPerPage
                    ),
                  },
                  (_, index) => (
                    <Button
                      key={index + 1}
                      value={index + 1}
                      onClick={() => paginate(index + 1)}
                      style={{
                        backgroundColor:
                          currentPage === index + 1 ? "#1890ff" : "white",
                        color: currentPage === index + 1 ? "white" : "#1890ff",
                      }}
                    >
                      {index + 1}
                    </Button>
                  )
                )}
                <Button
                  onClick={() =>
                    paginate(
                      Math.ceil(filteredProducts.length / productsPerPage)
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredProducts.length / productsPerPage)
                  }
                >
                  Next
                </Button>
              </Space>
            )}
          </div>
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <Text>No products found.</Text>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductsPage;
