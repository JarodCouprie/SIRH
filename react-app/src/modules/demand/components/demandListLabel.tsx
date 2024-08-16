import { DemandType } from "@/common/enum/DemandType.enum.js";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { GiMedicalThermometer } from "react-icons/gi";
import React from "react";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const getOptions = (status: DemandType) => {
  switch (status) {
    case DemandType.CA:
      return {
        icon: <TbCalendarClock className="size-9 text-indigo-500 opacity-75" />,
        label: "Congés",
      };
    case DemandType.RTT:
      return {
        icon: <TbCalendarRepeat className="size-9 text-red-500 opacity-75" />,
        label: "RTT",
      };
    case DemandType.TT:
      return {
        icon: <MdOutlineLaptop className="size-9 text-orange-500 opacity-75" />,
        label: "Télétravail",
      };
    case DemandType.ABSENCE:
      return {
        icon: (
          <FaRegCalendarXmark className="size-8 text-amber-500 opacity-75" />
        ),
        label: "Absence",
      };
    case DemandType.SICKNESS:
      return {
        icon: (
          <GiMedicalThermometer className="size-8 text-red-500 opacity-75" />
        ),
        label: "Arrêt maladie",
      };
  }
};

interface DemandListLabelProps {
  type: DemandType;
  created_at: Date;
}

export const DemandListLabel: React.FC<DemandListLabelProps> = (demand) => {
  return (
    <div className="flex gap-2 text-nowrap text-left">
      {getOptions(demand.type).icon}
      <div>
        <div>{getOptions(demand.type).label}</div>
        <div className="text-xs text-zinc-500">
          {new Date(demand?.created_at).toLocaleDateString(
            "fr-FR",
            dateOptions,
          )}
        </div>
      </div>
    </div>
  );
};
