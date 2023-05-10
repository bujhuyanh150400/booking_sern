import { connect } from "react-redux";
import Header from "../Header/Home";
import MenuNav from "../Header/Home/MenuNav";

import styles from "./DataSpecialty.module.scss";
import * as actions from "../../store/actions";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AnimatedShowMore from "react-animated-show-more";
import { FormattedMessage } from "react-intl";
import Loading from "../../components/Loading";
import { useHistory } from "react-router";
import { path } from "../../utils";

const DataSpecialty = (props) => {
  let { loadTopSpecialtiesRedux, topSpecialtiesRedux } = props;
  // State
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  let history = useHistory();
  const handleViewDetailSpecialty = (data) => {
    history.push(`${path.DETAIL_SPECIALTY_ID}${data.id}`);
  };
  // Trở về đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // fire dispatch để lấy dữ liệu
  useEffect(() => {
    loadTopSpecialtiesRedux();
  }, []);
  // Lấy data
  useEffect(() => {
    setLoading(true);
    if (topSpecialtiesRedux) {
      setLoading(false);
      setData(topSpecialtiesRedux);
    }
  }, [topSpecialtiesRedux]);
  return (
    <>
      {loading && <Loading />}
      {/* Header */}
      <Header />
      {/* Body */}
      <div className={styles.body}>
        <div className={styles.left}>
          <MenuNav specialty={true} />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              <FormattedMessage id="homePage.body.specialties.title" />
            </h1>
            <p className={styles.param}>
              <FormattedMessage id="homePage.body.specialties.param1" />
            </p>
            <p className={styles.param}>
              <FormattedMessage id="homePage.body.specialties.param2" />
            </p>
          </div>
          <div className={styles.specialties_holder}>
            {data &&
              data.length > 0 &&
              data.map((item, index) => {
                return (
                  <div key={index} className={styles.card}>
                    <img
                      className={styles.img_holder}
                      src={item?.image}
                      alt="specialty"
                    ></img>
                    <div className={styles.content}>
                      <div className={styles.name_detail}>
                        <h1 className={styles.name}>{item?.name}</h1>
                        <div className={styles.detail_holder}>
                          <AnimatedShowMore
                            height={0}
                            toggle={({ isOpen }) =>
                              isOpen ? (
                                <FormattedMessage id="close" />
                              ) : (
                                <FormattedMessage id="seemore" />
                              )
                            }
                            speed={100}
                          >
                            <div
                              className={styles.detail}
                              dangerouslySetInnerHTML={{
                                __html: item.contentHTMLIntro,
                              }}
                            ></div>
                          </AnimatedShowMore>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleViewDetailSpecialty(item)}
                        className={styles.booking_btn}
                      >
                        <FormattedMessage id="homePage.body.specialties.booking" />
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    topSpecialtiesRedux: state.home.topSpecialties,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopSpecialtiesRedux: () => dispatch(actions.fetchTopSpecialtiesStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataSpecialty);
