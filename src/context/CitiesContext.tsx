import { createContext, useContext, useEffect, useState } from "react";
import type { CitiesContextProp, CityObjectProps } from "../types/types";

const CitiesContext = createContext<CitiesContextProp | null>(null);
const BASE_URL = "http://localhost:8000";

function CitiesContextProvider({ children }: {children:React.ReactNode}) {
  const [cities, setCities] = useState<CityObjectProps[] | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

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
  return (
    <CitiesContext.Provider value={{cities, isLoading}}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities(){
    const context = useContext(CitiesContext)
    if(!context) throw new Error ("Not within context provider")
    return context
}
// eslint-disable-next-line react-refresh/only-export-components
export  {CitiesContextProvider, useCities};