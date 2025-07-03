import type { CountryObjectProps } from "../types/types";
import styles from "./CountryItem.module.css";

function CountryItem({ country }:{country: CountryObjectProps}) {
  return (
    <li className={styles.countryItem}>
      <span><img src={`https://flagsapi.com/${country.emoji}/shiny/64.png`} alt="" /></span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
