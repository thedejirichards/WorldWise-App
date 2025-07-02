// {
//     "cityName": "Lisbon",
//     "country": "Portugal",
//     "emoji": "🇵🇹",
//     "date": "2027-10-31T15:59:59.138Z",
//     "notes": "My favorite city so far!",
//     "position": {
//       "lat": 38.727881642324164,
//       "lng": -9.140900099907554
//     },
//     "id": "73930385"
//   }

export type CityObjectProps = {
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number
    };
    id: string
}

export type CityListComponetProp = {
    cities: CityObjectProps[] | null;
    isLoading: boolean;
}

export type CityItemComponentProp = {
    city: CityObjectProps;
}