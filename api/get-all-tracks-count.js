import {gql, request} from 'graphql-request';

const query = gql`
    query GetAllTracksCount {
        hic_et_nunc_token_aggregate(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }) {
            aggregate {
                count
            }
        }
    }
`;

const getAllTracksCount = async() => {
    const resp = await request('https://api.hicdex.com/v1/graphql', query);
    return resp?.hic_et_nunc_token_aggregate.aggregate.count;
};

export default getAllTracksCount;
