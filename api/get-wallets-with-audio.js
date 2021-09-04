import { gql } from "@apollo/client";
import client from "./apollo-client";

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
    const { loading, error, data } = await client.query({query: query});
    return [...new Set(data?.hic_et_nunc_token?.map(({creator_id}) => creator_id))];
};

export default getWalletsWithAudio;
