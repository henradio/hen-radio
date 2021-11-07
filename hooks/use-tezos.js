import {useContext} from 'react';
import {TezosContext} from '../context/tezos/tezos-context';

const useTezos = () => useContext(TezosContext);

export default useTezos;
