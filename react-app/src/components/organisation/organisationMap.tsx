import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { customFetcher } from "@/helper/fetchInstance.js";
import { useEffect, useState } from "react";
import { AgencyCoord } from "@/models/organisation/agency/Agency.model.js";

interface OrganisationMapProps {
  center: [number, number]; // Typage de la prop 'center'
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

export function OrganisationMap({ center }: OrganisationMapProps) {
  const [agencyList, setAgencyList] = useState<AgencyCoord[]>([]);

  const fetchAgencyCoord = async () => {
    const response = await customFetcher(
      "http://localhost:5000/api/agency/coordinates",
    );
    if (response.response.status === 200) {
      setAgencyList(response.data.data);
    }
  };

  useEffect(() => {
    fetchAgencyCoord();
  }, []);

  return (
    <MapContainer
      className="size-full"
      center={center}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {agencyList.map((agency: AgencyCoord) => (
        <Marker key={agency.id} position={[+agency.lat, +agency.lng]}>
          <Popup>{agency.label}</Popup>
        </Marker>
      ))}

      <MapUpdater center={center} />
    </MapContainer>
  );
}
