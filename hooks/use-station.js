import { useContext } from 'react';
import { StationContext } from '../context/station-context';

const useStation = () => useContext(StationContext);

export default useStation;
