import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../context/CitiesContext";
function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState<number[]>([40, 0]);
  const [searchParam, setSearchParams] = useSearchParams();
  const mapLat = searchParam.get("lat");
  const mapLng = searchParam.get("lng");
  const { cities } = useCities();
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[mapLat || 40, mapLng|| 0]}
        // center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <img
                src={`https://flagsapi.com/${city.emoji}/shiny/64.png`}
                alt={`${city.emoji}`}
                className={styles.img}
              />{" "}
              {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapLat || 40, mapLng||0]}/>
      </MapContainer>
    </div>
  );
}

function ChangeCenter({position}: {position: (string| number|  null)[]}){
 const map = useMap();
 map.setView(position)
 return null
}

export default Map;
