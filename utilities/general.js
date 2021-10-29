import { ipfsUrls } from '../constants';

export const getTrimmedWallet = walletAddress => {
    const start = walletAddress?.slice(0, 5) || '';
    const end = walletAddress?.slice(-5) || '';
    return `${start}...${end}`;
};

export const getIpfsUrl = (ipfs, id = "0" ) => {
    return ipfs
        ? `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${ipfs.slice(7)}`
        : null;
};

export const convertPriceToXtz = price => (price * 0.000001)
    .toFixed(3)
    .replace(/0*$/, '')
    .replace(/\.$/, '');

export const getAvailability = o =>
    o.token_holders?.reduce((sum, th) => sum + th.quantity, 0) || 0;
