import { useCities } from "../context/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";



function CityList() {
  const {isLoading, cities} = useCities()
  if (isLoading) return <Spinner />;
  if (!cities?.length) return <Message message="No available City At the moment"/>
  return <ul className={styles.cityList}>
        {cities?.map(city =><CityItem city={city} key={city.id}/>)}
    </ul>;
}

export default CityList;
