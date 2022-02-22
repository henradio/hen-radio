import { gql, request } from 'graphql-request';

const url = 'https://hen.radio/playlists/197596,196064,193262,190830,178113,189702,162790'

const extractIdsFromUrl = (url) => url.match(/\d+/g).map(d => Number(d));
const objktIds = extractIdsFromUrl(url);

const getIpfsUrl = (ipfs) => {
    const ipfsUrls = [
        'https://cloudflare-ipfs.com/ipfs',
        'https://infura-ipfs.io/ipfs',
        'https://dweb.link/ipfs',
        'https://gateway.pinata.cloud/ipfs',
        'https://ipfs.io/ipfs',
    ];

    return ipfs
        ? `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${ipfs.slice(7)}`
        : null;
};

const query = gql`
    query AudioObjktData($objktIds: [bigint!]) {
        hic_et_nunc_token(where: {
            id: {_in: $objktIds},
            mime: {_in: ["audio/ogg", "audio/wav", "audio/x-wav", "audio/mpeg"]},
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
    const response = await request('https://api.hicdex.com/v1/graphql', query, {objktIds});
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
            tags: [],
        }));

    return trackList || [];
};

const tracks = await getTracksByObjktIds(objktIds);
