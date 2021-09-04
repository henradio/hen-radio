import { gql } from "@apollo/client";
import client from "./apollo-client";
import { convertPriceToXtz, getAvailability, getIpfsUrl } from '../utilities/general';

const query = gql`
    query AudioObjktData($ownerId: String!) {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_eq: $ownerId}
            }
            creator_id: {_neq: $ownerId}
        }, order_by: {id: desc}) {
            id
            display_uri
            description
            title
            thumbnail_uri
            mime
            creator_id
            artifact_uri
            supply
            token_tags {
                tag {
                    tag
                }
            }
            creator {
                name
                metadata
            }
            token_holders(where: {holder_id: {_eq: "KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn"}}) {
                quantity
            }
            swaps(where: {status: {_eq: "0"}, contract_version: {_neq: "1"}}, order_by: {price: asc}) {
                price
            }
        }
    }
`;

const getObjktsOwnedBy = async(walletId) => {
    const { loading, error, response } = await client.query({query: query, variables: {ownerId: walletId}});
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
        availability: getAvailability(o) + '/' + o.supply,
        price: o.swaps.length ? convertPriceToXtz(o.swaps[0].price) + 'xtz' : '',
        tags: o.token_tags.map(tt => tt.tag.tag),
    })) || [];
};

export default getObjktsOwnedBy;
