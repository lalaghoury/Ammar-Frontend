import "./HomePage.scss";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <Footer />
    </div>
  );
};

export default HomePage;
