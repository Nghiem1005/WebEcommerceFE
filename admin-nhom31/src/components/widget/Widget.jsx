import React from 'react'
import { PersonOutlineOutlined, 
  ShoppingCartOutlined, 
  MonetizationOnOutlined, 
  AccountBalanceWalletOutlined,
  KeyboardArrowUp
} from "@material-ui/icons";
import './widget.css'
import { Link } from 'react-router-dom';

const Widget = ({ type, dataStatistic }) => {
    let data;
    switch (type) {
      case "user":
        data = {
          title: "USERS",
          isMoney: false,
          link: "See all users",
          linkTo: '/user',
          icon: (
            <PersonOutlineOutlined
              className="icon"
              style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
              }}
            />
          ),
        };
        break;
      case "order":
        data = {
          title: "ORDERS",
          isMoney: false,
          link: "View all orders",
          linkTo: '/transaction',
          icon: (
            <ShoppingCartOutlined
              className="icon"
              style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
              }}
            />
          ),
        };
        break;
      case "sale":
        data = {
          title: "SALES",
          isMoney: true,
          link: "View net sales",
          linkTo: '/report',
          icon: (
            <MonetizationOnOutlined
              className="icon"
              style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
            />
          ),
        };
        break;
      case "product":
        data = {
          title: "PRODUCTS",
          link: "See detail products",
          linkTo: '/product',
          icon: (
            <AccountBalanceWalletOutlined
              className="icon"
              style={{
                backgroundColor: "rgba(128, 0, 128, 0.2)",
                color: "purple",
              }}
            />
          ),
        };
        break;
      default:
        break;
    }
  
    return (
      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">
            {(dataStatistic?.data).toLocaleString()} {data.isMoney && "VND"}
          </span>
          <Link to={data.linkTo}>
            <span className="link">{data.link}</span>
          </Link>
        </div>
        <div className="right">
          <div className="percentage positive">
            <KeyboardArrowUp />
          </div>
          {data.icon}
        </div>
      </div>
    );
  };
  
  export default Widget;