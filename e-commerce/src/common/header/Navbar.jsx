import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowSidebarCategory, showSidebarCategory, user }) => {
  // Toogle Menu
  const [MobileMenu, setMobileMenu] = useState(true);
  const removeNavbar = () => {
    document.querySelector('.navlink.mobile').classList.remove('active')
  }  

  return (
    <>
      <header className="header">
        <div className="container b_flex">
          <div
            className="catgrories d_flex"
            onClick={() => setShowSidebarCategory((prev) => !prev)}
          >
            <span className="fa-solid fa-border-all"></span>
            <h4>
              Loại sản phẩm{" "}
              <i
                className={
                  showSidebarCategory
                    ? "fa fa-chevron-up"
                    : "fa fa-chevron-down"
                }
              ></i>
            </h4>
          </div>
          {!!user ? (
            <div className="navlink mobile">
              <ul
                className={
                  MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"
                }
                
              >
                {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
                <li onClick={removeNavbar}>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/user">Thông tin cá nhân</Link>
                </li>
                <li>
                  <Link to="/product">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/track">Theo dõi đơn hàng</Link>
                </li>
                <li onClick={removeNavbar}>
                  <Link to="/cart">Giỏ hàng</Link>
                </li>
              </ul>

              <button
                className="toggle mobile"
                onClick={removeNavbar}
              >
                <i className="fas fa-times close home-btn"></i>

              </button>
            </div>
          ) : null}
          <button
            className="toggle mobile menu"
            onClick={() => {
              document.querySelector('.navlink.mobile').classList.add('active')
            }}
          >
            <i className="fas fa-bars open"></i>

          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
