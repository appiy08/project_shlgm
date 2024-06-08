import { Button, Card, Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
// Dependencies End
const { Title } = Typography;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Card className="not-found-page">
      <Flex vertical gap={24} align="center" justify="center" style={{height:'100%'}}>
        <Title level={1} className="playfair-display-bold">
          404 | This Page Could Not Be Found
        </Title>
        <Button type="primary" onClick={() => navigate("/home")}>
          Continue To Home Page
        </Button>
      </Flex>
    </Card>
  );
};

export default NotFoundPage;
