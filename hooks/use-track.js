import { useContext } from 'react';
import { TrackContext } from '../context/track-context';

const useTrack = () => useContext(TrackContext);

export default useTrack;
