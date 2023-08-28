import React, { useState, useEffect } from "react";
import logo from "../../components/assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { LocalDiningOutlined } from "@material-ui/icons";
import { useAuth } from "../../utils/authProvider";
import { getUser } from "../../api/fetchers/user";
import useDebounce from "../../hooks/useDebounce";
import { getCartByUser } from "../../api/fetchers/cart";
import { thunkCartTypes } from "../../constants/thunkTypes";
import { useQueryCustom } from "../../hooks";
import { memo } from "react";

const Search = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const value = useDebounce(search, 100);
  const auth = useAuth();
  const open = Boolean(anchorEl);
  const { isLoading, data, refetch } = useQueryCustom(
    thunkCartTypes.GET_CART_USER,
    getCartByUser
  );

  const logout = () => {
    auth.logoutUser();
    navigate("/login");
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     refetch();
  //   }, 2000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [refetch]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const { data } = await getUser(user.userId);
        if (data) {
          setUserData(data);
        }
      }
    };
    fetch();
  }, [user]);

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      navigate(`/product?search=${value}`);
    }
  };

  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search");
    search.classList.toggle("active", window.scrollY > 100);
  });

  if (isLoading) {
    return;
  }

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <Link to={"/"}>
            <div className="logo width ">
              <img 
              style={{ width: 90 }}
              src={logo} alt="" />
            </div>
          </Link>
          {!!auth?.user?.userId ? <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input
              type="text"
              onKeyUp={handleSearch}
              value={search}
              placeholder="Bạn cần gì..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <span style={{ cursor: 'pointer'}} onClick={() => search.trim() !== '' && navigate(`/product?search=${value}`) }>
              Tìm kiếm
            </span>
          </div>: null}
          <div className="icon f_flex width">
            {user ? (
              <>
                <Tooltip title="Quản lý tài khoản">
                  <IconButton
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {userData?.image ? (
                        <img
                          style={{ width: 68, height:10}}
                          src={
                            "http://localhost:8080/api/v1/image/user/" +
                            userData?.image
                          }
                          alt=""
                        />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <div className="cart">
                  <Link to="/cart">
                    <i className="fa fa-shopping-bag icon-circle"></i>
                    {data?.data?.length > 0 ? (
                      <span>
                        {data?.data?.reduce(
                          (amount, item) => amount + item.amount,
                          0
                        )}
                      </span>
                    ) : null}
                  </Link>
                </div>
              </>
            ) : (
              <div className="b_flex control-btn">
                <Link to={"/login"}>
                  <div className="button-a">Đăng nhập</div>
                </Link>
                <Link to={"/signup"}>
                  <div className="button-a">Đăng kí</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LocalDiningOutlined fontSize="small" />
          </ListItemIcon>
            Đăng xuất
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo( Search);
