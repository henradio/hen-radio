export const getCreator = creator => {
    return creator.slice(0, 5) + '...' + creator.slice(-5);
};

export const getAlias = (t, creatorMetadata) => {
    if(!creatorMetadata || !t.creator in creatorMetadata) return '';
    return creatorMetadata[t.creator]?.alias || creatorMetadata[t.creator]?.twitter
};
