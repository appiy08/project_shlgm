import { Button, Carousel, Typography } from "antd";
// End Imports
const { Title, Text } = Typography;

const HomeSlideshow = () => {
  return (
    <>
      <section className="section-home-banner">
        <Carousel
          arrows={true}
          infinite={false}
          autoplay={false}
          lazyLoad={true}
          fade={true}
          effect="fade"
          className="hb-slideshow"
        >
          <div>
            <div className="hb-slideshow-slide">
              <img
                src="images/shop/fashion-slide-1.webp"
                alt="fashion-slide-bg-1"
                className="hb-slideshow-bg"
              />
              <div className="hb-slideshow-caption">
                <Text className="hb-slideshow-caption-subheading">
                  TRANSPARENT. HONEST. REVOLUTIONARY.
                </Text>
                <Title level={2} className="hb-slideshow-caption-heading">
                  Summer Collection
                </Title>
                <Button type="primary" className="hb-slideshow-caption-btn">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="hb-slideshow-slide">
              <img
                src="images/shop/fashion-slide-4.jpg"
                alt="fashion-slide-bg-1"
                className="hb-slideshow-bg"
              />
              <div className="hb-slideshow-caption">
                <Text className="hb-slideshow-caption-subheading">
                  TRANSPARENT. HONEST. REVOLUTIONARY.
                </Text>
                <Title level={2} className="hb-slideshow-caption-heading">
                  Spring Collection
                </Title>
                <Button type="primary" className="hb-slideshow-caption-btn">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="hb-slideshow-slide">
              <img
                src="images/shop/fashion-slide-5.jpg"
                alt="fashion-slide-bg-1"
                className="hb-slideshow-bg"
              />
              <div className="hb-slideshow-caption">
                <Text className="hb-slideshow-caption-subheading">
                  30% off all order.
                </Text>
                <Title level={2} className="hb-slideshow-caption-heading">
                  New Arrivals
                </Title>
                <Button type="primary" className="hb-slideshow-caption-btn">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="hb-slideshow-slide">
              <img
                src="images/shop/fashion-slide-3.webp"
                alt="fashion-slide-bg-1"
                className="hb-slideshow-bg"
              />
              <div className="hb-slideshow-caption">
                <Text className="hb-slideshow-caption-subheading">
                  30% off all order.
                </Text>
                <Title level={2} className="hb-slideshow-caption-heading">
                  oh, Hello Neweness!
                </Title>
                <Button type="primary" className="hb-slideshow-caption-btn">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </Carousel>
      </section>
    </>
  );
};
export default HomeSlideshow;
