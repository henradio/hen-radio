import axios from 'axios';
import {BLOCKLIST_BAN, BLOCKLIST_OBJKT, BLOCKLIST_WALLET} from '../constants';

const localWalletBlockList = [
    'tz1MsvbKeYFg2mpJtCAPGYPn9rdnANTcTEMQ',
    'tz1aZjMDWKbS2D4LfJFfG1CqLvvXTQzwQiBQ',
    'tz1T4aXc5yNNyBhMRdUtDwzLmsTdjnmsb6Zn',
    'tz1YHVXBpx4WzsbaYhv5VThj1ojcEhVYw1Md',
    'tz1WHG9AQfeiDaWd31aespoNrxvhSDHhXEVt',
    'tz1fRL3YzHHwN3Q1nqP1WYwCJTE1GsjbQ38Z',
    'tz1WD52Q8yh27CvitdP8C6Qwo2PVGfTGqURv',
    'tz1c5eQZjKiqmwCnjnunm31LnuC1tSyqjixs',
    'tz1YYH6mXC859p15T5UgrJ5Yrabu6v7TfFKu'
];

const localTrackBlockList = [
    569091,
    569105,
    570519,
    570664,
    572044,
    572499,
    572464,
    572320,
    572371,
    572583,
    573573
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

