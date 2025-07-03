import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const navigate = useNavigate()
  const [searchParam, setSearchParams] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  return (
    <div className={styles.mapContainer} onClick={()=> navigate("form")}>
      <p>Map {`(${lat}, ${lng})`}</p>
      <button
        onClick={() => setSearchParams({ lat: lat || "", lng: lng || "" })}
      >
        Update Params
      </button>
    </div>
  );
}

export default Map;
