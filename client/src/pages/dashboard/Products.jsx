import {
  Button,
  Card,
  Col,
  Input,
  Pagination,
  Row,
  Segmented,
  Typography,
} from "antd";
import { useState } from "react";
import ProductCard from "../../Components/Dashboard/Pages/ProductCard";
import { useNavigate } from "react-router-dom";
// End Imports
const { Title } = Typography;

const products = [
  {
    id: 1,
    name: "Nike Downshifter 12",
    price: "819,000",
    stock: 975,
    sold: 768,
    category: "Running",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/94563d6a-2777-4d4e-b49f-5726c3f8fa27/downshifter-12-running-shoe-2R5nQ5.jpg",
  },
  {
    id: 2,
    name: "Compass Retrograde High Top",
    price: "668,000",
    stock: 494,
    sold: 341,
    category: "Basketball",
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/57654d4f099b482a927a007400717460_9366/compass-retrograde-high-top-shoes.jpg",
  },
  {
    id: 3,
    name: "Adidas Superstar XLG Green",
    price: "2,000,000",
    stock: 624,
    sold: 489,
    category: "Football",
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/3e55367e3b5346e4802c007400742300_9366/superstar-xl-g-shoes.jpg",
  },
  {
    id: 4,
    name: "Vans Old Skool Shoe",
    price: "1,100,000",
    stock: 488,
    sold: 217,
    category: "Fun Sneakers",
    image:
      "https://assets.vans.com/is/image/Vans/vn0a4uv9xqx-blk-blk?$PDP_GALLERY_L$",
  },
  {
    id: 5,
    name: "Nike Air Max 90",
    price: "1,500,000",
    stock: 800,
    sold: 500,
    category: "Running",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a6232e0d-5394-4071-b688-348114348e6c/air-max-90-mens-shoe-0428r4.jpg",
  },
  {
    id: 6,
    name: "Nike Air Max Pulse",
    price: "1,200,000",
    stock: 700,
    sold: 400,
    category: "Running",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e2427170-f472-4703-9d89-377761fa35f0/air-max-pulse-mens-shoe-8S4c0w.jpg",
  },
  {
    id: 7,
    name: "Nike Air Force 1'07",
    price: "1,300,000",
    stock: 600,
    sold: 300,
    category: "Basketball",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/38a4403b-69b2-4d88-a3a3-821e69311a95/air-force-1-07-mens-shoe-F9R9gB.jpg",
  },
  {
    id: 8,
    name: "Nike Air Max 97",
    price: "1,400,000",
    stock: 500,
    sold: 200,
    category: "Running",
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3a605a6d-928b-4513-8599-c6a435a748bf/air-max-97-mens-shoe-4N9T65.jpg",
  },
];

const categoryOptions = [
  { label: "All products", value: "all" },
  { label: "Accessories", value: "accessories" },
  { label: "Clothing", value: "clothing" },
  { label: "Shoes", value: "shoes" },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [productsToDisplay, setProductsToDisplay] = useState(products);
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
    let filteredProducts = products;
    if (value !== "all") {
      filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === value.toLowerCase()
      );
    }
    setProductsToDisplay(filteredProducts);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const filteredProducts = productsToDisplay.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                options={categoryOptions}
                value={selectedCategory}
                onChange={handleCategoryChange}
              />
              ;
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            {filteredProducts
              .slice(
                (currentPage - 1) * pageSize,
                (currentPage - 1) * pageSize + pageSize
              )
              .map((product) => (
                <Col key={product.id} span={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col span={24} style={{ marginTop: "1.5rem" }}>
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={pageSize}
          />
          ;
        </Col>
      </Row>
    </Card>
  );
};

export default Products;
