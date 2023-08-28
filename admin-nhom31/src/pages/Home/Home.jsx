import "./home.css";
import Feature from "../../components/featureInfo/Feature";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import useQueryCustom from "../../hooks/useQueryCustom";
import { thunkStatisticTypes } from "../../constants/thunkTypes";
import { getStatisticTimeUSer } from "../../api/fetchers/statistic";
import { getAllUSers } from "../../api/fetchers/user";
import { getBillTransaction } from "../../api/fetchers/bill";
import Loader from "../../components/Loader";
import { useEffect } from "react";

export default function Home() {
  const {
    isLoading,
    data,
    refetch: r1,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_TIME_USER,
    getStatisticTimeUSer
  );
  const {
    isLoading: isLoadingUser,
    data: dataUser,
    refetch: r2,
  } = useQueryCustom(thunkStatisticTypes.STATISTIC_FIVE_USER, () =>
    getAllUSers({ size: 1000, page: 0 })
  );
  const {
    isLoading: isLoadingTransaction,
    data: dataTransaction,
    refetch: r3,
  } = useQueryCustom(
    thunkStatisticTypes.STATISTIC_FIVE_TRANSACTION,
    getBillTransaction
  );

  useEffect(() => {
    r1();
    r2();
    r3();
  }, []);

  if (isLoading || isLoadingUser || isLoadingTransaction) {
    return <Loader />;
  }
  return (
    <div>
      <Feature />
      <Chart
        data={data?.data?.map(data.data.pop, [...data.data])}
        title="User Analytics (In a week)"
        grid
        dataKey="value"
      />
      <div className="homeWidgets">
        <WidgetSm
          dataUser={dataUser?.data?.list
            .map(dataUser?.data?.list?.pop, [...dataUser?.data?.list])
            .slice(-5)}
        />
        <WidgetLg dataTransaction={dataTransaction?.data?.slice(-5)} />
      </div>
    </div>
  );
}
