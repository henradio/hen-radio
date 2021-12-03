import axios from 'axios';
import {BLOCKLIST_BAN, BLOCKLIST_OBJKT, BLOCKLIST_WALLET} from '../constants';

const localWalletBlockList = [
    'tz1MsvbKeYFg2mpJtCAPGYPn9rdnANTcTEMQ'
];

const localTrackBlockList = [
    569091,
    569105
];

export const getBlockedTracks = async() => {
    const response = await axios.get(BLOCKLIST_OBJKT);
    if(!response) return null;
    return localTrackBlockList.concat(response.data);
};

export const getBlockedWallets = async() => {
    const response = await axios.get(BLOCKLIST_WALLET);
    if(!response) return null;
    return localWalletBlockList.concat(response.data);
};

export const getBans = () => axios.get(BLOCKLIST_BAN);

