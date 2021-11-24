import { createContext, useState, useEffect } from 'react';
import { BLOCKLIST_WALLET, BLOCKLIST_OBJKT } from '../constants';
import axios from 'axios';

export const BlocklistContext = createContext();


const BlocklistProvider = ({ children }) => {

    const fetchBlockLists = async () => {
 
        const blockObjkt = await axios.get(BLOCKLIST_OBJKT) // loads blocked objkt
        const blockwallet = await axios.get(BLOCKLIST_WALLET) // loads blocked wallets

        return [blockObjkt.data, blockwallet.data]
    };


    const filterFeeds = async (tracks, blocklists) => {

        console.log("unfiltered objkt::" + tracks.length)
        const filtered = tracks.filter((i) => !blocklists[0].includes(i.id))
            .filter((i) => {
                if (blocklists[1].includes(i.creator?.walletAddress))
                {
                    console.log("blocked " + i.id + "from " + i.creator.walletAddress)
                }
                return !blocklists[1].includes(i.creator?.walletAddress)})
        console.log("filtered objkt::" + filtered.length)
        return filtered

    }


    const filterWallets = async (wallets, blocklists) => {

        console.log("unfiltered wallets::" + wallets.length)
        const filtered = wallets.filter((i) => {
                if (blocklists[1].includes(i))
                {
                    console.log("blocked " +  i)
                }
                return !blocklists[1].includes(i)})
        console.log("filtered objkt::" + filtered.length)
        return filtered

    }

    return (
        <BlocklistContext.Provider
            value={{
                fetchBlockLists,
                filterFeeds,
                filterWallets
            }}
        >
            {children}
        </BlocklistContext.Provider>
    );
};

export default BlocklistProvider;

