import { connect } from "react-redux";
import styles from "./Loading.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
// Menu
const Loading = (props) => {
  return (
    <>
      <div className={styles.loading_bg}>
        <div className={styles.loading_icon_holder}>
          <CircularProgress />
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
