export const getCreator = creator => {
    const start = creator?.slice(0, 5) || '';
    const end = creator?.slice(-5) || '';
    return `${start}...${end}`
};

export const getAlias = (t, creatorMetadata) => {
    if(!creatorMetadata || !t.creator in creatorMetadata) return '';
    return creatorMetadata[t.creator]?.alias || creatorMetadata[t.creator]?.twitter
};
