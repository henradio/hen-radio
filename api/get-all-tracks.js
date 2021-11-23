import { gql, request } from 'graphql-request';
import { convertPriceToXtz, getAvailability, getIpfsUrl } from '../utilities/general';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {id: desc}) {
            id
            display_uri
            title
            description
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
            supply
            token_holders(where: {holder_id: {_eq: "KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn"}}) {
                quantity
            }
            swaps(where: {status: {_eq: "0"}, contract_version: {_neq: "1"}}, order_by: {price: asc}) {
                price
            }
        }
    }
`;

const getAllTracks = async() => {
    const resp = await request('https://api.hicdex.com/v1/graphql', query);
    console.log("unfiltered objkt:" + resp.length)
    return resp?.hic_et_nunc_token?.map(o => ({
        id: o.id,
        creator: {
            walletAddress: o.creator_id,
            ...o.creator,
        },
        title: o.title,
        src: getIpfsUrl(o.artifact_uri, o.id),
        mimeType: o.mime,
        displayUri: o.display_uri,
        description: o.description,
        availability: getAvailability(o) + '/' + o.supply,
        price: o.swaps.length ? convertPriceToXtz(o.swaps[0].price) + 'xtz' : '',
        tags: o.token_tags.map(tt => tt.tag.tag),
    })) || [];
};

export default getAllTracks;
