import React from "react";
import "./analytics.css";
import TableComponents from "../../components/table/Table";
import ChartDetail from "../../components/chartDetail/chartDetail";
import FeatureDetail from "../../components/featureDetail/featureDetail";
import Widget from "../../components/widget/Widget";
import useQueryCustom from "../../hooks/useQueryCustom";
import { thunkStatisticTypes } from "../../constants/thunkTypes";
import {
  getStatisticUsers,
  getStatisticBills,
  getStatisticProducts,
  getStatisticSales,
  getStatisticTransaction,
  getStatisticSaleDate,
} from "../../api/fetchers/statistic";
import "./analytics.css";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const Analytics = () => {
  const {
    isLoading: loadingUser,
    data: dataUser,
    refetch: r1,
  } = useQueryCustom(thunkStatisticTypes.STATISTIC_USER, getStatisticUsers);
  const {
    isLoading: loadingProduct,
    data: dataProduct,
    refetch: r2,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_PRODUCT,
    getStatisticProducts
  );
  const {
    isLoading: loadingBill,
    data: dataBill,
    refetch: r3,
  } = useQueryCustom(thunkStatisticTypes.STATISTIC_BILL, getStatisticBills);
  const {
    isLoading: loadingSale,
    data: dataSale,
    refetch: r4,
  } = useQueryCustom(thunkStatisticTypes.STATISTIC_SALE, getStatisticSales);

  const {
    isLoading: loadingTransaction,
    data: dataTransaction,
    refetch: r5,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_TRANSACTION,
    getStatisticTransaction
  );

  const {
    isLoading: loadingSaleDate,
    data: dataSaleDate,
    refetch: r6,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_SALE_DATE,
    getStatisticSaleDate
  );

  useEffect(() => {
    r1();
    r2();
    r3();
    r4();
    r5();
    r6();
  }, []);

  if (
    loadingBill ||
    loadingUser ||
    loadingProduct ||
    loadingSale ||
    loadingTransaction ||
    loadingSaleDate
  ) {
    return <Loader />;
  }

  return (
    <div className="analytic">
      <div className="title__section">
        <h1>Analytics</h1>
      </div>
      <div className="widgets">
        <Widget type="user" dataStatistic={dataUser} />
        <Widget type="order" dataStatistic={dataBill} />
        <Widget type="sale" dataStatistic={dataSale} />
        <Widget type="product" dataStatistic={dataProduct} />
      </div>
      <div className="charts">
        <FeatureDetail data={dataSaleDate.data} />
        <ChartDetail
          title="Last 6 Dates (Revenue)"
          aspect={2 / 1}
          data={dataSaleDate.data.map(dataSaleDate.data.pop, [
            ...dataSaleDate.data,
          ])}
        />
      </div>
      <div className="listContainer">
        <div className="listTitle">5 Giao dịch gần nhất</div>
        <TableComponents data={dataTransaction.data.slice(-5)} />
      </div>
    </div>
  );
};

export default Analytics;
