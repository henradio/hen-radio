import {useContext} from 'react';
import {TezosContext} from '../context/tezos-context';

const useTezos = () => useContext(TezosContext);

export default useTezos;
