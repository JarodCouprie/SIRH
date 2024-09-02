import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.ts";
import { useEffect } from "react";
import { TbCalendarClock, TbCalendarRepeat } from "react-icons/tb";
import { MdOutlineLaptop } from "react-icons/md";

export const Dashboard = () => {
  const { currentUser, refreshCurrentUser } = useCurrentUser();

  useEffect(() => {
    refreshCurrentUser();
  }, []);

  return (
    <MainRoot title="Dashboard">
      <div className="grid size-full grid-cols-3 grid-rows-6 gap-4">
        <Card className="flex">
          <CardHeader className="flex flex-row">
            <TbCalendarClock className="size-14 text-indigo-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de congés</span>
            <div className="text-5xl">{currentUser.ca}</div>
          </CardTitle>
        </Card>

        <Card className="flex">
          <CardHeader className="flex flex-row">
            <TbCalendarRepeat className="size-14 text-red-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de RTT</span>
            <div className="text-5xl">{currentUser.rtt}</div>
          </CardTitle>
        </Card>

        <Card className="flex">
          <CardHeader className="flex flex-row">
            <MdOutlineLaptop className="size-14 text-orange-500 opacity-75" />
          </CardHeader>

          <CardTitle className="p-4">
            <span className="text-base">Solde de télétravail</span>
            <div className="text-5xl">{currentUser.tt}</div>
          </CardTitle>
        </Card>
        <Card className="row-span-5">
          <CardHeader>
            <CardTitle>Mon service</CardTitle>
          </CardHeader>
        </Card>
        <Card className="row-span-5">
          <CardHeader>
            <CardTitle>Mon équipe</CardTitle>
          </CardHeader>
        </Card>
        <MapContainer
          className="row-span-5 size-full rounded-xl"
          center={[49.10668200684202, 6.17647682854827]}
          zoom={6}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[49.10668200684202, 6.17647682854827]}>
            <Popup>Metz Numeric School</Popup>
          </Marker>
        </MapContainer>
      </div>
    </MainRoot>
  );
};
