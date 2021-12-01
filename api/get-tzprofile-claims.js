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
                issuedOn: new Date(claim.issuanceDate),
            }
        case 'BasicProfile':
            return {
                type: 'basic',
                website: claim.credentialSubject.website,
                alias: claim.credentialSubject.alias,
                logo: claim.credentialSubject.logo,
                description: claim.credentialSubject.description,
                issuedOn: new Date(claim.issuanceDate),
            }
        default:
            const data ={
                type: claim.type[1],
                ...claim.credentialSubject,
                issuedOn: new Date(claim.issuanceDate),
            }
            return data
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
    return validClaims.reduce((arr, vc) => {
        const claimStr = vc?.[1];
        if(!claimStr) return arr;
        return arr.concat([getClaim(claimStr)]);
    }, []);
};

export default getTzProfileClaims
