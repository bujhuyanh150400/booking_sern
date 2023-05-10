import { connect } from "react-redux";
import styles from "./Header.module.scss";

import {
  Container,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import * as actions from "../../../store/actions";
import logo from "../../../assets/images/logo/logo-no-background.svg";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import LanguageIcon from "@mui/icons-material/Language";
import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";
import { LANGUAGES, USER_ROLE, path } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions/appActions";
import { useEffect, useState } from "react";
import _ from "lodash";
import { styled, alpha } from "@mui/material/styles";

// Custom setting menu
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 12,
    marginTop: theme.spacing(1),
    minWidth: 150,
    border: "1px solid #93c4e4",
    color: "#0f2650",

    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

    "& .MuiMenuItem-root": {
      "> a": {
        fontWeight: 500,
        "&:hover": {
          color: "#93c4e4",
        },
      },
      "& .MuiSvgIcon-root": {
        fontSize: 14,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
      "&:hover": {
        color: "#93c4e4",
      },
    },
  },
}));

// Header
const HomeHeader = (props) => {
  // Props
  let { isLoggedIn, changeLanguageAppRedux, userInfo, processLogout } = props;

  // State
  // state login
  // state menu setting
  const [menuSetting, setMenuSetting] = useState(false);
  // state menu
  const [menu, setMenu] = useState("");

  useEffect(() => {
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        setMenu(path.SYSTEM);
      } else if (role === USER_ROLE.DOCTOR) {
        setMenu(path.DOCTOR);
      } else if (role === USER_ROLE.PATIENT) {
        setMenu(path.PATIENT);
      }
    }
  }, [userInfo]);
  // Xử lí bật tắt menu setting
  const handleClickSetting = (e) => {
    setMenuSetting(e.currentTarget);
  };
  const handleCloseSetting = () => {
    setMenuSetting(false);
  };
  const open = Boolean(menuSetting);

  // Chuyển đổi ngôn ngữ
  const changeLanguage = (language) => {
    changeLanguageAppRedux(language);
  };

  let base64 = "";
  if (userInfo && userInfo.image) {
    base64 = userInfo?.image;
  }
  let avatar = new Buffer(base64, "base64").toString("binary");
  return (
    <>
      {/* Navbar */}
      <Container maxWidth="xl" className={styles.navbar}>
        <div className={styles.navbar_container}>
          {/* Bên trái */}
          <div className={styles.navbar_left}>
            {/* logo*/}
            <Link to={path.HOMEPAGE}>
              <img src={logo} alt="logo" className={styles.logo} />
            </Link>
          </div>
          {/* Bên phải */}
          <div className={styles.navbar_right}>
            {isLoggedIn ? (
              // Đã đăng nhập
              <>
                {/* Đã đăng nhập */}
                <Button
                  onClick={handleClickSetting}
                  aria-controls={open ? "menuSettingHeader-login" : undefined}
                  className={styles.btn_setting}
                >
                  <Avatar sx={{ width: 24, height: 24 }} src={avatar}></Avatar>
                  <p>
                    <FormattedMessage id="homePage.navbar.welcome" />
                    {userInfo?.fullname}
                  </p>
                </Button>
                <StyledMenu
                  id="menuSettingHeader-login"
                  anchorEl={menuSetting}
                  open={menuSetting}
                  onClose={handleCloseSetting}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <Link className={styles.nav_setting_link} to={menu}>
                      <FormattedMessage id="homePage.navbar.setting" />
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      changeLanguage(LANGUAGES.VI);
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    Tiếng Việt
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      changeLanguage(LANGUAGES.EN);
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    English
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      processLogout();
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    <FormattedMessage id="homePage.navbar.logout" />
                  </MenuItem>
                </StyledMenu>
              </>
            ) : (
              // Chưa đăng nhập
              <>
                <Button
                  onClick={handleClickSetting}
                  aria-controls={open ? "menuSettingHeader" : undefined}
                  className={styles.btn_setting}
                >
                  <PersonIcon />
                  <FormattedMessage id="homePage.navbar.login" />
                </Button>
                <StyledMenu
                  id="menuSettingHeader"
                  anchorEl={menuSetting}
                  open={menuSetting}
                  onClose={handleCloseSetting}
                >
                  {/* đăng nhập */}
                  <MenuItem
                    onClick={() => {
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <Link className={styles.nav_setting_link} to={path.LOGIN}>
                      <FormattedMessage id="homePage.navbar.login" />
                    </Link>
                  </MenuItem>
                  {/* Đăng kí */}
                  <MenuItem>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <Link className={styles.nav_setting_link} to={path.SIGNUP}>
                      <FormattedMessage id="homePage.navbar.signup" />
                    </Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      changeLanguage(LANGUAGES.VI);
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    Tiếng Việt
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      changeLanguage(LANGUAGES.EN);
                      handleCloseSetting();
                    }}
                  >
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    English
                  </MenuItem>
                </StyledMenu>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => {
      dispatch(changeLanguageApp(language));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
