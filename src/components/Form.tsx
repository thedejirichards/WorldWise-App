// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState<boolean>(false);
  const [geoCodingErr, setGeoCodingErr] = useState<string>("")
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"
  useEffect(() => {
    const fetchCItyData = async () => {
      try {
        setIsLoadingGeocoding(true);
        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json()
        if(!data.city){
          throw new Error("That doesn't seem like a country. Click somewhere else")
        }
        setGeoCodingErr("");
        setCityName(data.city || data.locality || "")
        setCountry(data.country || "")
        setEmoji(data.countryCode)
        
      } catch (err) {
        const error = err as Error;
        setGeoCodingErr(error.message)
      } finally {
        setIsLoadingGeocoding(false);

      }
    };
    fetchCItyData()
  }, [lat, lng]);

  if (isLoadingGeocoding) return <Spinner/>;
  if(geoCodingErr) return <Message message={geoCodingErr} />
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}><img className={styles.emoji} src={emoji ?`https://flagsapi.com/${emoji}/shiny/64.png`: "NG"} alt="" /></span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}} type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;