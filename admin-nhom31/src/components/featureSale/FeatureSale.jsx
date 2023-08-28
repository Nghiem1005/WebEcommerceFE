import React from "react";
import { ArrowUpward } from "@material-ui/icons";

const FeaturedSale = ({ statisticData }) => {
  return (
    <div className="featured">
      <div className="featuredItem" style={{ background: "#FF8042" }}>
        <span className="featuredTitle">Best-Selling Product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {statisticData.bestSellingProduct?.standCost *
            statisticData.bestSellingProduct?.quantitySales
              ? (
                  statisticData.bestSellingProduct?.standCost *
                  statisticData.bestSellingProduct?.quantitySales
                ).toLocaleString()
              : 0}{" "}
            VND
          </span>
          <span className="featuredMoneyRate">
            {/* +20.4 */}
            <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featuredSub">
          {statisticData.bestSellingProduct?.name}
        </span>
      </div>

      <div className="featuredItem" style={{ background: "#FFBB28" }}>
        <span className="featuredTitle">
          Sale {statisticData.quantitySell?.toLocaleString()} products
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            $ {statisticData.totalSell?.toLocaleString()}
          </span>
          <span className="featuredMoneyRate">
            {/* +20.4 */}
            <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featuredSub">Revenue(2 years)</span>
      </div>

      <div className="featuredItem" style={{ background: "#00C49F" }}>
        <span className="featuredTitle">Profits (20%)</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">
            {(statisticData.totalSell * 0.2)?.toLocaleString()} VND
          </span>
          <span className="featuredMoneyRate">
            {/* +24.4 */}
            <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featuredSub">Revenue(2 years)</span>
      </div>
    </div>
  );
};

export default FeaturedSale;
