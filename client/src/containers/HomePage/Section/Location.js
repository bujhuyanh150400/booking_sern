import { connect } from "react-redux";
import styles from "../HomePage.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// Import Swiper styles
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import { NextArrow, PrevArrow } from "../../../components/CustomSlickArrow";
import * as actions from "../../../store/actions";
import { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { path } from "../../../utils";
import { Link } from "react-router-dom";

const Location = (props) => {
  const { fetchClinicRedux, dataAllClinic } = props;
  // Lấy data clinic
  useEffect(() => {
    fetchClinicRedux();
  }, []);
  // Hiển thị chi tiết phòng khám
  const clinics = dataAllClinic.rows;
  const swiperRef = useRef();
  return (
    <div className={styles.location}>
      <h1 className={styles.location_title}>
        <FormattedMessage id="homePage.body.location.title" />
      </h1>
      <div className={styles.location_container}>
        <Swiper
          className={styles.location_content}
          spaceBetween={20}
          slidesPerView={4}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {clinics &&
            clinics.length > 0 &&
            clinics.map((item, index) => {
              return (
                <SwiperSlide key={index} className={styles.location_box}>
                  <div className={styles.location_img_holder}>
                    <img
                      src={item.image}
                      alt="location"
                      className={styles.location_img}
                    />
                    <Link
                      to={`${path.DETAIL_CLINIC_ID}${item.id}`}
                      className={styles.location_btn}
                    >
                      <FormattedMessage id="seemore"/>
                    </Link>
                  </div>
                  <div className={styles.location_content}>
                    <h3>{item.name}</h3>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <PrevArrow onClick={() => swiperRef.current?.slidePrev()} />
        <NextArrow onClick={() => swiperRef.current?.slideNext()} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataAllClinic: state.system.dataAllClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Location);
