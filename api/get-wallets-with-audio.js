import { gql, request } from 'graphql-request';
import { indexerUrl } from '../constants';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/x-wav", "audio/mpeg"]},
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
    const data = await request(indexerUrl, query);
    return [...new Set(data?.hic_et_nunc_token?.map(({creator_id}) => creator_id))];
};

export default getWalletsWithAudio;
