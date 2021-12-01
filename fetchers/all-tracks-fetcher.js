import getAllTracks from '../api/get-all-tracks';
import getAllTracksCount from '../api/get-all-tracks-count';
import {getBlockedTracks, getBlockedWallets} from '../api/get-blocked-lists';
import searchAllTracks from '../api/search-all-tracks';
import searchAllTracksCount from '../api/search-all-tracks-count';

const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) =>
    allTracks.filter(t => {
        return (
            !blockedWallets.data.includes(t.creator.walletAddress) &&
            !blockedObjkts.data.includes(t.id)
        );
    });

export const allTracksApi = '/api/tracks';

export const limit = 250

const allTracksFetcher = async(url = allTracksApi, page = 1, search = '') => {

    page = page > 0 ? page : 1

    const [allTracks, total, blockedObjkts, blockedWallets] = await Promise.all(
        [
            !search ? getAllTracks(page, limit) : searchAllTracks(page, limit, search),
            !search ? getAllTracksCount() : searchAllTracksCount(search),
            getBlockedTracks(),
            getBlockedWallets()
        ]);

    console.log('bw', blockedWallets);
console.log('CHECK', blockedWallets.data.includes('tz1YxkE8E4KSRdW9FP5XXeGAzFvciRMNTUSD'))
    console.log('l1', allTracks.length);
    const tracks = filterBannedTracks(
        allTracks,
        blockedWallets,
        blockedObjkts
    );
    console.log('l2', tracks.length);

    return {tracks, page, search, total, limit};
};

export default allTracksFetcher;
