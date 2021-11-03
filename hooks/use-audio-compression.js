import { useContext } from 'react';
import { MintContext } from '../context/tezos/mint-context';

const useMint = () => useContext(MintContext);

export default useMint;