import React, { useEffect, useState } from "react";
import { AreaChartAgency } from "@/modules/organisation/components/chart/areaChart.js";
import { BarChartAgency } from "@/modules/organisation/components/chart/barChart.js";
import { RadialChartAgency } from "@/modules/organisation/components/chart/radialChart.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { ChartConfig } from "@/components/ui/chart.js";

export const AgencyChart: React.FC = () => {
  const [agencyDataArea, setAgencyDataArea] = useState();
  const chartAreaConfig = {
    absence: {
      label: "Absence",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const fetchAgencyData = async () => {
    const response = await customFetcher(
      "http://localhost:5000/api/agency/data",
    );
    if (response.response.status === 200) {
      setAgencyDataArea(response.data.data);
    }
  };

  useEffect(() => {
    fetchAgencyData().then();
  }, []);

  return (
    <div className="flex w-full flex-col gap-4">
      <AreaChartAgency
        data={agencyDataArea}
        chartConfig={chartAreaConfig}
        colorData={"hsl(var(--chart-2))"}
        dataKey="count"
        labelKey="date"
      />
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
