import HomeCollectionSlides from "../Components/Public/Pages/Home/HomeCollectionSlides";
import HomeNewArrivals from "../Components/Public/Pages/Home/HomeNewArrivals";
import HomeSlideshow from "../Components/Public/Pages/Home/HomeSlideshow";
// End Imports

const Home = () => {
  return (
    <>
      <HomeSlideshow />
      <HomeCollectionSlides/>
      <HomeNewArrivals/>
    </>
  );
};
export default Home;
