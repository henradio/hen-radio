const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) =>
    allTracks.filter(t => {
        return (
            !blockedWallets.data.includes(t.creator.walletAddress) &&
            !blockedObjkts.data.includes(t.id)
        );
    });

export default filterBannedTracks
