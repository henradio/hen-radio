import { ipfsUrls } from '../constants';

export const getTrimmedWallet = walletAddress => {
    const start = walletAddress?.slice(0, 5) || '';
    const end = walletAddress?.slice(-5) || '';
    return `${start}...${end}`;
};

export const getIpfsUrl = (ipfs) => {
    return ipfs
        ? `https://ipfs.io/ipfs/${ipfs.slice(7)}`
        : null;
};

export const convertPriceToXtz = price => (price * 0.000001)
    .toFixed(3)
    .replace(/0*$/, '')
    .replace(/\.$/, '');

export const getAvailability = o =>
    o.token_holders?.reduce((sum, th) => sum + th.quantity, 0) || 0;
