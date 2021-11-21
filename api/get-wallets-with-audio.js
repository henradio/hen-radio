import { gql, request } from 'graphql-request';
import { getWalletBlockList } from '../constants'

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

const filterWallets = (resp) => {
    const wblock = getWalletBlockList()
    //console.log("unfiltered wallets:" + resp.hic_et_nunc_token.length)
    const filtered = resp.hic_et_nunc_token.filter((i) => !wblock.includes(i.creator_id)) 
    return filtered
  }

const getWalletsWithAudio = async() => {
    const data = await request('https://api.hicdex.com/v1/graphql', query);
    const response = filterWallets(data)
    //console.log("filtered wallets:" + response.length)
    return [...new Set(response.map(({creator_id}) => creator_id))];
};

export default getWalletsWithAudio;
