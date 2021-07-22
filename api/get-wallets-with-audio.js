import { gql, request } from 'graphql-request';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {creator_id: asc}) {
            creator_id
        }
    }
`;

const getWalletsWithAudio = async() => {
    const data = await request('https://api.hicdex.com/v1/graphql', query);
    return [...new Set(data?.hic_et_nunc_token?.map(o => o.creator_id))];
};

export default getWalletsWithAudio;
