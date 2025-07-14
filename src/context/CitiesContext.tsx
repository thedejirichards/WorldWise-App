import { createContext, useContext, useEffect, useState } from "react";
import type { CitiesContextProp, CityObjectProps } from "../types/types";

const CitiesContext = createContext<CitiesContextProp | null>(null);
const BASE_URL = "http://localhost:8000";

function CitiesContextProvider({ children }: { children: React.ReactNode }) {
  const [cities, setCities] = useState<CityObjectProps[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentCity, setCurrentCity] = useState<CityObjectProps | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        console.error("There was an error");
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      console.error("There was an error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, getCity, currentCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("Not within context provider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesContextProvider, useCities };
