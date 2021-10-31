import { useContext } from 'react';
import { MintContext } from '../context/mint-context';

const useMint = () => useContext(MintContext);

export default useMint;