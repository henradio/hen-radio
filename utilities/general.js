export const getTrimmedWallet = walletAddress => {
    const start = walletAddress?.slice(0, 5) || '';
    const end = walletAddress?.slice(-5) || '';
    return `${start}...${end}`;
};

export const getIpfsUrl = (ipfs, id = "0" ) =>
    ipfs
        ? `https://ipfs.io/ipfs/${ipfs.slice(7)}`
        : null;

export const convertPriceToXtz = price => (price * 0.000001)
    .toFixed(3)
    .replace(/0*$/, '')
    .replace(/\.$/, '');

export const getAvailability = o =>
    o.token_holders
        ?.filter(th => th.holder_id === 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn')
        .reduce((sum, th) => sum + th.quantity, 0) || 0;
