import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import {
  MoreVertRounded,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@material-ui/icons";
import "./featureDetail.css";

const FeaturedDetail = ({ data }) => {
  const accumulate = data.reduce((acc, item) => acc + item.value, 0);
  return (
    <div className="featuredDetail">
      <div className="top">
        <h1 className="title">Today Revenue</h1>
        <MoreVertRounded fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={data[0].value / accumulate * 100}
            text={((data[0].value / accumulate * 100   || 0).toString().slice(0, 4)) + '%' }
            strokeWidth={5}
          />
        </div>
        <p className="title">value sales made today</p>
        <p className="amount">$ {data[0].value?.toLocaleString() || 0}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target (1tr)</div>
            <div className={1000 - data[0].value > 0 ? "itemResult negative" : "itemResult positive"}>
              {(1000 - data[0].value).toString().slice(0, 4) > 0 ? (
                <KeyboardArrowDownOutlined fontSize="small" />
              ) : (
                <KeyboardArrowUpOutlined fontSize="small" />
              )}
              <div className="resultAmount">{(1000000 - data[0].value > 0) ? (1000000 - data[0].value).toString().slice(0, 4) : (-(1000000 - data[0].value)).toString().slice(0, 4)} VND</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Week(10tr)</div>
            <div className="itemResult positive">
              <div className="resultAmount">{`${(data[0].value / 10000000 * 100).toString().slice(0, 4)}%`}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle"> Month(150tr)</div>
            <div className="itemResult positive">
              <div className="resultAmount">{`${(data[0].value / 150000000 * 100).toString().slice(0, 4)}%`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedDetail;
