import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { AgencyCoord } from "@/models/organisation/agency/Agency.model.js";
import { customFetcher } from "@/common/helper/fetchInstance.js";

interface OrganisationMapProps {
  center: [number, number];
}

function MapUpdater(props: OrganisationMapProps) {
  const map = useMap();
  map.setView(props.center, map.getZoom());
  return null;
}

export function OrganisationMap(props: OrganisationMapProps) {
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
      center={props.center}
      zoom={7}
      scrollWheelZoom={true}
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

      <MapUpdater center={props.center} />
    </MapContainer>
  );
}
