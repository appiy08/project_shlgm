import { Flex, Typography } from "antd";
// End Imports
const { Title, Text } = Typography;

const HomeVidContainer = () => {
  return (
    <section className="section-home-video-background">
      <div className="home-video-background-inner">
        <video loop="loop" autoPlay="autoplay" muted="muted" src="public/video/home-video-HD-1080p-11055990.mp4"></video>
        <Flex className="home-video-background-content" vertical justify="center" align="center" gap={8}>
          <Text>SALE UP TO 30% OFF</Text>
          <Title type="h2" style={{margin:0}}>New arrivals</Title>
          <Text strong>Retro florals, classic polka dots & sunny</Text>
        </Flex>
      </div>
    </section>
  );
};

export default HomeVidContainer;
