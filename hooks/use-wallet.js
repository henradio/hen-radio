import { useContext } from 'react';
import { WalletContext } from '../context/tezos/wallet-context';

const useWallet = () => useContext(WalletContext);

export default useWallet;
