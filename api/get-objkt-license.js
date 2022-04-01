import { request } from 'graphql-request';
import axios from 'axios';
import { getIpfsUrl } from '../utilities/general';

const { gql } = require('graphql-request');
const query = gql`
query MetaData($id: bigint!) {
    hic_et_nunc_token(where: {
        id: {_eq: $id}
    }) {
        metadata
    }
}
`

const getObjktLicense = async (id) => {
    const response = await request(
        'https://api.hicdex.com/v1/graphql',
        query,
        { id }
    );
    const metadataUri = response.hic_et_nunc_token[0].metadata;

    const metaResponse = await axios.get(getIpfsUrl(metadataUri))

    const licenseName = (metaResponse.data.rights === undefined) ? 'No License / All Rights Reserved' : metaResponse.data.rights;
    const licenseUri = (metaResponse.data.rightUri === undefined) ? 'https://en.wikipedia.org/wiki/All_rights_reserved' : metaResponse.data.rightUri;

    const license = { name: licenseName, uri: licenseUri }

    return license;
};

export default getObjktLicense;
