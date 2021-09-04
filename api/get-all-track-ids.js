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
        }) {
            id
        }
    }
`;

const getAllTrackIds = async() => {
    const { loading, error, response } = client.query({query:query});
    return response?.hic_et_nunc_token.map(({id}) => id.toString()) || [];
};

export default getAllTrackIds;
