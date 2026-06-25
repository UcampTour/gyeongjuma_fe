import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import MapIcon from "@mui/icons-material/Map";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNavigationBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  // const [value, setValue] = React.useState(0);

  const menus = [
    {
      label: t("common:bottomNav.explore"),
      icon: <PlaceIcon />,
      path: "/explore",
    },
    {
      label: t("common:bottomNav.course"),
      icon: <MapIcon />,
      path: "/",
    },
    {
      label: t("common:bottomNav.quiz"),
      icon: <AssignmentTurnedInIcon />,
      path: "/",
    },
    {
      label: t("common:bottomNav.mypage"),
      icon: <PersonIcon />,
      path: "/",
    },
  ];

  const value = menus.findIndex((menu) => menu.path === location.pathname);

  return (
    <Paper
      elevation={0}
      sx={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "xs",
        bgcolor: "#EFECE2",
        pt: 1,
        pb: 1,
        zIndex: 1000,
        outline: "1px solid #EFECE2",
        boxShadow: "0 0 0 1px #EFECE2",
      }}
    >
      <BottomNavigation
        showLabels
        // value={value}
        // onChange={(_, newValue) => setValue(newValue)}
        value={value}
        onChange={(_, newValue) => {
          navigate(menus[newValue].path);
        }}
        sx={{
          bgcolor: "transparent",
          height: "65px",
          "& .MuiBottomNavigationAction-root": {
            color: "#555555",
            minWidth: "auto",
            padding: "6px 0",
            fontWeight: 500,
          },
          "& .Mui-selected": {
            color: "#333333 !important",
            fontWeight: "bold",
            "& .icon-bg": {
              bgcolor: "#E4DDD0",
              borderRadius: "20px",
              px: 2,
              py: 0.5,
              display: "inline-flex",
            },
          },
          "& .MuiBottomNavigationAction-label": {
            fontSize: "12px",
            marginTop: "4px",
            "&.Mui-selected": { fontSize: "12px" },
          },
        }}
      >
        {menus.map((menu) => (
          <BottomNavigationAction
            key={menu.path}
            label={menu.label}
            icon={<span className="icon-bg">{menu.icon}</span>}
          />
        ))}
        {/* <BottomNavigationAction
          // label="Explore"
          label={t("common:bottomNav.explore")}
          icon={
            <span className="icon-bg">
              <PlaceIcon />
            </span>
          }
        />
        <BottomNavigationAction
          label={t("common:bottomNav.course")}
          icon={
            <span className="icon-bg">
              <MapIcon />
            </span>
          }
        />
        <BottomNavigationAction
          label={t("common:bottomNav.quiz")}
          icon={
            <span className="icon-bg">
              <AssignmentTurnedInIcon />
            </span>
          }
        />
        <BottomNavigationAction
          label={t("common:bottomNav.mypage")}
          icon={
            <span className="icon-bg">
              <PersonIcon />
            </span>
          }
        /> */}
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNavigationBar;
