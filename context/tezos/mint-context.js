import {createContext, useState} from 'react';
import useCompress from '../../hooks/use-audio-compression';
import useTezos from '../../hooks/use-tezos';
import {IPFS_DEFAULT_THUMBNAIL_URI} from '../../constants';
import useToast from '../../hooks/use-toast';

const {create} = require('ipfs-http-client');

export const MintContext = createContext();

const infuraUrl = 'https://ipfs.infura.io:5001';
const ipfs = create(infuraUrl);

const MintProvider = ({children}) => {
    const {auth, sync, Tezos} = useTezos();
    const {handleCompress} = useCompress();
    const {setMessage} = useToast();
    const [operationHash, setOperationHash] = useState(null);

    const handleMint = async(payload) => {
        console.log(payload)
        const p = payload;
        setMessage('Creating compressed audio file…');
        const compressedAudio = await handleCompress(p);
        console.log(compressedAudio);
        setMessage('Uploading to IPFS…');
        const compressedAudioUri = await addToIpfs(compressedAudio.data);
        const artifactUri = await addToIpfs(p.audio);
        const displayUri = await addToIpfs(p.cover);
        const coverThumbUri = await addToIpfs(p.thumbnail);

        const metadata = Buffer.from(
            JSON.stringify({
                name: p.title,
                description: p.description,
                tags: p.tags.replace(/\s/g, '').split(','),
                symbol: 'OBJKT',
                artifactUri,
                displayUri,
                thumbnailUri: IPFS_DEFAULT_THUMBNAIL_URI,
                creators: [auth.address],
                formats: [
                    {
                        uri: artifactUri,
                        mimeType: p.audio.type,
                        compressedAudioUri,
                        coverThumbUri,
                        license: p.license
                    }],
                decimals: 0,
                isBooleanAmount: false,
                shouldPreferSymbol: false
            })
        );
        console.log(metadata);
        const nftCid = await addToIpfs(metadata);
        console.log(nftCid);
        console.log(p);
        console.log(p.amount);
        console.log(p.royalties);
        setMessage('Minting…');
        const isSuccessful = await mint(auth.address, p.amount, nftCid.substr(7), p.royalties);
        setMessage(isSuccessful ? 'Completed' : 'Failed to mint');
        setTimeout(() => {
            setMessage(null);
        }, 2000)
    };

    const addToIpfs = async(file) => {
        const hash = await ipfs.add(file);
        return `ipfs://${hash.path}`;
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
