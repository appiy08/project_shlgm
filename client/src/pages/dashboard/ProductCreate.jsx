import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import { get, map } from "lodash";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { productCreate } from "../../lib/actions/product";
import ColorsList from "../../lib/data/ColorsList.json";
import LuxuryBrandsList from "../../lib/data/LuxuryBrandsList.json";
import LuxuryGoodsCategoriesList from "../../lib/data/LuxuryGoodsCategoriesList.json";
import ProductConditionsList from "../../lib/data/ProductConditionsList.json";
import { imageUpload } from "../../lib/actions/common/imageUpload";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
// End Imports
const { Title, Text } = Typography;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
  },
};

const ProductCreate = () => {
  const [form] = Form.useForm();
  const { auth_credentials } = useAuthContext();

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);


  const handleColorChange = (value) => {
    const newColors = [...colors];
    const index = newColors.indexOf(value);
    if (index !== -1) {
      newColors.splice(index, 1);
    } else {
      newColors.push(value);
    }
    setColors(newColors);
  };

  const handleUpload = async (e) => {
    console.log("file ::>>", e);
    const formData = new FormData();
    // formData.append("image", file);

    await imageUpload(formData)
      .then((response) => {
        message.success("Upload successful!");
        console.log("Image URL:", response.data.imageUrl);
        setImages((prevState) => [...prevState, get(response, "data.imageUrl", "")]);
      })
      .catch((error) => {
        message.error("Upload failed.");
        console.log("error ::", error);
      });
  };

  const handleSubmit = async (values) => {
    const formData = { ...values, seller: get(auth_credentials, "_id", "") };
    console.log("formData :>:>", formData);
    try {
      const response = await productCreate(formData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={2}>Product Add</Title>
          </Col>
          <Col span={24}>
            <Form
              {...formItemLayout}
              layout="vertical"
              form={form}
              name="product_create_form"
              onFinish={handleSubmit}
              initialValues={{ rating: 0, reviews: 0 }}
              requiredMark={false}
              scrollToFirstError
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter product name",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please enter product price",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Original Price"
                name="originalPrice"
                rules={[
                  {
                    required: true,
                    message: "Please enter original price",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Discount"
                name="discount"
                rules={[
                  {
                    required: true,
                    message: "Please enter discount",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Colors"
                name="colors"
                rules={[
                  {
                    required: true,
                    message: "Please select colors",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  onChange={handleColorChange}
                >
                  {map(ColorsList, (data, index) => {
                    return (
                      <Option key={index} value={get(data, "value", "")}>
                        <Flex justify="space-between" gap={8}>
                          <Text>{get(data, "name", "")}</Text>
                          <Space />
                          <span
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              borderRadius: "50%",
                              backgroundColor: get(data, "value", ""),
                              border: ".1rem solid #353839",
                            }}
                          />
                        </Flex>
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Sizes"
                name="sizes"
                rules={[
                  {
                    required: true,
                    message: "Please select sizes",
                  },
                ]}
              >
                <Select mode="multiple">
                  <Option value="xs">XS</Option>
                  <Option value="s">S</Option>
                  <Option value="m">M</Option>
                  <Option value="l">L</Option>
                  <Option value="xl">XL</Option>
                  <Option value="xxl">XXL</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Brand"
                name="brand"
                rules={[
                  {
                    required: true,
                    message: "Please enter brand",
                  },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  {map(LuxuryBrandsList, (data, index) => {
                    return (
                      <Option key={index} value={get(data, "name", "")}>
                        {get(data, "name", "")}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please enter category",
                  },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  {map(LuxuryGoodsCategoriesList, (data, index) => {
                    return (
                      <Option key={index} value={get(data, "name", "")}>
                        {get(data, "name", "")}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Condition"
                name="condition"
                rules={[
                  {
                    required: true,
                    message: "Please enter condition",
                  },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  {map(ProductConditionsList, (data, index) => {
                    return (
                      <Option key={index} value={get(data, "name", "")}>
                        {get(data, "name", "")}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please enter gender",
                  },
                ]}
              >
                <Select style={{ width: "100%" }}>
                  <Option value="men">Men</Option>
                  <Option value="women">Women</Option>
                  <Option value="unisex">Unisex</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="In Stock"
                name="inStock"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: "Please select in stock status",
                  },
                ]}
              >
                <Checkbox />
              </Form.Item>

              <Form.Item
                label="Images"
                name="images"
                rules={[
                  {
                    required: true,
                    message: "Please select images",
                  },
                ]}
              >
                <Upload.Dragger
                  name="images"
                  multiple={true}
                  fileList={images}
                  customRequest={handleUpload}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag files to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Upload.Dragger>
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter description",
                  },
                ]}
              >
                <ReactQuill className="product-description-editor" />
              </Form.Item>

              <Form.Item className="mt-25">
                <Button type="primary" htmlType="submit">
                  Create Product
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};

ProductCreate.propTypes = {};

export default ProductCreate;
