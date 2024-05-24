import { Button, Flex, Typography } from "antd";
// End Imports
const { Title, Text } = Typography;

const HomeVidContainer = () => {
  return (
    <section className="section-home-video-background">
      <div className="home-video-background-inner">
        <Flex className="home-video-background-content" vertical justify="center" align="center">
          <Text className="hvbc-subheading">SALE UP TO 30% OFF</Text>
          <Title level={2} className="hvbc-heading">New arrivals</Title>
          <Text className="hvbc-description">Retro florals, classic polka dots & sunny</Text>
          <div className="hvbc-sub-btn"><Button type="primary" size="large" >SHOP NOW</Button></div>
        </Flex>
        <video playsInline loop="loop" autoPlay="autoplay" muted="muted" src="video/home-video-HD-1080p-11055990.mp4"></video>
      </div>
    </section>
  );
};

export default HomeVidContainer;
