import type { CityListComponetProp } from "../types/types";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
function CityList({ cities, isLoading }: CityListComponetProp) {
  if (isLoading) return <Spinner />;
  return <ul className={styles.cltyList}>
        {cities?.map(city =><CityItem city={city} key={city.id}/>)}
    </ul>;
}

export default CityList;
