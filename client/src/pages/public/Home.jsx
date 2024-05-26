import HomeCollectionSlides from "../../Components/Public/Pages/Home/HomeCollectionSlides";
import HomeNewArrivals from "../../Components/Public/Pages/Home/HomeNewArrivals";
import HomeSlideshow from "../../Components/Public/Pages/Home/HomeSlideshow";
import HomeVidContainer from "../../Components/Public/Pages/Home/HomeVidContainer";
// End Imports

const Home = () => {
  return (
    <>
      <HomeSlideshow />
      <HomeCollectionSlides/>
      <HomeNewArrivals/>
      <HomeVidContainer/>
    </>
  );
};
export default Home;
