import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.ts";
import { useEffect } from "react";
import { FieldRow } from "@/components/fieldRow.tsx";
import { Button } from "@/components/ui/button.tsx";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@radix-ui/react-icons";
import { MdHomeRepairService } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { NotificationsCard } from "@/modules/profile/components/notificationsCard.tsx";

export const Dashboard = () => {
  const { currentUser, refreshCurrentUser } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    refreshCurrentUser();
  }, []);

  const handleNavigateToDemand = () => {
    navigate("/demand/create");
  };

  return (
    <MainRoot title="Dashboard">
      <div className="grid size-full grid-cols-3 grid-rows-6 gap-4">
        <Card className="row-span-4">
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <GrGroup />
                <span>Mon service</span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <div className="col-span-2 col-start-1 row-span-2 row-start-5">
          <NotificationsCard />
        </div>
        <Card className="row-span-4">
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <MdHomeRepairService />
                <span>Mon équipe</span>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="row-span-3">
          <CardHeader className="text-gray-900 dark:text-gray-300">
            <CardTitle className="flex flex-wrap justify-between gap-2 text-xl">
              <div className="flex flex-wrap items-center gap-4">
                <BsFillInfoSquareFill />
                <span>Soldes</span>
              </div>
              <Button variant="callToAction" onClick={handleNavigateToDemand}>
                <PlusIcon className="mr-2 size-4" />
                Nouvelle demande
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-slate-300 dark:divide-slate-700">
            <FieldRow title="Congés">{currentUser.ca} jours</FieldRow>
            <FieldRow title="RTT">{currentUser.rtt} jours</FieldRow>
            <FieldRow title="Télétravail">{currentUser.tt} jours</FieldRow>
          </CardContent>
        </Card>
        <MapContainer
          className="col-start-3 row-span-3 row-start-4 size-full rounded-xl"
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
