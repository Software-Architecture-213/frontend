import { BaseBlock } from "../../../components";
import { GameStatisticChart, BrandStatisticChart, UserStatisticChart } from "./components";

const AdminDashboardTabs = () => {

  return (
  <div className="w-full justify-between my-1 px-3 space-y-4">
      <h3 className="text-left text-lg font-bold text-slate-800">Dashboard</h3>
      <BaseBlock className="justify-items-center">
        <GameStatisticChart />
      </BaseBlock>
      <BaseBlock className="justify-items-center">
        <BrandStatisticChart />
      </BaseBlock>
      <BaseBlock className="justify-items-center">
        <UserStatisticChart />
      </BaseBlock>
    </div>
  )
};

export default AdminDashboardTabs;
