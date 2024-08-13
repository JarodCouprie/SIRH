import React from "react";
import { AreaChartAgency } from "@/components/organisation/Agency/chart/areaChart.js";
import { BarChartAgency } from "@/components/organisation/Agency/chart/barChart.js";
import { RadialChartAgency } from "@/components/organisation/Agency/chart/radialChart.js";

export const AgencyChart: React.FC = () => {
  return (
    <div className="w-full">
      <AreaChartAgency />
      <div className="flex flex-row">
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
