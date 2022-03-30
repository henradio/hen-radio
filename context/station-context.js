import { createContext, useEffect } from 'react';
import {useRouter} from "next/router";
export const StationContext = createContext();

const StationProvider = ({children}) => {
    const {query} = useRouter();
    const station = query.station;
    const stationQuery = station && `station=${station}`;

    useEffect(() => {
        station && document.body.classList.add(station);
    }, [station]);

    return (
        <StationContext.Provider
            value={{
                stationQuery
            }}
        >
            {children}
        </StationContext.Provider>
    );
};

export default StationProvider;

