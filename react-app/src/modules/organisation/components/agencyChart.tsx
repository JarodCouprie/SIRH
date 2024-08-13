import React from "react";
import { AreaChartAgency } from "@/modules/organisation/components/chart/areaChart.js";
import { BarChartAgency } from "@/modules/organisation/components/chart/barChart.js";
import { RadialChartAgency } from "@/modules/organisation/components/chart/radialChart.js";

export const AgencyChart: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <AreaChartAgency />
      <div className="flex flex-row gap-4">
        <div className="flex w-full">
          <BarChartAgency />
        </div>
        <div className="flex w-full">
          <RadialChartAgency />
        </div>
      </div>
    </div>
  );
};
