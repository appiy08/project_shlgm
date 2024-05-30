import {
  Checkbox,
  Collapse,
  Drawer,
  InputNumber,
  Layout,
  Select,
  Slider,
  Space
} from "antd";
import PropTypes from "prop-types";
// End Imports
const { Sider } = Layout;
const { Option } = Select;

export const Sidenav = ({
  selectedBrand,
  handleBrandChange,
  selectedColor,
  handleColorChange,
  selectedSize,
  handleSizeChange,
  selectedPriceRange,
  handlePriceChange,
  showInStockOnly,
  handleInStockChange,
}) => {
  const items = [
    {
      key: "1",
      label: "Availability",
      children: (
        <Checkbox
          style={{ marginTop: 16 }}
          value={showInStockOnly}
          onChange={handleInStockChange}
        >
          In Stock Only
        </Checkbox>
      ),
    },
    {
      key: "2",
      label: "Price",
      children: (
        <>
          <Slider
            range
            defaultValue={selectedPriceRange}
            min={0}
            max={100000}
            onChange={handlePriceChange}
            style={{ width: "100%" }}
          />
          <Space>
            <InputNumber
              min={0}
              max={100000}
              value={selectedPriceRange[0]}
              onChange={(value) =>
                handlePriceChange([value, selectedPriceRange[1]])
              }
            />
            <InputNumber
              min={0}
              max={100000}
              value={selectedPriceRange[1]}
              onChange={(value) =>
                handlePriceChange([selectedPriceRange[0], value])
              }
            />
          </Space>
        </>
      ),
    },
    {
      key: "3",
      label: "Color",
      children: (
        <Select
          placeholder="Select a Color"
          value={selectedColor}
          onChange={handleColorChange}
        >
          <Option value={null}>All Colors</Option>
          {["#f5f5f5", "#d4ac0d"].map((color) => (
            <Option key={color} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "4",
      label: "Size",
      children: (
        <Select
          placeholder="Select a Size"
          value={selectedSize}
          onChange={handleSizeChange}
        >
          <Option value={null}>All Sizes</Option>
          {["S", "M", "L"].map((size) => (
            <Option key={size} value={size}>
              {size}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      key: "5",
      label: "Brand",
      children: (
        <Select
          style={{ width: "100%" }}
          placeholder="Select a Brand"
          value={selectedBrand}
          onChange={handleBrandChange}
        >
          <Option key={null} value={null}>
            All Brands
          </Option>
          {[
            ...new Set(
              [
                "Akatsuki Store",
                "Akaza Store",
                "Lulu Store",
                "SE Store",
                "Wpbingo",
              ].map((brand) => (
                <Option key={brand} value={brand}>
                  {brand}
                </Option>
              ))
            ),
          ]}
        </Select>
      ),
    },
  ];

  return (
    <>
      <Collapse
        ghost
        items={items}
        defaultActiveKey={["1", "2", "3", "4", "5"]}
        expandIconPosition="end"
      />
      ;
    </>
  );
};

Sidenav.propTypes = {
  selectedBrand: PropTypes.string,
  handleBrandChange: PropTypes.func,
  selectedColor: PropTypes.string,
  handleColorChange: PropTypes.func,
  selectedSize: PropTypes.string,
  handleSizeChange: PropTypes.func,
  selectedPriceRange: PropTypes.number,
  handlePriceChange: PropTypes.func,
  showInStockOnly: PropTypes.bool,
  handleInStockChange: PropTypes.func,
};

const ProductsPageSidenav = (props) => {
  const { visible, toggleSidenav } = props;
  return (
    <>
      <Drawer
        title={false}
        placement={"left"}
        closable={true}
        onClose={toggleSidenav}
        open={visible}
        key={"left"}
        width={300}
        getContainer={false}
      >
        <Layout>
          <Sider trigger={null} theme="light" width={250}>
            <Sidenav {...props} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        theme="light"
        width={300}
      >
        <Sidenav {...props} />
      </Sider>
    </>
  );
};

ProductsPageSidenav.propTypes = {
  visible: PropTypes.bool,
  toggleSidenav: PropTypes.func,
};

export default ProductsPageSidenav;
