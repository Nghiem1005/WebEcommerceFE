import { Person, Timeline } from "@mui/icons-material";
import BillList from '../../pages/BillList/BillList.jsx'
import ProfilePage from "../../pages/profile/ProfilePage.jsx";

export const list = [
  {
    group: "Quick Menu",
    title: "Bill List",
    icon: <Timeline style={{ color: "#fff" }} />,
    link: "",
    component: <BillList />,
    show: true
  },
  {
    title: "Profile",
    icon: <Person style={{ color: "#fff" }} />,
    link: "/profile",
    component: <ProfilePage />,
    show: true
  },
  // {
  //   title: "Bills Delivering",
  //   icon: <TrendingUp style={{ color: "#fff" }} />,
  //   link: "bill-delivering",
  //   component: <BillDelivering />,
  //   divider: true,
  //   show: true
  // },
  // {
  //   title: "Bills Delivered",
  //   icon: <CategoryOutlined style={{ color: "#fff" }} />,
  //   link: "bill-delivered",
  //   component: <BillDelivered />,
  //   show: true
  // },
];
