import { gql } from "@apollo/client";
import client from "./apollo-client";
import { convertPriceToXtz, getAvailability, getIpfsUrl } from '../utilities/general';

const query = gql`
    query AudioObjktData($objktIds: [bigint!]) {
        hic_et_nunc_token(where: {
            id: {_in: $objktIds},
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }) {
            id
            display_uri
            title
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

const getTracksByObjktIds = async(objktIds) => {
    const { loading, error, response } = await client.query({query: query, variables: {objktIds}});
    const trackList = response
        ?.hic_et_nunc_token
        ?.map(o => ({
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
            price: o.swaps.length ? convertPriceToXtz(o.swaps[0].price) + 'xtz' : '',
            tags: o.token_tags.map(tt => tt.tag.tag),
        }))
        ?.sort((a, b) => objktIds.indexOf(a.id) - objktIds.indexOf(b.id));

    return trackList || [];
};

export default getTracksByObjktIds;
