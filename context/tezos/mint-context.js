import {createContext, useState} from 'react';
import useUpload from '../../hooks/use-file-upload';
import useTezos from '../../hooks/use-tezos';
import useToast from '../../hooks/use-toast';

export const MintContext = createContext();

const MintProvider = ({children}) => {
    const {auth, sync, Tezos} = useTezos();
    const {handleUpload, addToIpfs} = useUpload();
    const {setMessage} = useToast();
    const [operationHash, setOperationHash] = useState(null);

    const handleMint = async(payload) => {
        const p = payload;
        const hashes = await handleUpload(p);
  
        const artifactUri = hashes[0];
        const compressedAudioUri = hashes[1];
        const displayUri = hashes[2];
        const coverThumbUri = hashes[3];


        console.log(artifactUri);
        console.log(compressedAudioUri);
        console.log(displayUri);
        console.log(coverThumbUri);
 


        console.log('---------auth-------');        
        console.log(auth);
        console.log(auth.address);

        const metadataJson = JSON.stringify({
            name: p.title,
            description: p.description,
            tags: p.tags.replace(/\s/g, '').split(','),
            symbol: 'OBJKT',
            artifactUri,
            displayUri,
            thumbnailUri: coverThumbUri,
            creators: [auth.address],
            formats: [
                {
                    uri: artifactUri,
                    mimeType: p.audio.type,
                    compressedAudioUri
                }],
            decimals: 0,
            isBooleanAmount: false,
            shouldPreferSymbol: false
        });

        console.log(metadataJson);

        const metadata = Buffer.from(metadataJson);
        setMessage('6/7 uploading metadata');
        const nftCid = await addToIpfs(metadata);
        console.log(nftCid);
        console.log(p);
        console.log(p.amount);
        console.log(p.royalties);
        setMessage('7/7 minting');
        const isSuccessful = await mint(auth.address, p.amount, nftCid.substr(7), p.royalties);
        setMessage(isSuccessful ? 'Completed' : 'Failed to mint');
        setTimeout(() => {
            setMessage(null);
        }, 2000)

    };

    const mint = async(tz, amount, cid, royalties) => {
        try {
            console.log(cid);
            const contract = await Tezos.wallet
                .at('KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9');
            const operation = await contract.methods.mint_OBJKT(
                tz,
                parseFloat(amount),
                ('ipfs://' + cid)
                    .split('')
                    .reduce(
                        (hex, c) =>
                            (hex += c.charCodeAt(0)
                                .toString(16)
                                .padStart(2, '0')),
                        ''
                    ),
                parseFloat(royalties) * 10
            ).send({amount: 0, storageLimit: 310});
            setOperationHash(operation.hash)
            await operation.confirmation(1);
            console.log('Minted');
            console.log('Operation hash:', operation.hash);
        } catch(e) {
            console.log('Error:', e);
            return false;
        }
        return true;
    };

    return (
        <MintContext.Provider
            value={{
                handleMint,
                operationHash
            }}
        >
            {children}
        </MintContext.Provider>
    );

};

export default MintProvider;
