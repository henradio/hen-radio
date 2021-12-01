import getTracksByObjktIds from '../api/get-tracks-by-objkt-ids';
import {limit} from './all-tracks-fetcher';

export const playlistApi = '/api/playlist';

const playlistFetcher = async(url, objktIdStr) => {
    const objktIds = objktIdStr?.split(',').map(id => Number(id));
    const tracks = await getTracksByObjktIds(objktIds);

    return {tracks, page: 1, search: '', total: objktIds.length, limit};
};

export default playlistFetcher;
