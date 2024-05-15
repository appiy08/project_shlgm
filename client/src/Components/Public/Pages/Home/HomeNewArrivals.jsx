import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Card, Carousel, Typography } from "antd";
import { map } from "lodash";
import RichText from "../../../Common/RichText";
// End Imports
const { Title } = Typography;

const HomeNewArrivals = () => {
  return (
    <>
      <section className="section-home-new-arrivals">
        <Carousel
          dots={false}
          arrows={true}
          slidesToShow={4}
          slidesToScroll={4}
          infinite={false}
          className="home-collection-slides"
        >
          {map(NewArrivalsData, (item, index) => {
            return (
              <div key={index}>
                <Card
                  className="collection-card"
                  cover={<img alt="collection-img-1" src={item.images[0]} />}
                >
                  <Title level={5}>{item.title}</Title>
                  
                  <RichText
                    delete
                    price={item.discountedPrice}
                    currency={"INR"}
                    style={{ paddingLeft: 8 }}
                  />
                  <RichText
                    type="primary"
                    price={item.price}
                    currency={"INR"}
                    style={{ paddingLeft: 8 }}
                  />
                   <Button key="select_option" block style={{marginTop:12}}>Select option</Button>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </section>
    </>
  );
};

export default HomeNewArrivals;

const NewArrivalsData = [
  {
    images: ["public/images/product/7.jpg", "public/images/product/7.1.jpg"],
    title: "AL Fonso Dress (UpSell)",
    price: "5845.00",
    discountedPrice: "6263.00",
  },
  {
    images: ["public/images/product/7.jpg", "public/images/product/7.1.jpg"],
    title: "Bought Together",
    price: "6263.00",
    discountedPrice: "7516.00",
  },
  {
    images: ["public/images/product/7.jpg", "public/images/product/7.1.jpg"],
    title: "Cascata Wide - Brim Hat",
    price: "6681.00",
    discountedPrice: "6681.00",
  },
  {
    images: ["public/images/product/7.jpg", "public/images/product/7.1.jpg"],
    title: "Cleo Mini Dress",
    price: "6681.00",
    discountedPrice: "6681.00",
  },
];
