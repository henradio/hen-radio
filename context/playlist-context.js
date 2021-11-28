import { createContext, useEffect, useState } from 'react';
import searchAllTracks from '../api/search-all-tracks';
import searchAllTracksCount from '../api/search-all-tracks-count';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
    const [tracks, setTracks] = useState([]);
    const [totalTracks, setTotalTracks] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        (async () => {
            const [foundTracks, total] = await Promise.all([
                searchAllTracks(1, 250, search),
                searchAllTracksCount(search)
            ]);
            setTracks(foundTracks);
            setTotalTracks(total);
        })()
    }, [search]);

    return (
        <PlaylistContext.Provider
            value={{
                tracks,
                setTracks,
                search,
                setSearch,
                totalTracks,
                setTotalTracks,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

