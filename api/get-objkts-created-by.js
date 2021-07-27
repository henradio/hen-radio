import { gql, request } from 'graphql-request';
import { getIpfsUrl } from '../utilities/general';

const query = gql`
    query AudioObjktData($creatorId: String!) {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {
                    _neq: "tz1burnburnburnburnburnburnburjAYjjX"
                }
            }
            creator_id: {_eq: $creatorId}
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

const getObjktsCreatedBy = async(walletId) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        {creatorId: walletId},
    );
    return response?.hic_et_nunc_token?.map(o => ({
        id: o.id,
        creator: {
            walletAddress: o.creator_id,
            ...o.creator,
        },
        title: o.title,
        src: getIpfsUrl(o.artifact_uri),
        mimeType: o.mime,
        displayUri: o.display_uri,
        description: o.description,
        tags: o.token_tags.map(tt => tt.tag.tag)
    })) || [];
};

export default getObjktsCreatedBy;
