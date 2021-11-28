import getAllTracks from '../api/get-all-tracks';
import getAllTracksCount from '../api/get-all-tracks-count';
import {getBlockedTracks, getBlockedWallets} from '../api/get-blocked-lists';
import searchAllTracks from '../api/search-all-tracks';
import searchAllTracksCount from '../api/search-all-tracks-count';

const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) =>
    allTracks.filter(t => (
        !blockedWallets.data.includes(t.creator_id) &&
        !blockedObjkts.data.includes(t.id)
    ));

export const allTracksApi = '/api/tracks';

const allTracksFetcher = async(url = allTracksApi, page = 1, limit = 250, search = '') => {

    page = page > 0 ? page : 1

    const [allTracks, total, blockedObjkts, blockedWallets] = await Promise.all(
        [
            !search ? getAllTracks(page, limit) : searchAllTracks(page, limit, search),
            !search ? getAllTracksCount() : searchAllTracksCount(search),
            getBlockedTracks(),
            getBlockedWallets()
        ]);

    const tracks = filterBannedTracks(
        allTracks,
        blockedWallets,
        blockedObjkts
    );

    return {tracks, page, search, total, limit};
};

export default allTracksFetcher;
