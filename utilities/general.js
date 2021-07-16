export const getCreator = creator => {
    return creator.slice(0, 5) + '...' + creator.slice(-5);
};

export const getAlias = (t, creatorMetadata) => {
    if(!creatorMetadata) return '';
    return t.creator in creatorMetadata
        ? creatorMetadata[t.creator].alias
        : '';
};
