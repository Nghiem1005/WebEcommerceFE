import React, { useEffect, useState } from "react";
import FeatureSale from "../../components/featureSale/FeatureSale";
import { Link } from "react-router-dom";
import { useQueryCustom } from "../../hooks";
import { thunkStatisticTypes } from "../../constants/thunkTypes";
import { getStatisticSaleProduct } from "../../api/fetchers/statistic";
import Loader from "../../components/Loader";
import TableGrid from "../../components/TableGrid";


const Report = () => {
  const [pageSize, setPageSize] = useState({ page: 0, size: 100 });
  const { isLoading, data, refetch } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_SALE_PRODUCT,
    getStatisticSaleProduct
  );
  const [productData, setProductData] = useState([]);
  const [statisticData, setStatisticData] = useState([]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setProductData(data.data);
      const accumulate = data.data.reduce(
        (statistic, item) => ({
          ...statistic,
          quantitySell: statistic.quantitySell + item.quantitySales,
          asset: statistic.asset + item.standCost * item.standCost,
          totalSell: statistic.totalSell + item.quantitySales * item.standCost,
        }),
        {
          bestSellingProduct: data.data[0],
          quantitySell: 0,
          asset: 0,
          totalSell: 0,
        }
      );
      setStatisticData(accumulate);
    }
  }, [data]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <Link to="/product/1">
            <div className="productListProduct">
              {/* <img className="productListImg" src={'http://localhost:8080/api/v1/image/product/thumbnail/' + params.row?.thumbnail  } alt="" /> */}
              {params.row.name}
            </div>
          </Link>
        );
      },
    },
    // { field: "date", headerName: "Date ", width: 150 },
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
      renderCell: (params) => params.row.amount.toLocaleString(),
    },
    {
      field: "standCost",
      headerName: "Price",
      width: 160,
      renderCell: (params) => params.row.standCost.toLocaleString(),
    },
    {
      field: "quantitySales",
      headerName: "Quantity Sell",
      width: 160,
      renderCell: (params) => params.row.quantitySales.toLocaleString(),
    },
    {
      field: "total",
      headerName: "Total",
      width: 160,
      renderCell: (params) => (
        <span>
          {(params.row.standCost * params.row.quantitySales).toLocaleString()}
        </span>
      ),
    },
  ];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <FeatureSale statisticData={statisticData} />
      <div className="report">
      <TableGrid
          data={productData}
          columns={columns}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default Report;
