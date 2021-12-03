const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) =>
    allTracks.filter(t => {
        return (
            !blockedWallets.includes(t.creator.walletAddress) &&
            !blockedObjkts.includes(t.id)
        );
    });

export default filterBannedTracks
