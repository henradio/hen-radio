import { gql, request } from 'graphql-request';
import { ipfsUrls } from '../constants';

const query = gql`
    query AudioObjktData($objktIds: [bigint!]) {
        hic_et_nunc_token(where: {
            id: {_in: $objktIds},
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }) {
            id
            display_uri
            title
            mime
            creator_id
            artifact_uri
        }
    }
`;

const getTracksByObjktIds = async(objktIds) => {
    const response = await request('https://api.hicdex.com/v1/graphql', query, {objktIds});
    const trackList = response
        ?.hic_et_nunc_token
        ?.map(o => ({
            id: o.id,
            creator: o.creator_id,
            name: o.title,
            src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(7)}`,
            mimeType: o.mime,
            displayUri: o.display_uri,
        }))
        ?.sort((a, b) => objktIds.indexOf(a.id) - objktIds.indexOf(b.id));

    return trackList || [];
};

export default getTracksByObjktIds;
