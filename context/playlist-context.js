import { createContext, useEffect, useState } from 'react';
import searchAllTracks from '../api/search-all-tracks';
import searchAllTracksCount from '../api/search-all-tracks-count';

export const PlaylistContext = createContext();

const PlaylistProvider = ({children}) => {
    const [state, setState] = useState({
        tracks: [],
    });

    const setTracks = (tracks) => {
        setState((prevState) => ({...prevState, tracks}))
    }

    return (
        <PlaylistContext.Provider
            value={{
                tracks: state.tracks,
                setTracks,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

