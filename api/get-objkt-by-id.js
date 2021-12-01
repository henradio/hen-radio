import { gql, request } from 'graphql-request';
import { convertPriceToXtz, getAvailability, getIpfsUrl } from '../utilities/general';
import getLowestObjktPrice from '../utilities/get-lowest-objkt-price';

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
                holder_id
            }
            swaps(where: {status: {_eq: "0"}, contract_version: {_neq: "1"}}, order_by: {price: asc}) {
                id
                price
                amount
                amount_left
                creator_id
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
        ...o,
        id: o.id,
        creator: {
            walletAddress: o.creator_id,
            ...o.creator,
        },
        title: o.title,
        src: getIpfsUrl(o.artifact_uri),
        mimeType: o.mime,
        displayUri: o.display_uri,
        availability: getAvailability(o) + '/' + o.supply,
        price: getLowestObjktPrice(o.swaps),
        tags: o.token_tags.map(tt => tt.tag.tag),
    }))?.[0] || null;
};

export default getObjktById;
