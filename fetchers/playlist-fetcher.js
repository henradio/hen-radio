import getTracksByObjktIds from '../api/get-tracks-by-objkt-ids';
import {limit} from './all-tracks-fetcher';
import filterBannedTracks from '../utilities/filter-banned-tracks';
import {getBlockedTracks, getBlockedWallets} from '../api/get-blocked-lists';

export const playlistApi = '/api/playlist';

const playlistFetcher = async(url, objktIdStr) => {
    const objktIds = objktIdStr?.split(',').map(id => Number(id));
    const [allTracks, blockedObjkts, blockedWallets] = await Promise.all([
        getTracksByObjktIds(objktIds),
        getBlockedTracks(),
        getBlockedWallets()
    ]) ;

    const tracks = filterBannedTracks(
        allTracks,
        blockedWallets,
        blockedObjkts
    );

    return {tracks, page: 1, search: '', total: objktIds.length, limit};
};

export default playlistFetcher;
