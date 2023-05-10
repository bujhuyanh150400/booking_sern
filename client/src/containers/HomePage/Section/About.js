import React from "react";
import { connect } from "react-redux";
import styles from "../HomePage.module.scss";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";

const About = () => {
  return (
    <div className={clsx(styles.about)}>
      <h1 className={styles.about_title}>
        <FormattedMessage id="homePage.body.about.title" />
      </h1>
      <div className={styles.about_container}>
        <div className={styles.about_content}>
          <h1>
            <FormattedMessage id="homePage.body.about.about" />
          </h1>
          <p>
            <FormattedMessage id="homePage.body.about.1" />
          </p>
          <p>
            <FormattedMessage id="homePage.body.about.2" />
          </p>
          <p>
            <FormattedMessage id="homePage.body.about.3" />
          </p>
          <p>
            <FormattedMessage id="homePage.body.about.4" />
          </p>
          <p>
            <FormattedMessage id="homePage.body.about.5" />
          </p>
          <p>
            <FormattedMessage id="homePage.body.about.6" />
          </p>
        </div>
        <div className={styles.about_video}>
          <iframe
            src="https://www.youtube.com/embed/FyDQljKtWnI"
            title="video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
