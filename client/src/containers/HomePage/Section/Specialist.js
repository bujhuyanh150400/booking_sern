import { connect } from "react-redux";
import styles from "../HomePage.module.scss";
import clsx from "clsx";
import { Col, Row } from "reactstrap";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";
import { useEffect, useRef } from "react";
import { path } from "../../../utils";
import { Button } from "@mui/material";

import * as actions from "../../../store/actions";

const Specialist = (props) => {
  let history = useHistory();
  // props
  const { topSpecialtiesRedux } = props;

  // Load info chuyên khoa
  useEffect(() => {
    props.loadTopSpecialtiesRedux();
  }, []);
  let topSpecialties = topSpecialtiesRedux;

  const handleViewDetailSpecialty = (data) => {
    history.push(`${path.DETAIL_SPECIALTY_ID}${data.id}`);
  };

  return (
    <div className={clsx(styles.specialist, "section_page")}>
      <h1 className={styles.specialist_title}>
        <FormattedMessage id="homePage.body.specialties.title" />
      </h1>
      <div className={styles.specialist_container}>
        <Row xs="1" sm="2" md="4" className={styles.specialist_content}>
          {topSpecialties &&
            topSpecialties.length > 0 &&
            topSpecialties.map((item, index) => {
              return (
                <Col key={index} className={styles.specialist_box}>
                  <div className={styles.specialist_img_holder}>
                    <img
                      src={item?.image}
                      alt="specialist"
                      className={styles.specialist_img}
                    />
                    <Button
                      onClick={() => handleViewDetailSpecialty(item)}
                      className={styles.specialist_btn}
                    >
                      <FormattedMessage id="homePage.body.specialties.detail" />
                    </Button>
                  </div>
                  <div className={styles.specialist_content}>
                    <h3>{item?.name}</h3>
                  </div>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialist);
