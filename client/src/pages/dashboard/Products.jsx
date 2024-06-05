import {
  Button,
  Card,
  Col,
  Input,
  Pagination,
  Row,
  Segmented,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Components/Dashboard/Pages/ProductCard";
import { productsGet } from "../../lib/actions/product";
import LuxuryGoodsCategoriesList from "../../lib/data/LuxuryGoodsCategoriesList.json";
import { get, isEmpty } from "lodash";
// End Imports 
const { Title, Text } = Typography;

const Products = () => {
  const navigate = useNavigate();
  const [fetchLoading, setFetchLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProductsToDisplay(filteredProducts);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    handleGetProducts({ category: value });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleGetProducts = async (params = {}) => {
    try {
      setFetchLoading(true);
      const response = await productsGet(params);

      if (get(response, "status", "0") === 200) {
        const productsData = get(response, "data", []);
        setProducts(productsData);
        setProductsToDisplay(productsData);
      }
      setFetchLoading(false);
    } catch (error) {
      console.log("error :>", error);
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts({ category: selectedCategory });
  }, [selectedCategory]);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProductsToDisplay(filteredProducts);
  }, [searchQuery, products]);

  return (
    <Card className="products-page">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row gutter={[12, 12]} justify="space-between">
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Title level={2}>Products</Title>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Row gutter={[24, 24]} justify="end">
                <Col xs={{ span: 24 }} lg={{ span: 12 }}>
                  <Input
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={handleSearch}
                    size="small"
                    prefix={<i className="fas fa-search" />}
                  />
                </Col>
                <Col>
                  <Button
                    type="primary"
                    onClick={() => {
                      navigate("/dashboard/products/create");
                    }}
                  >
                    Add New Product
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Segmented
                options={LuxuryGoodsCategoriesList}
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="products-categories-box"
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {fetchLoading ? (
              <Col span={24}>
                <Spin />
              </Col>
            ) : !isEmpty(productsToDisplay) ? (
              productsToDisplay
                .slice(
                  (currentPage - 1) * pageSize,
                  (currentPage - 1) * pageSize + pageSize
                )
                .map((product) => (
                  <Col
                    key={product.id}
                    xs={{ span: 24 }}
                    md={{ span: 12 }}
                    lg={{ span: 8 }}
                    xxl={{ span: 6 }}
                  >
                    <ProductCard product={product} />
                  </Col>
                ))
            ) : (
              <Col span={24}>
                <Text>No Product Found.</Text>
              </Col>
            )}
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: "1.5rem" }}>
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={productsToDisplay.length}
            pageSize={pageSize}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default Products;
