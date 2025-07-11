import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import type {
  CountryObjectProps,
} from "../types/types";
import { useCities } from "../context/CitiesContext";

function CountryList() {
  const {cities, isLoading} = useCities()
  if (isLoading) return <Spinner />;
  const countries = cities?.reduce<CountryObjectProps[]>((acc, cur) => {
    if (!acc.map((ele) => ele.country).includes(cur.country)){
      return [...acc, { country: cur.country, emoji: cur.emoji }]
    }else {
        return acc
    };
  }, []);

  if (!countries?.length)
    return <Message message="No available Country At the moment" />;
  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
