import { Button, Col, Layout, Row, Space, Spin, Typography } from "antd";
import { get, map, size } from "lodash";
import { useEffect, useState } from "react";
import { ToggleIcon } from "../../assets/dashboard/icons";
import ProductCard from "../../Components/Common/ProductCard";
import ProductsPageSidenav from "../../Components/Public/Pages/Products/ProductsPageSidenav";
import { productsGet } from "../../lib/actions/product";
// End Imports
const { Title, Text } = Typography;
const { Content } = Layout;

const ProductsPage = () => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      setFetchLoading(true);
      try {
        const response = await productsGet();
        const data = get(response, "data");
        setProducts(data);
        setFilteredProducts(data);
        setFetchLoading(false);
      } catch (error) {
        console.error(error);
        setFetchLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // const handleFilterChange = (filterValue) => {
  //   const filteredData = products.filter((product) => {
  //     // implement your filtering logic here
  //     return product.name.includes(filterValue);
  //   });
  //   setFilteredProducts(filteredData);
  // };


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
            {fetchLoading && size(filteredProducts) > 0 ? (
              <Col span={24} style={{ textAlign: "center" }}>
                <Spin />
              </Col>
            ) : (
              map(filteredProducts, (data, index) => {
                console.log("Rendering product card for:", data);
                return (
                  <Col
                    key={get(data, "_id", index)}
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    xxl={{ span: 6 }}
                  >
                    <ProductCard
                      key={index}
                      product={data}
                      selectedColor={selectedColor}
                      handleColorChange={handleColorChange}
                      selectedSize={selectedSize}
                      handleSizeChange={handleSizeChange}
                    />
                  </Col>
                );
              })
            )}
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
