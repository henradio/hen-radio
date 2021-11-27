import { useContext } from 'react';
import { BlockListContext } from '../context/block-list-context';

const useBlockList = () => useContext(BlockListContext);

export default useBlockList;
