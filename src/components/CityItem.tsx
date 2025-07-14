import { Link } from "react-router-dom";
import type { CityObjectProps } from "../types/types";
import styles from "./CityItem.module.css";
import { useCities } from "../context/CitiesContext";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }: { city: CityObjectProps }) {
  const { cityName, emoji, date, id, position } = city;
  const { currentCity } = useCities();
  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity?.cityName === cityName ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>
          <img
            src={`https://flagsapi.com/${emoji}/shiny/64.png`}
            alt={`${emoji}`}
            className={styles.img}
          />
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
