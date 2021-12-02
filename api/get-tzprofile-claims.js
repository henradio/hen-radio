import {gql, request} from 'graphql-request';

const query = gql`
    query GetTzProfile($address: String!) {
        tzprofiles_by_pk(account: $address) {
            valid_claims
        }
    }
`;

function getClaim(claimStr) {
    const claim = JSON.parse(claimStr);
    switch(claim.type[1]) {
        case 'TwitterVerification':
            return {
                type: 'twitter',
                link: claim.credentialSubject.sameAs,
                username: claim.evidence.handle,
                issuedOn: claim.issuanceDate,
            }
        case 'BasicProfile':
            return {
                type: 'basic',
                website: claim.credentialSubject.website,
                alias: claim.credentialSubject.alias,
                logo: claim.credentialSubject.logo,
                description: claim.credentialSubject.description,
                issuedOn: claim.issuanceDate,
            }
        default:
            return {
                type: claim.type[1],
                ...claim.credentialSubject,
                issuedOn: claim.issuanceDate,
            }
    }
}

const getTzProfileClaims = async(address) => {
    const response = await request(
        'https://indexer.tzprofiles.com/v1/graphql',
        query,
        {address}
    );
    if(!response?.tzprofiles_by_pk?.valid_claims) return null;
    const validClaims = response?.tzprofiles_by_pk.valid_claims;
    return validClaims.reduce((obj, vc) => {
        const claimStr = vc?.[1];
        if(!claimStr) return obj;
        const claim = getClaim(claimStr);
        if(claim.type in obj && +new Date(claim.issuedOn) < +new Date(obj[claim.type].issuedOn)) {
            return obj;
        }
        obj[claim.type] = claim;
        return obj;
    }, {});
};

export default getTzProfileClaims
