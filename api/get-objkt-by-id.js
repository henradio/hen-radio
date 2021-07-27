import { gql, request } from 'graphql-request';
import { getIpfsUrl } from '../utilities/general';

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
            token_tags {
                tag {
                    tag
                }
            }
            creator {
                name
                metadata
            }
        }
    }
`;

const getObjktById = async(objktId) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        {objktId},
    );
    return response.hic_et_nunc_token?.map(o => ({
        id: o.id,
        creator: {
            walletAddress: o.creator_id,
            ...o.creator,
        },
        title: o.title,
        src: getIpfsUrl(o.artifact_uri),
        mimeType: o.mime,
        displayUri: o.display_uri,
        tags: o.token_tags.map(tt => tt.tag.tag)
    }))?.[0] || null;
};

export default getObjktById;
