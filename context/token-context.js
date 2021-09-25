import { createContext, useEffect, useState } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
    const [walletToCredit, setWalletToCredit] = useState('')
    const Tezos = new TezosToolkit('https://granadanet.smartpy.io/');
    const options = {
        name: 'Henradio',
        preferredNetwork: "granadanet"
    };

    useEffect(() => {
        if (!walletToCredit) return;
        (async () => {
            const wallet = new BeaconWallet(options);
            Tezos.setWalletProvider(wallet)
            //const permissions = await wallet.client.requestPermissions({ network: { type: 'granadanet' } });
            // Check if we are connected. If not, do a permission request first.
            const activeAccount = await wallet.client.getActiveAccount();

            let myAddress

            if (!activeAccount) {
                const permissions = await wallet.client.requestPermissions({ network: { type: 'granadanet' } });
                console.log("New connection:", permissions.address);
                myAddress = permissions.address;
            } else {
                myAddress = activeAccount.address;
                console.log(myAddress)
            }
            const balance = await Tezos.tz.getBalance(myAddress)
            console.log(`${balance.toNumber() / 1000000} ꜩ`)


            const contractExample = 'KT18ybfzfmBmjzJhDviN661Sju3gRLBbpRKp';


            // Connect to a specific contract on the tezos blockchain.
            // Make sure the contract is deployed on the network you requested permissions for.
            const contract = await Tezos.wallet.at(contractExample);
            const entries = await contract.methods;
            console.log(entries)

            const TOKEN_ID = 0; // FA2 token id
            const recipient = "tz1WFaenZYYm72NVuTnZcML1QQyGM6j5632N";

            // Call a method on the contract. In this case, we use the transfer entrypoint.
            // Taquito will automatically check if the entrypoint exists and if we call it with the right parameters.
            // In this case the parameters are [from, to, amount].
            // This will prepare the contract call and send the request to the connected wallet.
            const result = await contract.methods.diezDAO_batch(([{ "amount": 1, "to_": recipient }])).send();

        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [walletToCredit]);

    return (
        <TokenContext.Provider value={{ walletToCredit, setWalletToCredit }}>
            {children}
        </TokenContext.Provider>
    );

}
export default TokenProvider;