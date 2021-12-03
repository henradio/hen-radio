import {request} from 'graphql-request';
import axios from 'axios';
import {getIpfsUrl} from '../utilities/general';

const {gql} = require('graphql-request');
const query = gql`
    query GetProfile($address: String!) {
        hic_et_nunc_token_holder(
            where: {
                holder: {
                    address: {_eq: $address}
                }
            }, limit: 1) {
            holder {
                address
                description
                metadata_file
                name
            }
        }
    }
`

const getProfile = async(address) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        {address}
    );

    if(!response?.hic_et_nunc_token_holder?.[0]?.holder) return null;
    const data = response.hic_et_nunc_token_holder[0].holder;
    if(data.metadata_file){
        const metaResponse = await axios.get(getIpfsUrl(data.metadata_file))
        data.metadata = metaResponse.data;
    }

    return data;
};

export default getProfile
