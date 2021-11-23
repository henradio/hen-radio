import { useContext } from 'react';
import { BlocklistContext } from '../context/blocklist-context';

const useBlocklist = () => useContext(BlocklistContext);

export default useBlocklist;
