import { createContext, useEffect, useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import setLocalStorage from '../utilities/set-local-storage';

export const henradioContext = createContext();

const HenradioProvider = ({children}) => {
const Tezos = new TezosToolkit('https://granadanet.smartpy.io/');
const options = {
    name: 'Henradio',
    preferredNetwork: "granadanet"
  };
  useEffect( ()=>{
const wallet = new BeaconWallet(options);

wallet
  .requestPermissions({ network: { type: 'granadanet' } })
  .then((_) => wallet.getPKH())
  .then((address) => console.log(`Your address: ${address}`));

Tezos.setWalletProvider(wallet)

Tezos.tz
  .getBalance('tz1dQXqXZ3Y5sgYwU9Aq9xRJPxEZNUwyE6ht')
  .then((balance) => console.log(`${balance.toNumber() / 1000000} ꜩ`))
  .catch((error) => console.log(JSON.stringify(error)));

Tezos.wallet
  .at('KT1XKiWUguV7xKG7gWYCd7pr47wuThPajPeE')
  .then((contract) => {
    const i = 7;
    return contract.methods.HDAO_batch([sp.record(amount = 12345, to_ = sp.address('tz1dQXqXZ3Y5sgYwU9Aq9xRJPxEZNUwyE6ht'))]).send();
  })
  .then((op) => {
    console.log(`Waiting for ${op.hash} to be confirmed...`);
    return op.confirmation(1).then(() => op.hash);
  })
  .then((hash) => console.log(`Operation injected: https://granada.tzstats.com/${hash}`))
  .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`));
});
  return (
    <henradioContext.Provider>
    </henradioContext.Provider>
);

}
  export default HenradioProvider;