import { createContext, useRef, useState } from 'react';
import { audio, audioContext, fetchSrc } from '../constants';

export const TrackContext = createContext();

const TrackProvider = ({children}) => {

    const [trackState, setTrackState] = useState({
        currentTrackKey: 0,
        currentTrack: null,
    });

    return (
        <TrackContext.Provider
            value={{
                trackState,
                setTrackState,
            }}
        >
            {children}
        </TrackContext.Provider>
    );
};

export default TrackProvider;

