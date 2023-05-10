import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "../HomePage.module.scss";
import clsx from "clsx";
import {
  NextArrowBanner,
  PrevArrowBanner,
} from "../../../components/CustomSlickArrow";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import * as actions from "../../../store/actions";
import { LANGUAGES, path } from "../../../utils";
// img
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const FeaturedDoctor = (props) => {
  // Swiper
  // useHistory dùng để thay đổi url
  let history = useHistory();
  const swiperRef = useRef();
  // Ngôn ngữ
  const { language } = props;
  // Load info doctor
  useEffect(() => {
    props.loadTopDoctorRedux();
  }, []);
  let topDoctors = props.topDoctorRedux;
  // hiển thị chi tiết doctor
  const handleViewDetailDoctor = (data) => {
    history.push(`${path.DETAIL_DOCTOR_ID}${data.id}`);
  };
  return (
    <div className={clsx(styles.featuredDoctor)}>
      <h1 className={styles.featuredDoctor_title}>
        <FormattedMessage id="homePage.body.doctor.title" />
      </h1>
      <div className={styles.featuredDoctor_container}>
        <Swiper
          className={styles.featuredDoctor_content}
          spaceBetween={30}
          slidesPerView={4}
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {topDoctors &&
            topDoctors.length > 0 &&
            topDoctors.map((doctor, index) => {
              let imageBase64;
              if (doctor.image) {
                imageBase64 = new Buffer(doctor.image, "base64").toString(
                  "binary"
                );
              }
              let nameVi = `${doctor.positionData.valueVI}, ${doctor.fullname}`;
              let nameEn = `${doctor.positionData.valueEN}, ${doctor.fullname}`;
              return (
                <SwiperSlide
                  key={index}
                  className={styles.featuredDoctor_box}
                  onClick={() => handleViewDetailDoctor(doctor)}
                >
                  <img
                    src={imageBase64}
                    alt="doctor"
                    className={styles.featuredDoctor_img}
                  />
                  <div className={styles.featuredDoctor_detail}>
                    <h3 className={styles.doctor_name}>
                      {language === LANGUAGES.VI ? nameVi : nameEn}
                    </h3>
                    <p className={styles.doctor_spectialist}>
                      <span>{doctor?.Doctor_info?.Specialty?.name}</span>
                    </p>
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
        <PrevArrowBanner onClick={() => swiperRef.current?.slidePrev()} />
        <NextArrowBanner onClick={() => swiperRef.current?.slideNext()} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    topDoctorRedux: state.home.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctorRedux: () => dispatch(actions.fetchTopDoctorStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedDoctor);
