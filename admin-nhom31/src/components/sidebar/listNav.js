import { Dashboard } from "@mui/icons-material";
import DiscountIcon from '@mui/icons-material/Discount';
import {
  BrandingWatermarkOutlined,
  CategoryOutlined,
  ChatOutlined,
  PersonOutline,
  Storefront,
  Timeline,
  TrendingUp,
} from "@material-ui/icons";

import FeedbackList from "../../pages/feedback/FeedbackList";
import ProductList from "../../pages/products/productList/ProductList";
import UserList from "../../pages/users/userList/UserList";
import TransactionList from "../../pages/transactions/TransactionList";
import DiscountList from "../../pages/discounts/discountList/DiscountList";
import Brand from "../../pages/brands/brand/Brand";
import CreateBrand from "../../pages/brands/createBrand/CreateBrand";
import Category from "../../pages/categories/category/Category";
import CreateCategory from "../../pages/categories/createCategory/CreateCategory";
import User from "../../pages/users/user/User";
import CreateUser from "../../pages/users/newUser/NewUser";
import Product from "../../pages/products/product/Product";
import CreateProduct from "../../pages/products/newProduct/NewProduct";
import Discount from "../../pages/discounts/discount/Discount";
import CreateDiscount from "../../pages/discounts/createDiscount/createDiscount";
import Home from "../../pages/Home/Home";
import Analytics from "../../pages/analytics/Analytics";
import Report from "../../pages/report/Report";
import CategoryList from "../../pages/categories/categoryList/CategoryList";
import BrandList from "../../pages/brands/brandList/BrandList.jsx";

export const list = [
  {
    group: "Main Menu",
    title: "Home",
    icon: <Dashboard style={{ color: "#fff" }} />,
    link: "",
    component: <Home />,
    show: true
  },
  {
    title: "Analytics",
    icon: <Timeline style={{ color: "#fff" }} />,
    link: "analytic",
    component: <Analytics />,
    show: true
  },
  {
    title: "Report",
    icon: <TrendingUp style={{ color: "#fff" }} />,
    link: "report",
    component: <Report />,
    divider: true,
    show: true
  },
  {
    group: "Quick Menu",
    title: "Category",
    icon: <CategoryOutlined style={{ color: "#fff" }} />,
    link: "category",
    component: <CategoryList />,
    show: true
  },
  {
    title: "Category Detail",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "category/:categoryId",
    component: <Category />,
    show: false
  },
  {
    title: "Create Category",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "category/create",
    component: <CreateCategory />,
    show: false
  },

  {
    title: "Brand",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "brand",
    component: <BrandList />,
    show: true
  },
  {
    title: "Brand Detail",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "brand/:brandId",
    component: <Brand />,
    show: false
  },
  {
    title: "Create Brand",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "brand/create",
    component: <CreateBrand />,
    show: false
  },

  {
    title: "User",
    icon: <PersonOutline style={{ color: "#fff" }} />,
    link: "user",
    component: <UserList />,
    show: true
  },
  {
    title: "User Detail",
    icon: <PersonOutline style={{ color: "#fff" }} />,
    link: "user/:userId",
    component: <User />,
    show: false
  },
  {
    title: "Create User",
    icon: <PersonOutline style={{ color: "#fff" }} />,
    link: "user/create",
    component: <CreateUser />,
    show: false
  },

  {
    title: "Product",
    icon: <Storefront style={{ color: "#fff" }} />,
    link: "product",
    component: <ProductList />,
    show: true
  },
  {
    title: "Product Detail",
    icon: <Storefront style={{ color: "#fff" }} />,
    link: "product/:productId",
    component: <Product />,
    show: false
  },
  {
    title: "Create Product",
    icon: <Storefront style={{ color: "#fff" }} />,
    link: "product/create",
    component: <CreateProduct />,
    show: false
  },

  {
    title: "Transaction",
    icon: <TrendingUp style={{ color: "#fff" }} />,
    link: "transaction",
    component: <TransactionList />,
    show: true
  },

  {
    group: "Reviews",
    title: "Feedback",
    icon: <ChatOutlined style={{ color: "#fff" }} />,
    link: "feedback",
    component: <FeedbackList />,
    show: true
  },
  {
    group: "Promotions",
    title: "Discount",
    icon: <DiscountIcon style={{ color: "#fff" }} />,
    link: "discount",
    component: <DiscountList />,
    show: true
  },
  {
    title: "Discount Detail",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "discount/:discountId",
    component: <Discount />,
    show: false
  },
  {
    title: "Create Discount",
    icon: <BrandingWatermarkOutlined style={{ color: "#fff" }} />,
    link: "discount/create",
    component: <CreateDiscount />,
    show: false
  },
];
