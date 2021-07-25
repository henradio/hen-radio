import { gql, request } from 'graphql-request';

const query = gql`
    query AudioObjktData($objktId: bigint!) {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {
                    _neq: "tz1burnburnburnburnburnburnburjAYjjX"
                }
            }
            id: {_eq: $objktId}
        }, order_by: {id: desc}) {
            id
            display_uri
            description
            title
            thumbnail_uri
            mime
            creator_id
            artifact_uri
        }
    }
`;

const getObjktById = async(objktId) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        {objktId},
    );
    return response.hic_et_nunc_token?.[0] || null;
};

export default getObjktById;
