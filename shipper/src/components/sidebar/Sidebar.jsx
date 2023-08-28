import { ChevronLeft } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useMemo } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { list as ListMenu } from "./listNav";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& .MuiPaper-root": {
    backgroundColor: "#5ac2d6",
    "& .MuiButtonBase-root": {
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      ".MuiListItemText-root .MuiTypography-root": {
        fontSize: "18px",
      },
    },
    "& .MuiButtonBase-root.Mui-selected": {
      backgroundColor: "#1976d2",
    },
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const list = useMemo(() => ListMenu, []);

  return (
    <>
      <Drawer variant="permanent" open={openSidebar} className={!openSidebar ? "display-res": null}>
        <DrawerHeader>
          <Typography variant="h6" style={{ color: '#fff'}}>SHIPPER</Typography>
          <IconButton onClick={() => setOpenSidebar(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="display-btn">
          {list.map((item, index) =>
            item.show ? (
              <div key={index}>
                {item.group ? (
                  <span
                    style={{
                      marginLeft: "4px",
                      display: !openSidebar ? "none" : "inline-block",
                    }}
                  >
                    {item.group}
                  </span>
                ) : null}
                <ListItem
                  key={item.title}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: openSidebar ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => navigate(item.link)}
                    selected={location.pathname.includes(item.link) && index > 0}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: openSidebar ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      sx={{ opacity: openSidebar ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
                {item.divider ? <Divider style={{ margin: "6px 0" }} /> : null}
              </div>
            ) : null
          )}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3, width: "50vw" }}>
        <DrawerHeader />
        <Routes>
          {list.map((item) => (
            <Route key={item.title} path={item.link} element={item.component} />
          ))}
        </Routes>
      </Box>
    </>
  );
};

export default Sidebar;
