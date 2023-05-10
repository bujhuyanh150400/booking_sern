import { connect } from "react-redux";
import styles from "./HomePage.module.scss";

// Section cho trang chủ
import Header from "../Header/Home";
import MenuNav from "../Header/Home/MenuNav";
import Banner from "./Section/Banner";
import Specialist from "./Section/Specialist";
import Location from "./Section/Location";
import FeaturedDoctor from "./Section/FeaturedDoctor";
import About from "./Section/About";
import Footer from "../Footer/Footer";
import { useEffect } from "react";

const HomePage = (props) => {
  // Trở về đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={styles.homePage}>
      {/* Header */}

      <Header />
      {/* Body */}
      <div className={styles.body}>
        <div className={styles.left}>
          <MenuNav home={true} />
        </div>
        <div className={styles.right}>
          {/* Banner */}
          <Banner />
          {/* Chuyên khoa */}
          <Specialist />
          {/* Cơ sở y tế nổi bật */}
          <Location />
          {/* Bác sĩ nổi bật tuần qua */}
          <FeaturedDoctor />
          {/* Giới thiệu */}
          <About />
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
