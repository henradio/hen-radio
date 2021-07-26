import { gql, request } from 'graphql-request';
import { getIpfsUrl } from '../utilities/general';

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
            creator {
                name
                metadata
            }
        }
    }
`;

const getTracksByObjktIds = async(objktIds) => {
    const response = await request('https://api.hicdex.com/v1/graphql', query, {objktIds});
    const trackList = response
        ?.hic_et_nunc_token
        ?.map(o => ({
            id: o.id,
            creator: {
                walletAddress: o.creator_id,
                ...o.creator,
            },
            title: o.title,
            src: getIpfsUrl(o.artifact_uri),
            mimeType: o.mime,
            displayUri: o.display_uri,
        }))
        ?.sort((a, b) => objktIds.indexOf(a.id) - objktIds.indexOf(b.id));

    return trackList || [];
};

export default getTracksByObjktIds;
