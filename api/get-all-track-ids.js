import { gql, request } from 'graphql-request';

const query = gql`
    query GetAllTrackIds {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }) {
            id
        }
    }
`;

const getAllTrackIds = async() => {
    const response = await request('https://api.hicdex.com/v1/graphql', query);
    return response?.hic_et_nunc_token.map(({id}) => id.toString()) || [];
};

export default getAllTrackIds;
