import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper, Box } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import HomeIcon from "@mui/icons-material/Home"; 
import MapIcon from "@mui/icons-material/Map";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function BottomNavigationBar() {
  const { t } = useTranslation(); 
  const location = useLocation();
  const navigate = useNavigate();

  const menus = [
    { label: t("common:bottomNav.home"), icon: <HomeIcon />, path: "/" },
    { label: t("common:bottomNav.sites"), icon: <PlaceIcon />, path: "/sites" },
    { label: t("common:bottomNav.explore"), icon: <MapIcon sx={{ fontSize: "28px" }} />, path: "/explore", isCenter: true },
    { label: t("common:bottomNav.quiz"), icon: <AssignmentTurnedInIcon />, path: "/quiz" },
    { label: t("common:bottomNav.profile"), icon: <PersonIcon />, path: "/profile" },
  ];

  const value = menus.findIndex((menu) => menu.path === location.pathname);

  return (
    <Box sx={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "xs", zIndex: 1000, overflow: "visible" }}>
      
      <Box
        sx={{
          position: "absolute",
          top: "-28px", 
          left: "50%",
          transform: "translateX(-50%)",
          width: "84px",
          height: "84px",
          bgcolor: "#EFECE2", 
          borderRadius: "50%",
          zIndex: 1,
          boxShadow: "0 -5px 12px rgba(0, 0, 0, 0.03)", 
        }}
      />

      <Paper
        elevation={0}
        sx={{
          position: "relative",
          width: "100%",
          bgcolor: "#EFECE2",
          pt: 1,
          pb: 1,
          zIndex: 2,
        }}
      >
        <BottomNavigation
          showLabels
          value={value === -1 ? false : value}
          onChange={(_, newValue) => navigate(menus[newValue].path)}
          sx={{
            bgcolor: "transparent",
            height: "65px",
            overflow: "visible", 
            "& .MuiBottomNavigationAction-root": {
              color: "#555555",
              minWidth: "auto",
              padding: "6px 0",
              fontWeight: 500,
              WebkitTapHighlightColor: "transparent",
              outline: "none",
            },
            "& .Mui-selected": {
              color: "#333333 !important",
              fontWeight: "bold",
              "& .icon-bg:not(.center-btn)": {
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
          {menus.map((menu, index) => {
            if (menu.isCenter) {
              const isSelected = value === index;
              return (
                <BottomNavigationAction
                  key={menu.path}
                  label={menu.label}
                  disableRipple
                  sx={{
                    WebkitTapHighlightColor: "transparent",
                    outline: "none",
                    "& .MuiBottomNavigationAction-label": {
                      marginTop: "11px !important", 
                      fontSize: "12px !important",
                      color: isSelected ? "#333333" : "#555555",
                      fontWeight: isSelected ? "bold" : 500,
                    }
                  }}
                  icon={
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                      <Box
                        className="center-btn"
                        sx={{
                          bgcolor: isSelected ? "#E4DDD0" : "#EFECE2", 
                          color: isSelected ? "#333333" : "#555555", 
                          borderRadius: "50%",
                          width: "58px",
                          height: "58px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: "-42px", 
                          zIndex: 3,
                          border: "none !important",
                          outline: "none !important",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          WebkitTapHighlightColor: "transparent",
                          transition: "background-color 0.25s, color 0.25s, transform 0.25s",
                          "&:hover": { transform: "scale(1.04)" }
                        }}
                      >
                        {menu.icon}
                      </Box>
                    </Box>
                  }
                />
              );
            }

            return (
              <BottomNavigationAction
                key={menu.path}
                label={menu.label}
                icon={<span className="icon-bg">{menu.icon}</span>}
              />
            );
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNavigationBar;