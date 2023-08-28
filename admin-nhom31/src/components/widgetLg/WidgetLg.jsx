import React from "./widgetLg.css";
import ButtonStatus from "../buttonStatus/ButtonStatus";
import moment from "moment";

export default function WidgetLg({ dataTransaction }) {
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLdTh">Customer</th>
            <th className="widgetLdTh">Date</th>
            <th className="widgetLdTh">Amount</th>
            <th className="widgetLdTh">Status</th>
          </tr>
        </thead>
        <tbody>
          {dataTransaction.map((item, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <img
                  src={
                    item.userResponseDTO.image ||
                    "https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  }
                  alt=""
                  className="widgetLgImg"
                />
                <span className="widgetLgUsername">
                  {item?.userResponseDTO?.name}
                </span>
              </td>
              <td className="widgetLgDate">
                {moment(item.payDate).format("ll")}
              </td>
              <td className="widgetLgAmount">${item.price.toLocaleString()}</td>
              <td className="widgetLgStatus">
                <ButtonStatus status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
