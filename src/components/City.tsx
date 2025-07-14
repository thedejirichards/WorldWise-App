import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
// import type { CityObjectProps } from "../types/types";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date: string | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date ? date : ""));

function City() {
  // TEMP DATA
  // const currentCity = {
  //   cityName: "Lisbon",
  //   emoji: "PT",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  // const { cityName, emoji, date, notes } = currentCity;
  const { id } = useParams();
  useEffect(() => {
    getCity(id ? id : "");
  }, [id]);
  const { getCity, currentCity, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!currentCity) return <div>Loading...</div>;
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name- {id}</h6>
        <h3>
          <span>
            <img
              src={`https://flagsapi.com/${emoji}/shiny/64.png`}
              alt={`${emoji}`}
              className={styles.img}
            />
            {cityName}
          </span>
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
