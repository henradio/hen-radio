import { ipfsUrls } from '../constants';

export const getTrimmedWallet = walletAddress => {
    const start = walletAddress?.slice(0, 5) || '';
    const end = walletAddress?.slice(-5) || '';
    return `${start}...${end}`;
};

export const getIpfsUrl = (ipfs) => {
    return ipfs
        ? `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${ipfs.slice(7)}`
        : null;
};
