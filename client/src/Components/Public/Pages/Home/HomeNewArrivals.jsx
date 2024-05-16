import { Button, Card, Carousel, Popover, Typography } from "antd";
import { map } from "lodash";
import AddToCartBtnBox from "../../../Common/AddToCartBtn";
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
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ]}
          className="home-new-arrivals-slides"
        >
          {map(NewArrivalsData, (item, index) => {
            return (
              <div key={index}>
                <Card
                  className="product-arrival-card"
                  cover={
                    <>
                      {map(item?.images, (img, imgIdx) => {
                        if (imgIdx < 2) {
                          return (
                            <img
                              key={imgIdx}
                              alt={`product-img-${imgIdx}`}
                              src={img}
                              width={323}
                              height={489}
                              className={`product-cover-img-${imgIdx + 1} fade-in`}
                            />
                          );
                        } else {
                          return null;
                        }
                      })}
                      <div className="product-hover-content fade-in">
                        <Popover
                          content={AddToCartBtnBox}
                          trigger="click"
                          arrow={false}
                        >
                          <Button
                            key="select_option"
                            type="primary"
                            size="large"
                            block
                          >
                            Select option
                          </Button>
                        </Popover>
                      </div>
                    </>
                  }
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
