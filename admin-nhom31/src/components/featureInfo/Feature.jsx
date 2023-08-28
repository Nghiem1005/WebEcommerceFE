import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function Feature() {
  return (
    <div className="featured">
      <div className="featuredItem" style={{ background: "#00C49F" }}>
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2,415 VND</span>
          <span className="featuredMoneyRate">
            -11.4
            <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem" style={{ background: "#FFBB28" }}>
        <span className="featuredTitle">Sale</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$3,415</span>
          <span className="featuredMoneyRate">
            +20.4
            <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem" style={{ background: "#FF8042" }}>
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">5,415 VND</span>
          <span className="featuredMoneyRate">
            +24.4
            <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
