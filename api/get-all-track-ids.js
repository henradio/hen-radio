import { gql, request } from 'graphql-request';
import { indexerUrl } from '../constants';

const query = gql`
    query GetAllTrackIds {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/x-wav", "audio/mpeg"]},
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
    const response = await request(indexerUrl, query);
    return response?.hic_et_nunc_token.map(({id}) => id.toString()) || [];
};

export default getAllTrackIds;
