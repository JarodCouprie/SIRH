import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export function OrganisationMap() {
  return (
    <MapContainer
      className="size-full"
      center={[49.1068, 6.1764]}
      zoom={7}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[49.1068, 6.1764]}>
        <Popup>This is a popup</Popup>
      </Marker>
    </MapContainer>
  );
}
