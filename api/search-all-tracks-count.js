import {gql, request} from 'graphql-request';

const query = gql`
    query SearchAllTracksCount($search: String!) {
        hic_et_nunc_token_aggregate(where: {
            _or: [
                {creator: {name: {_ilike: $search}}},
                {title: {_ilike: $search}},
                {token_tags: {tag: {tag: {_ilike: $search}}}}
            ]
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

const searchAllTracksCount = async(search) => {
    const resp = await request('https://api.hicdex.com/v1/graphql', query, {search: `%${search}%`});
    return resp?.hic_et_nunc_token_aggregate.aggregate.count;
};

export default searchAllTracksCount;
