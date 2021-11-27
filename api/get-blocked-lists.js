import axios from 'axios';
import {BLOCKLIST_BAN, BLOCKLIST_OBJKT, BLOCKLIST_WALLET} from '../constants';

export const getBlockedTracks = () => axios.get(BLOCKLIST_OBJKT)
export const getBlockedWallets = () => axios.get(BLOCKLIST_WALLET)
export const getBans = () => axios.get(BLOCKLIST_BAN)

export const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) =>
    allTracks.filter(t => (
        !blockedWallets.data.includes(t.creator_id) &&
        !blockedObjkts.data.includes(t.id)
    ));
