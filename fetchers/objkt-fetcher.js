import {getBlockedTracks, getBlockedWallets} from '../api/get-blocked-lists';
import getObjktById from '../api/get-objkt-by-id';
import getObjktsCreatedBy from '../api/get-objkts-created-by';
import filterBannedTracks from '../utilities/filter-banned-tracks';

export const objktFetcherApi = '/api/objkt';

const objktFetcher = async(url, objktId) => {
    const [objkt, blockedObjkts, blockedWallets] = await Promise.all([
        getObjktById(objktId),
        getBlockedTracks(),
        getBlockedWallets()
    ]);

    let tracks = [];

    if(objkt) {
        const allTracks = await getObjktsCreatedBy(objkt.creator.walletAddress);
        tracks = filterBannedTracks(
            allTracks,
            blockedWallets,
            blockedObjkts
        );
    }

    return {
        blockedObjkts,
        blockedWallets,
        objkt,
        tracks,
        walletAddress: objkt.creator.walletAddress
    };
};

export default objktFetcher;
