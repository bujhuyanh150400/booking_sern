import { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import styles from "./Header.module.scss";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  List,
  IconButton,
  Container,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import Logout from "@mui/icons-material/Logout";
import LanguageIcon from "@mui/icons-material/Language";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { USER_ROLE, path } from "../../../utils";
import {
  adminMenu,
  doctorMenu,
  patientMenu,
} from "../../../containers/Header/System/menuApp";
// Chuyển đổi ngôn ngữ
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions/appActions";
// logo
import _ from "lodash";
import { Link } from "react-router-dom";
import Navigator from "../../../components/Navigator";
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
// Custom navbar
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  background: "#334155",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 0,
  background: "#334155",
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: "66px",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,

  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// Header
const Header = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // Logout, userInfo
  const { processLogout, userInfo } = props;
  const [menuNav, setMenuNav] = useState([]);
  // Ngôn ngữ
  const changeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };
  // Phân quyền menu
  useEffect(() => {
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      } else if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      } else if (role === USER_ROLE.PATIENT) {
        menu = patientMenu;
      }
    }
    setMenuNav(menu);
  }, [userInfo]);
  // state menu setting
  const [menuSetting, setMenuSetting] = useState(false);

  // Xử lí bật tắt menu setting
  const handleClickSetting = (e) => {
    setMenuSetting(e.currentTarget);
  };
  const handleCloseSetting = () => {
    setMenuSetting(false);
  };
  const openMenuSetting = Boolean(menuSetting);
  let base64 = "";
  if (userInfo && userInfo?.image) {
    base64 = userInfo?.image;
  }
  let avatar = new Buffer(base64, "base64").toString("binary");
  return (
    <>
      {/* Menu nav */}
      <AppBar open={open} className={styles.navbar}>
        <Container maxWidth="xl" className={styles.navbar_container}>
          {/* Left */}
          <Box className={styles.navbar_left}>
            <IconButton
              className={styles.menu_btn}
              onClick={handleDrawerOpen}
              sx={{
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link to={path.HOMEPAGE} className={styles.logo}>
              BOOKING<span>CARE</span>
            </Link>
          </Box>
          {/* Right */}
          <Box className={styles.navbar_right}>
            <Button
              onClick={handleClickSetting}
              aria-controls={
                openMenuSetting ? "menuSettingHeader-login" : undefined
              }
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
          </Box>
        </Container>
      </AppBar>

      {/* Menu slide */}
      <Drawer variant="permanent" open={open} className={styles.drawer}>
        <DrawerHeader className={styles.drawer_header}>
          <IconButton
            onClick={handleDrawerClose}
            className={styles.drawer_button}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List className={styles.drawer_body}>
          <Navigator menus={menuNav} />
        </List>
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
