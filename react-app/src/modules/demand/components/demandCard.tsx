import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.js";

export function DemandCard() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 ">
        <Card className="flex">
          <CardHeader className="flex flex-row">
            <TbCalendarClock className="size-14 text-indigo-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de congés</span>
            <div className="text-4xl">{currentUser.ca}</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarRepeat className="size-14 text-red-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de RTT</span>
            <div className="text-4xl">{currentUser.rtt}</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <MdOutlineLaptop className="size-14 text-orange-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de télétravail</span>
            <div className="text-4xl">{currentUser.tt}</div>
          </CardTitle>
        </Card>
      </div>
    </>
  );
}
