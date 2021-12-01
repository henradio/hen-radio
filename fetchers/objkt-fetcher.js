import {getBlockedTracks} from '../api/get-blocked-lists';
import getObjktById from '../api/get-objkt-by-id';
import getObjktsCreatedBy from '../api/get-objkts-created-by';

export const objktFetcherApi = '/api/objkt';

const objktFetcher = async(url, objktId) => {
    const blockedObjkts = await getBlockedTracks();
    const objkt = await getObjktById(objktId);
    let tracks = [];
    if(objkt) tracks = await getObjktsCreatedBy(objkt.creator.walletAddress);

    return {blockedObjkts, objkt, tracks, walletAddress: objkt.creator.walletAddress};
};

export default objktFetcher
