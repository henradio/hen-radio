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
                if (blocklists[1].includes(i.creator.walletAddress))
                {
                    console.log("blocked " + i.id)
                }
                return !blocklists[1].includes(i.creator.walletAddress)})
        console.log("filtered objkt::" + filtered.length)
        return filtered

    }
    return (
        <BlocklistContext.Provider
            value={{
                fetchBlockLists,
                filterFeeds
            }}
        >
            {children}
        </BlocklistContext.Provider>
    );
};

export default BlocklistProvider;

