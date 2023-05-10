import { connect } from "react-redux";
import styles from "./NoResponsive.module.scss";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
const NoResponsive = (props) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.body}>
          <FormattedMessage id="nores"/>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NoResponsive);
