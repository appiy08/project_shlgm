import { Button, Card, Carousel } from "antd";
// End Imports

const HomeCollectionSlides = () => {
  return (
    <>
      <section className="section-home-collection">
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
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]}
          className="home-collection-slides"
        >
          <div>
            <Card
              hoverable
              className="collection-card"
              cover={
                <img
                  alt="collection-img-1"
                  src="public/images/shop/collection-img-1.jpg"
                />
              }
            >
              <div className="collection-card-content">
                <Button type="primary">DRESSES</Button>
              </div>
            </Card>
          </div>
          <div>
            <Card
              hoverable
              className="collection-card"
              cover={
                <img
                  alt="collection-img-2"
                  src="public/images/shop/collection-img-2.jpg"
                />
              }
            >
              <div className="collection-card-content">
                <Button type="primary">CLOTHING</Button>
              </div>
            </Card>
          </div>
          <div>
            <Card
              hoverable
              className="collection-card"
              cover={
                <img
                  alt="collection-img-3"
                  src="public/images/shop/collection-img-3.jpg"
                />
              }
            >
              <div className="collection-card-content">
                <Button type="primary">SHOES</Button>
              </div>
            </Card>
          </div>
          <div>
            <Card
              hoverable
              className="collection-card"
              cover={
                <img
                  alt="collection-img-4"
                  src="public/images/shop/collection-img-4.jpg"
                />
              }
            >
              <div className="collection-card-content">
                <Button type="primary">ACCESSORIES</Button>
              </div>
            </Card>
          </div>
        </Carousel>
      </section>
    </>
  );
};

HomeCollectionSlides.propTypes = {};

export default HomeCollectionSlides;
