import "./HeroSection.scss";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="hero-section">
      {auth?.user ? (
        <>
          <h1>Welcome back, {auth?.user?.name}</h1>
          <p>Your role is {auth?.user?.role}</p>
          <p className="sub_role">Your sub role is {auth?.user?.sub_role}</p>
        </>
      ) : (
        <h1>Welcome to our store</h1>
      )}
    </div>
  );
};

export default HeroSection;
