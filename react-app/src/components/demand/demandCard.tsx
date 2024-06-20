import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";

import { useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";

export function DemandCard() {
  const [users, setUser] = useState({
    ca: 0,
    tt: 0,
    rtt: 0,
  });

  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/me`).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUser(response.data.data);
    });
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarClock className="size-14 text-indigo-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de congés</span>
            <div className="text-4xl">{users.ca}</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <TbCalendarRepeat className="size-14 text-red-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de RTT</span>
            <div className="text-4xl">{users.rtt}</div>
          </CardTitle>
        </Card>

        <Card className="flex ">
          <CardHeader className="flex flex-row">
            <MdOutlineLaptop className="size-14 text-orange-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de télétravail</span>
            <div className="text-4xl">{users.tt}</div>
          </CardTitle>
        </Card>
      </div>
    </>
  );
}
