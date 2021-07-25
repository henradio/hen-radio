export const getCreator = creator => {
    const start = creator?.slice(0, 5) || '';
    const end = creator?.slice(-5) || '';
    return `${start}...${end}`
};

export const getAlias = (walletAddress, creatorMetadata) => {
    if(!creatorMetadata || !walletAddress in creatorMetadata) return '';
    return creatorMetadata[walletAddress]?.alias || creatorMetadata[walletAddress]?.twitter
};
