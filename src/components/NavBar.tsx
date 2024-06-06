import React, { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import MenuIcon from "@mui/icons-material/Menu";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";

import { teal } from "@mui/material/colors";
import { AuthContext } from "../contexts/AuthContext";

const drawerWidth = 240;

export default function NavBar(props: INavBar) {
  const { children } = props;

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    handleClose();
    navigate("/", { replace: true });
  };

  const menuItems = [
    {
      text: "Posts",
      icon: <SubjectOutlinedIcon />,
      path: "/dashboard",
    },
    {
      text: "Add Post",
      icon: <AddCircleOutlineOutlinedIcon />,
      path: "/dashboard/add-post",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        sx={{
          width: `calc(100% - ${matches ? drawerWidth : 0}px)`,
          ml: `${matches ? drawerWidth : 0}px`,
        }}
        elevation={0}
      >
        <Toolbar>
          {!matches && <MenuIcon sx={{ mr: 1 }} onClick={handleOpenDrawer} />}
          <Typography sx={{ flexGrow: 1 }}>Daily Posts</Typography>
          {matches && (
            <Typography
              sx={{ mr: 2 }}
            >{`${user?.firstName} ${user?.lastName}`}</Typography>
          )}
          <Avatar
            sx={{ cursor: "pointer", bgcolor: teal[900] }}
            onClick={handleClick}
          >{`${user?.firstName[0]}${user?.lastName[0]}`}</Avatar>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleLogout}>
              <Typography fontSize={14}>Logout</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant={matches ? "permanent" : "temporary"}
        open={openDrawer}
        onClose={handleCloseDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <div>
          <Typography variant="h5" sx={{ padding: 2 }}>
            Blog
          </Typography>
        </div>
        <List>
          {menuItems.map((item, idx) => (
            <ListItemButton
              key={idx}
              onClick={() => {
                if (!matches) {
                  handleCloseDrawer();
                }
                navigate(item.path);
              }}
              sx={
                location.pathname === item.path
                  ? { backgroundColor: "#f4f4f4" }
                  : {}
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        sx={{
          backgroundColor: "#f9f9f9",
          width: "100%",
          padding: 3,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

interface INavBar {
  children: React.ReactNode;
}
