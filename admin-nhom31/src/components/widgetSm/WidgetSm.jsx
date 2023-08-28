import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import React from "./widgetSm.css";

export default function widgetSm({ dataUser }) {
  return (
    <div className="widgetSm">
      <h3 className="widgetSmTitle">New Join Members</h3>
      <ul className="widgetSmList">
        {dataUser.map((user) => (
          <li key={user.id} className="widgetSmListItem">
            <div style={{ display: 'flex', columnGap: '10px', alignItems: 'center'}}>
              <img
                src={
                  user.image ||
                  "https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                }
                alt="member"
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.name}</span>
                <span className="widgetSmUserTitle">
                  {user.email.length > 20
                    ? `${user.email.slice(0, 17)}...`
                    : user.email}
                </span>
              </div>
            </div>
            <Link to={'/user/' + user.id}>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Detail
            </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
