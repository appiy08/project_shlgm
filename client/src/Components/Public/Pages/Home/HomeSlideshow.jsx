import { Button, Carousel, Typography } from "antd";
import { useNavigate } from "react-router-dom";
// End Imports
const { Title, Text } = Typography;

const HomeSlideshow = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="section-home-banner">
        <Carousel
          arrows={true}
          infinite={false}
          autoplay={true}
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
                <Text className="hbsc-subheading">
                  TRANSPARENT. HONEST. REVOLUTIONARY.
                </Text>
                <Title level={2} className="hbsc-heading">
                  Summer Collection
                </Title>
                <Button
                  type="primary"
                  className="hbsc-btn"
                  onClick={() => navigate("/products")}
                >
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
                <Text className="hbsc-subheading">
                  TRANSPARENT. HONEST. REVOLUTIONARY.
                </Text>
                <Title level={2} className="hbsc-heading">
                  Spring Collection
                </Title>
                <Button
                  type="primary"
                  className="hbsc-btn"
                  onClick={() => navigate("/products")}
                >
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
                <Text className="hbsc-subheading">30% off all order.</Text>
                <Title level={2} className="hbsc-heading">
                  New Arrivals
                </Title>
                <Button
                  type="primary"
                  className="hbsc-btn"
                  onClick={() => navigate("/products")}
                >
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
                <Text className="hbsc-subheading">30% off all order.</Text>
                <Title level={2} className="hbsc-heading">
                  oh, Hello Neweness!
                </Title>
                <Button
                  type="primary"
                  className="hbsc-btn"
                  onClick={() => navigate("/products")}
                >
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
