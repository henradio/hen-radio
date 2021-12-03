const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) => {
    return allTracks.filter(t => {
        return (
            !blockedWallets.includes(t.creator.walletAddress) &&
            !blockedObjkts.includes(t.id)
        );
    });
};

export default filterBannedTracks
