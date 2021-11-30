import { createContext, useEffect, useState } from 'react';
import searchAllTracks from '../api/search-all-tracks';
import searchAllTracksCount from '../api/search-all-tracks-count';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
    const [tracks, setTracks] = useState([]);

    return (
        <PlaylistContext.Provider
            value={{
                tracks,
                setTracks,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

